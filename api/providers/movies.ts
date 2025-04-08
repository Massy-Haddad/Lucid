import { processFetchRequest } from '../../utils'
import { Quote } from '@/types/quote'

/**
 * Configuration
 */
const CONFIG = {
	BASE_URL: 'https://quoteapi.pythonanywhere.com',
	DEFAULT_COUNT: 5,
	ENDPOINTS: {
		ALL_QUOTES: '/quotes',
		SEARCH: '/quotes/search',
	},
} as const

/**
 * Types
 */
interface MovieQuote {
	id: number
	quote: string
	movie_title: string
	actor_name: string
	category: string
	publish_date: string
	source: string
	context: string
	rating: string
	language: string
	author: string
	author_bio: string
}

interface ApiResponse {
	Quotes: MovieQuote[][]
}

interface FetchQuotesParams {
	count?: number
	savedQuoteIds?: string[]
}

/**
 * Helper Functions
 */
const extractTags = (quote: MovieQuote): string[] => {
	const tags: string[] = []

	// Add categories as tags
	if (quote.category) {
		const categories = quote.category.toLowerCase().split('/')
		categories.forEach((category) => {
			tags.push(category.trim())
		})
	}

	// Add media type tag
	if (quote.movie_title?.toLowerCase().includes('tv series')) {
		tags.push('tv-series')
	} else {
		tags.push('movie')
	}

	// Add era based on publish date
	const year = parseInt(quote.publish_date)
	if (!isNaN(year)) {
		if (year < 1950) tags.push('classic')
		else if (year < 1980) tags.push('vintage')
		else if (year < 2000) tags.push('retro')
		else if (year < 2010) tags.push('modern')
		else tags.push('contemporary')
	}

	// Add language tag
	if (quote.language && quote.language.toLowerCase() !== 'null') {
		tags.push(quote.language.toLowerCase())
	}

	return [...new Set(tags)] // Remove duplicates
}

const formatQuote = (quote: MovieQuote): Quote => ({
	id: `movie-${quote.id}`,
	text: quote.quote,
	author: quote.actor_name || quote.author,
	source: quote.movie_title
		? `${quote.movie_title} (${quote.publish_date})`
		: 'Unknown Movie',
	type: 'movie',
	tags: extractTags(quote),
})

const shuffleArray = <T>(array: T[]): T[] => {
	const shuffled = [...array]
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
	}
	return shuffled
}

const removeDuplicates = (quotes: MovieQuote[]): MovieQuote[] => {
	const uniqueQuotes = new Map<number, MovieQuote>()
	quotes.forEach((quote) => {
		if (!uniqueQuotes.has(quote.id)) {
			uniqueQuotes.set(quote.id, quote)
		}
	})
	return Array.from(uniqueQuotes.values())
}

const filterSavedQuotes = (
	quotes: MovieQuote[],
	savedQuoteIds?: string[]
): MovieQuote[] => {
	if (!savedQuoteIds?.length) return quotes
	return quotes.filter((quote) => !savedQuoteIds.includes(`movie-${quote.id}`))
}

/**
 * API Functions
 */
const getRandomQuotes = async ({
	count = CONFIG.DEFAULT_COUNT,
	savedQuoteIds,
}: FetchQuotesParams = {}): Promise<Quote[]> => {
	try {
		console.log('[MovieProvider] Fetching random quotes...')

		const response = (await processFetchRequest(
			`${CONFIG.BASE_URL}${CONFIG.ENDPOINTS.ALL_QUOTES}`
		)) as ApiResponse

		if (!response?.Quotes?.[0]) {
			throw new Error('Invalid API response format')
		}

		// Process quotes
		const allQuotes = response.Quotes.flat()
		const uniqueQuotes = removeDuplicates(allQuotes)
		const availableQuotes = filterSavedQuotes(uniqueQuotes, savedQuoteIds)
		const randomQuotes = shuffleArray(availableQuotes).slice(0, count)
		const formattedQuotes = randomQuotes.map(formatQuote)

		console.log(
			`[MovieProvider] Successfully fetched ${formattedQuotes.length} quotes`
		)
		return formattedQuotes
	} catch (error) {
		console.error('[MovieProvider] Error fetching random quotes:', error)
		throw error
	}
}

const searchQuotes = async (query: string): Promise<Quote[]> => {
	try {
		console.log(`[MovieProvider] Searching quotes with query: "${query}"`)

		const response = (await processFetchRequest(
			`${CONFIG.BASE_URL}${CONFIG.ENDPOINTS.SEARCH}?q=${encodeURIComponent(
				query
			)}`
		)) as ApiResponse

		if (!response?.Quotes?.[0]) {
			throw new Error('Invalid API response format')
		}

		const quotes = response.Quotes.flat()
		const uniqueQuotes = removeDuplicates(quotes)
		const formattedQuotes = uniqueQuotes.map(formatQuote)

		console.log(
			`[MovieProvider] Found ${formattedQuotes.length} quotes matching query`
		)
		return formattedQuotes
	} catch (error) {
		console.error('[MovieProvider] Error searching quotes:', error)
		throw error
	}
}

export default {
	getRandomQuotes,
	searchQuotes,
}
