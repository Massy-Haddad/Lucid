export type QuoteType = 'movie' | 'anime' | 'philosophy'

export interface Quote {
	id: string
	text: string
	author: string
	source: string
	type: QuoteType
	backgroundImage?: any // ImageSourcePropType from react-native
	savedAt?: string
}

export interface FirestoreQuote extends Quote {
	userId: string
	savedAt: string
}

export type QuotesState = {
	movieQuotes: Quote[]
	animeQuotes: Quote[]
	philosophyQuotes: Quote[]
	savedQuotes: FirestoreQuote[]
	isLoading: boolean
	isLoadingMore: boolean
	currentQuoteIndex: number
}

export type QuotesAction =
	| { type: 'SET_MOVIE_QUOTES'; payload: Quote[] }
	| { type: 'ADD_MOVIE_QUOTES'; payload: Quote[] }
	| { type: 'SET_ANIME_QUOTES'; payload: Quote[] }
	| { type: 'ADD_ANIME_QUOTES'; payload: Quote[] }
	| { type: 'SET_PHILOSOPHY_QUOTES'; payload: Quote[] }
	| { type: 'ADD_PHILOSOPHY_QUOTES'; payload: Quote[] }
	| { type: 'SET_SAVED_QUOTES'; payload: FirestoreQuote[] }
	| { type: 'ADD_SAVED_QUOTE'; payload: FirestoreQuote }
	| { type: 'REMOVE_SAVED_QUOTE'; payload: string }
	| { type: 'SET_LOADING'; payload: boolean }
	| { type: 'SET_LOADING_MORE'; payload: boolean }
	| { type: 'SET_CURRENT_QUOTE_INDEX'; payload: number }
