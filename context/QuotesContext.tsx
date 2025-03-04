import React, { createContext, useContext, useState, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Quote } from '@/types/quote'

interface QuoteResponse {
	_id: string
	content: string
	author: string
	authorSlug: string
	length: number
	tags: string[]
}

interface QuotesContextType {
	movieQuotes: Quote[]
	animeQuotes: Quote[]
	savedQuotes: Quote[]
	isLoading: boolean
	error: string | null
	currentPage: number
	fetchMovieQuotes: () => Promise<void>
	fetchAnimeQuotes: () => Promise<void>
	saveQuote: (quote: Quote) => Promise<void>
	removeQuote: (quoteId: string) => Promise<void>
	loadSavedQuotes: () => Promise<void>
}

const QuotesContext = createContext<QuotesContextType | undefined>(undefined)

export function QuotesProvider({ children }: { children: React.ReactNode }) {
	const [movieQuotes, setMovieQuotes] = useState<Quote[]>([])
	const [animeQuotes, setAnimeQuotes] = useState<Quote[]>([])
	const [savedQuotes, setSavedQuotes] = useState<Quote[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [currentPage, setCurrentPage] = useState(1)

	const fetchMovieQuotes = useCallback(async () => {
		setIsLoading(true)
		setError(null)
		try {
			console.log('Fetching movie quotes...')
			const response = await fetch(
				'https://api.quotable.io/quotes/random?limit=10&tags=famous-quotes,inspirational',
				{
					method: 'GET',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
				}
			)
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`)
			}
			const data: QuoteResponse[] = await response.json()
			console.log('Movie quotes response:', data)

			if (!Array.isArray(data)) {
				throw new Error('Invalid response format')
			}

			const formattedQuotes: Quote[] = data.map((quote) => ({
				id: quote._id,
				text: quote.content,
				source: quote.tags[0] || 'Famous Quote',
				author: quote.author,
				type: 'movie' as const,
			}))

			console.log('Formatted movie quotes:', formattedQuotes)
			setMovieQuotes((prev) => [...prev, ...formattedQuotes])
		} catch (err) {
			console.error('Error fetching movie quotes:', err)
			setError('Failed to fetch movie quotes')
			// Fallback to static quotes if API fails
			const fallbackQuotes: Quote[] = [
				{
					id: '1',
					text: "Life is like a box of chocolates, you never know what you're gonna get.",
					source: 'Famous Quote',
					author: 'Forrest Gump',
					type: 'movie',
				},
				{
					id: '2',
					text: 'May the Force be with you.',
					source: 'Famous Quote',
					author: 'Star Wars',
					type: 'movie',
				},
			]
			setMovieQuotes(fallbackQuotes)
		} finally {
			setIsLoading(false)
		}
	}, [])

	const fetchAnimeQuotes = useCallback(async () => {
		setIsLoading(true)
		setError(null)
		try {
			console.log('Fetching anime quotes...')
			const response = await fetch(
				'https://api.quotable.io/quotes/random?limit=10&tags=wisdom',
				{
					method: 'GET',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
				}
			)
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`)
			}
			const data = await response.json()
			console.log('Anime quotes response:', data)

			if (!Array.isArray(data)) {
				throw new Error('Invalid response format')
			}

			const formattedQuotes: Quote[] = data.map((quote: any) => ({
				id: quote._id || String(Date.now()),
				text: quote.content,
				source: 'Anime Wisdom',
				author: quote.author,
				type: 'anime' as const,
			}))

			console.log('Formatted anime quotes:', formattedQuotes)
			setAnimeQuotes((prev) => [...prev, ...formattedQuotes])
		} catch (err) {
			console.error('Error fetching anime quotes:', err)
			setError('Failed to fetch anime quotes')
			// Fallback to static quotes if API fails
			const fallbackQuotes: Quote[] = [
				{
					id: '1',
					text: "People's lives don't end when they die, it ends when they lose faith.",
					source: 'Anime',
					author: 'Itachi Uchiha',
					type: 'anime',
				},
				{
					id: '2',
					text: "If you don't like your destiny, don't accept it.",
					source: 'Anime',
					author: 'Naruto Uzumaki',
					type: 'anime',
				},
			]
			setAnimeQuotes(fallbackQuotes)
		} finally {
			setIsLoading(false)
		}
	}, [])

	const saveQuote = useCallback(
		async (quote: Quote) => {
			try {
				const updatedSavedQuotes = [...savedQuotes, quote]
				setSavedQuotes(updatedSavedQuotes)
				await AsyncStorage.setItem(
					'savedQuotes',
					JSON.stringify(updatedSavedQuotes)
				)
			} catch (err) {
				console.error('Error saving quote:', err)
			}
		},
		[savedQuotes]
	)

	const removeQuote = useCallback(
		async (quoteId: string) => {
			try {
				const updatedSavedQuotes = savedQuotes.filter(
					(quote) => quote.id !== quoteId
				)
				setSavedQuotes(updatedSavedQuotes)
				await AsyncStorage.setItem(
					'savedQuotes',
					JSON.stringify(updatedSavedQuotes)
				)
			} catch (err) {
				console.error('Error removing quote:', err)
			}
		},
		[savedQuotes]
	)

	const loadSavedQuotes = useCallback(async () => {
		try {
			const savedQuotesString = await AsyncStorage.getItem('savedQuotes')
			if (savedQuotesString) {
				setSavedQuotes(JSON.parse(savedQuotesString))
			}
		} catch (err) {
			console.error('Error loading saved quotes:', err)
		}
	}, [])

	return (
		<QuotesContext.Provider
			value={{
				movieQuotes,
				animeQuotes,
				savedQuotes,
				isLoading,
				error,
				currentPage,
				fetchMovieQuotes,
				fetchAnimeQuotes,
				saveQuote,
				removeQuote,
				loadSavedQuotes,
			}}
		>
			{children}
		</QuotesContext.Provider>
	)
}

export const useQuotes = () => {
	const context = useContext(QuotesContext)
	if (context === undefined) {
		throw new Error('useQuotes must be used within a QuotesProvider')
	}
	return context
}
