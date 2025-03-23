import { Quote } from '@/types/quote'

interface AnimeQuote {
	quote: string
	character: string
	show: string
	_id: string
}

interface AnimeQuotesOptions {
	character?: string
	show?: string
	random?: number
}

class AnimeQuotesProvider {
	private baseUrl = 'https://yurippe.vercel.app/api/quotes'

	private transformQuote(quote: AnimeQuote): Quote {
		return {
			id: `anime-${quote._id}`,
			text: quote.quote,
			author: quote.character,
			source: quote.show,
			type: 'anime',
			tags: [],
		}
	}

	async getRandomQuotes(options: AnimeQuotesOptions = {}): Promise<Quote[]> {
		try {
			const queryParams = new URLSearchParams()

			if (options.character) {
				queryParams.append('character', options.character)
			}

			if (options.show) {
				queryParams.append('show', options.show)
			}

			// Always get random quotes, default to 10 if not specified
			queryParams.append('random', (options.random || 10).toString())

			const url = `${this.baseUrl}?${queryParams.toString()}`
			const response = await fetch(url)

			if (!response.ok) {
				throw new Error('Failed to fetch anime quotes')
			}

			const data = await response.json()
			const quotes = Array.isArray(data) ? data : [data]

			return quotes.map(this.transformQuote)
		} catch (error) {
			console.error('[AnimeQuotesProvider] Error fetching quotes:', error)
			throw error
		}
	}

	async getQuotesByCharacter(
		character: string,
		random?: number
	): Promise<Quote[]> {
		return this.getRandomQuotes({ character, random })
	}

	async getQuotesByShow(show: string, random?: number): Promise<Quote[]> {
		return this.getRandomQuotes({ show, random })
	}
}

export const animeService = new AnimeQuotesProvider()
