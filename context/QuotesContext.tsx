import React, { createContext, useContext, useState, useEffect } from 'react'
import api from '@/api'
import { Quote } from '@/types/quote'

interface QuotesContextType {
	movieQuotes: Quote[]
	animeQuotes: Quote[]
	savedQuotes: Quote[]
	isLoading: boolean
	isLoadingMore: boolean
	fetchMovieQuotes: (force?: boolean) => Promise<void>
	fetchAnimeQuotes: (force?: boolean) => Promise<void>
	saveQuote: (quote: Quote) => void
	removeQuote: (id: string) => void
	currentQuoteIndex: number
	setCurrentQuoteIndex: (index: number) => void
}

const QuotesContext = createContext<QuotesContextType>({} as QuotesContextType)

export function QuotesProvider({ children }: { children: React.ReactNode }) {
	const [movieQuotes, setMovieQuotes] = useState<Quote[]>([])
	const [animeQuotes, setAnimeQuotes] = useState<Quote[]>([])
	const [savedQuotes, setSavedQuotes] = useState<Quote[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const [isLoadingMore, setIsLoadingMore] = useState(false)
	const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)

	const fetchMovieQuotes = async (force: boolean = false) => {
		try {
			// Only fetch if we're running low on quotes or forced
			if (!force && movieQuotes.length > currentQuoteIndex + 5) {
				return
			}

			if (movieQuotes.length === 0) {
				setIsLoading(true)
			} else {
				setIsLoadingMore(true)
			}

			const response = await api.ninjas.getRandomQuotes({ count: 5 })

			setMovieQuotes((prevQuotes) => {
				const newQuotes = response.filter(
					(newQuote) =>
						!prevQuotes.some((prevQuote) => prevQuote.text === newQuote.text)
				)
				return movieQuotes.length === 0
					? newQuotes
					: [...prevQuotes, ...newQuotes]
			})
		} catch (error) {
			console.error('Error fetching movie quotes:', error)
			if (movieQuotes.length === 0) {
				setMovieQuotes([
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
				])
			}
		} finally {
			setIsLoading(false)
			setIsLoadingMore(false)
		}
	}

	const fetchAnimeQuotes = async (force: boolean = false) => {
		try {
			// Only fetch if we're running low on quotes or forced
			if (!force && animeQuotes.length > currentQuoteIndex + 2) {
				return
			}

			if (animeQuotes.length === 0) {
				setIsLoading(true)
			} else {
				setIsLoadingMore(true)
			}

			// Fetch more quotes since we'll filter some out
			const response = await api.ninjas.getRandomQuotes({ count: 0 })

			// Filter quotes that are more likely to be anime-like
			// Look for quotes that are philosophical, about life, friendship, or contain certain keywords
			const animelikeQuotes = response
				.filter((quote) => {
					const lowerText = quote.text.toLowerCase()
					const lowerAuthor = quote.author.toLowerCase()

					// Keywords that might indicate an anime-like quote
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

					// Check if the quote contains any of our keywords
					return keywords.some(
						(keyword) =>
							lowerText.includes(keyword) || lowerAuthor.includes(keyword)
					)
				})
				.map((quote) => ({
					...quote,
					type: 'anime' as const,
				}))

			setAnimeQuotes((prevQuotes) => {
				const newQuotes = animelikeQuotes.filter(
					(newQuote) =>
						!prevQuotes.some((prevQuote) => prevQuote.text === newQuote.text)
				)
				return animeQuotes.length === 0
					? newQuotes
					: [...prevQuotes, ...newQuotes]
			})
		} catch (error) {
			console.error('Error fetching anime quotes:', error)
			if (animeQuotes.length === 0) {
				setAnimeQuotes([
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
					{
						id: 'fallback-anime-3',
						text: 'I am the bone of my sword.',
						author: 'Archer',
						source: 'Fate/Stay Night',
						type: 'anime',
					},
				])
			}
		} finally {
			setIsLoading(false)
			setIsLoadingMore(false)
		}
	}

	// Watch currentQuoteIndex and fetch more quotes when needed
	useEffect(() => {
		if (movieQuotes.length > 0) {
			fetchMovieQuotes()
		}
		if (animeQuotes.length > 0) {
			fetchAnimeQuotes()
		}
	}, [currentQuoteIndex])

	const saveQuote = (quote: Quote) => {
		setSavedQuotes((prev) => [...prev, quote])
	}

	const removeQuote = (id: string) => {
		setSavedQuotes((prev) => prev.filter((quote) => quote.id !== id))
	}

	return (
		<QuotesContext.Provider
			value={{
				movieQuotes,
				animeQuotes,
				savedQuotes,
				isLoading,
				isLoadingMore,
				fetchMovieQuotes,
				fetchAnimeQuotes,
				saveQuote,
				removeQuote,
				currentQuoteIndex,
				setCurrentQuoteIndex,
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
