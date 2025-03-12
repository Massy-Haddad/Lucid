import { processFetchRequest } from '../../utils'
import { Quote } from '@/types/quote'

const NINJAS_BASE_URL = 'https://api.api-ninjas.com/v1'
const API_KEY = '5GOyJJd3m+bBUoYJhMFQsw==xv20V04peNxAqwrI'

interface NinjasQuoteResponse {
	quote: string
	author: string
	category: string
}

/**
 * Format raw quote from API to match our Quote type
 */
const formatQuote = (quote: NinjasQuoteResponse): Quote => ({
	id: `${quote.author}-${Date.now()}-${Math.random()}`, // Generate a unique ID
	text: quote.quote,
	author: quote.author,
	source: quote.category,
	type: 'philosophy',
})

/**
 * Get random quotes by making multiple API calls
 * @param {object=} params query params as object
 * @returns json response
 */
const getRandomQuotes = async function (
	params: {
		count?: number
		[key: string]: string | number | boolean | undefined
	} = { count: 5 }
) {
	try {
		const quotes: Quote[] = []
		const count = params.count || 5
		const url = `${NINJAS_BASE_URL}/quotes`

		// Make multiple API calls to get desired number of quotes
		for (let i = 0; i < count; i++) {
			try {
				const response = await processFetchRequest(url, {
					headers: {
						'X-Api-Key': API_KEY,
					},
				})

				if (Array.isArray(response) && response.length > 0) {
					quotes.push(formatQuote(response[0]))
				}
			} catch (err) {
				console.warn(`Failed to fetch quote ${i + 1}:`, err)
			}
		}

		if (quotes.length === 0) {
			throw new Error('Failed to fetch any quotes')
		}

		return quotes
	} catch (error) {
		console.error('API Error:', error)
		throw error
	}
}

export default {
	getRandomQuotes,
}
