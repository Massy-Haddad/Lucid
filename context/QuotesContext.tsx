import React, { createContext, useContext, useEffect, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Quote, QuotesState, FirestoreQuote } from '@/types/quote'
import { firebaseService } from '@/api/providers/firebase'
import { useQuotesReducer } from '@/hooks/useQuotesReducer'
import api from '@/api'

const STORAGE_KEY = '@quotes_storage'

interface QuotesContextType extends QuotesState {
	fetchMovieQuotes: (force?: boolean) => Promise<void>
	fetchAnimeQuotes: (force?: boolean) => Promise<void>
	saveQuote: (quote: Quote) => Promise<void>
	removeQuote: (id: string) => Promise<void>
	isQuoteSaved: (id: string) => boolean
	setCurrentQuoteIndex: (index: number) => void
	loadSavedQuotes: () => Promise<void>
}

const QuotesContext = createContext<QuotesContextType>({} as QuotesContextType)

export function QuotesProvider({ children }: { children: React.ReactNode }) {
	const [state, dispatch] = useQuotesReducer()

	// Initialize anonymous auth on mount
	useEffect(() => {
		firebaseService.initializeAnonymousAuth()
	}, [])

	// Set up real-time listener for saved quotes
	useEffect(() => {
		const unsubscribe = firebaseService.subscribeToSavedQuotes(
			(quotes) => {
				dispatch({ type: 'SET_SAVED_QUOTES', payload: quotes })
				// Update local storage as backup
				AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(quotes))
			},
			async (error) => {
				// Fallback to local storage
				const savedQuotesString = await AsyncStorage.getItem(STORAGE_KEY)
				if (savedQuotesString) {
					dispatch({
						type: 'SET_SAVED_QUOTES',
						payload: JSON.parse(savedQuotesString),
					})
				}
			}
		)

		return () => unsubscribe()
	}, [])

	const loadSavedQuotes = useCallback(async () => {
		try {
			const quotes = await firebaseService.loadSavedQuotes()
			dispatch({ type: 'SET_SAVED_QUOTES', payload: quotes })
		} catch (error) {
			// Fallback to local storage
			const savedQuotesString = await AsyncStorage.getItem(STORAGE_KEY)
			if (savedQuotesString) {
				dispatch({
					type: 'SET_SAVED_QUOTES',
					payload: JSON.parse(savedQuotesString),
				})
			}
		}
	}, [])

	const saveQuote = useCallback(
		async (quote: Quote) => {
			try {
				// Check if quote is already saved before making the API call
				if (isQuoteSaved(quote.id)) {
					console.log('[QuotesContext] Quote already saved:', quote.id)
					return
				}

				const savedQuote = await firebaseService.saveQuote(quote)
				dispatch({ type: 'ADD_SAVED_QUOTE', payload: savedQuote })

				// Update local storage as backup
				const updatedQuotes = [savedQuote, ...state.savedQuotes]
				await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedQuotes))
			} catch (error) {
				console.error('[QuotesContext] Error saving quote:', error)
				throw error
			}
		},
		[state.savedQuotes]
	)

	const removeQuote = useCallback(
		async (id: string) => {
			try {
				await firebaseService.removeQuote(id)
				dispatch({ type: 'REMOVE_SAVED_QUOTE', payload: id })

				// Update local storage as backup
				const updatedQuotes = state.savedQuotes.filter(
					(quote) => quote.id !== id
				)
				await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedQuotes))
			} catch (error) {
				console.error('[QuotesContext] Error removing quote:', error)
				throw error
			}
		},
		[state.savedQuotes]
	)

	const isQuoteSaved = useCallback(
		(id: string) => {
			return state.savedQuotes.some((quote) => quote.id === id)
		},
		[state.savedQuotes]
	)

	const fetchMovieQuotes = async (force: boolean = false) => {
		try {
			// Only fetch if we're running low on quotes or forced
			if (!force && state.movieQuotes.length > state.currentQuoteIndex + 5) {
				return
			}

			if (state.movieQuotes.length === 0) {
				dispatch({ type: 'SET_LOADING', payload: true })
			} else {
				dispatch({ type: 'SET_LOADING_MORE', payload: true })
			}

			const response = await api.ninjas.getRandomQuotes({ count: 5 })
			const quotes = response.map((quote) => ({
				...quote,
				type: 'movie' as const,
			}))

			if (state.movieQuotes.length === 0) {
				dispatch({ type: 'SET_MOVIE_QUOTES', payload: quotes })
			} else {
				dispatch({ type: 'ADD_MOVIE_QUOTES', payload: quotes })
			}
		} catch (error) {
			console.error('Error fetching movie quotes:', error)
			if (state.movieQuotes.length === 0) {
				dispatch({
					type: 'SET_MOVIE_QUOTES',
					payload: [
						{
							id: 'fallback-movie-1',
							text: 'Do, or do not. There is no try.',
							author: 'Yoda',
							source: 'Star Wars: The Empire Strikes Back',
							type: 'movie',
						},
						{
							id: 'fallback-movie-2',
							text: "I'll be back.",
							author: 'The Terminator',
							source: 'The Terminator',
							type: 'movie',
						},
					],
				})
			}
		} finally {
			dispatch({ type: 'SET_LOADING', payload: false })
			dispatch({ type: 'SET_LOADING_MORE', payload: false })
		}
	}

	const fetchAnimeQuotes = async (force: boolean = false) => {
		try {
			// Only fetch if we're running low on quotes or forced
			if (!force && state.animeQuotes.length > state.currentQuoteIndex + 2) {
				return
			}

			if (state.animeQuotes.length === 0) {
				dispatch({ type: 'SET_LOADING', payload: true })
			} else {
				dispatch({ type: 'SET_LOADING_MORE', payload: true })
			}

			const response = await api.ninjas.getRandomQuotes({ count: 10 })
			const animelikeQuotes = response
				.filter((quote) => {
					const lowerText = quote.text.toLowerCase()
					const lowerAuthor = quote.author.toLowerCase()
					const keywords = [
						'life',
						'dream',
						'destiny',
						'heart',
						'soul',
						'spirit',
						'power',
						'strength',
						'courage',
						'friend',
						'hope',
						'future',
						'fate',
						'journey',
						'warrior',
						'hero',
						'believe',
						'faith',
						'path',
						'wisdom',
					]
					return keywords.some(
						(keyword) =>
							lowerText.includes(keyword) || lowerAuthor.includes(keyword)
					)
				})
				.map((quote) => ({ ...quote, type: 'anime' as const }))

			if (state.animeQuotes.length === 0) {
				dispatch({ type: 'SET_ANIME_QUOTES', payload: animelikeQuotes })
			} else {
				dispatch({ type: 'ADD_ANIME_QUOTES', payload: animelikeQuotes })
			}
		} catch (error) {
			console.error('Error fetching anime quotes:', error)
			if (state.animeQuotes.length === 0) {
				dispatch({
					type: 'SET_ANIME_QUOTES',
					payload: [
						{
							id: 'fallback-anime-1',
							text: 'People die if they are killed.',
							author: 'Shirou Emiya',
							source: 'Fate/Stay Night',
							type: 'anime',
						},
						{
							id: 'fallback-anime-2',
							text: 'Believe in the me that believes in you!',
							author: 'Kamina',
							source: 'Gurren Lagann',
							type: 'anime',
						},
					],
				})
			}
		} finally {
			dispatch({ type: 'SET_LOADING', payload: false })
			dispatch({ type: 'SET_LOADING_MORE', payload: false })
		}
	}

	// Watch currentQuoteIndex and fetch more quotes when needed
	useEffect(() => {
		if (state.movieQuotes.length > 0) {
			fetchMovieQuotes()
		}
		if (state.animeQuotes.length > 0) {
			fetchAnimeQuotes()
		}
	}, [state.currentQuoteIndex])

	const setCurrentQuoteIndex = (index: number) => {
		dispatch({ type: 'SET_CURRENT_QUOTE_INDEX', payload: index })
	}

	return (
		<QuotesContext.Provider
			value={{
				...state,
				fetchMovieQuotes,
				fetchAnimeQuotes,
				saveQuote,
				removeQuote,
				isQuoteSaved,
				setCurrentQuoteIndex,
				loadSavedQuotes,
			}}
		>
			{children}
		</QuotesContext.Provider>
	)
}

export function useQuotes() {
	const context = useContext(QuotesContext)
	if (!context) {
		throw new Error('useQuotes must be used within a QuotesProvider')
	}
	return context
}
