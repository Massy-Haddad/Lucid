import { useReducer } from 'react'
import { QuotesState, QuotesAction, Quote } from '@/types/quote'

const initialState: QuotesState = {
	movieQuotes: [],
	animeQuotes: [],
	savedQuotes: [],
	isLoading: false,
	isLoadingMore: false,
	currentQuoteIndex: 0,
}

// Helper function to remove duplicates from an array of quotes
const removeDuplicates = <T extends Quote>(quotes: T[]): T[] => {
	const seen = new Set<string>()
	return quotes.filter((quote) => {
		if (seen.has(quote.id)) {
			return false
		}
		seen.add(quote.id)
		return true
	})
}

function quotesReducer(state: QuotesState, action: QuotesAction): QuotesState {
	switch (action.type) {
		case 'SET_MOVIE_QUOTES':
			return { ...state, movieQuotes: removeDuplicates(action.payload) }

		case 'ADD_MOVIE_QUOTES':
			return {
				...state,
				movieQuotes: removeDuplicates([
					...state.movieQuotes,
					...action.payload,
				]),
			}

		case 'SET_ANIME_QUOTES':
			return { ...state, animeQuotes: removeDuplicates(action.payload) }

		case 'ADD_ANIME_QUOTES':
			return {
				...state,
				animeQuotes: removeDuplicates([
					...state.animeQuotes,
					...action.payload,
				]),
			}

		case 'SET_SAVED_QUOTES':
			return { ...state, savedQuotes: removeDuplicates(action.payload) }

		case 'ADD_SAVED_QUOTE': {
			// Check if quote already exists
			const quoteExists = state.savedQuotes.some(
				(q) => q.id === action.payload.id
			)
			if (quoteExists) {
				return state // Don't modify state if quote already exists
			}
			return {
				...state,
				savedQuotes: removeDuplicates([action.payload, ...state.savedQuotes]),
			}
		}

		case 'REMOVE_SAVED_QUOTE':
			return {
				...state,
				savedQuotes: state.savedQuotes.filter((q) => q.id !== action.payload),
			}

		case 'SET_LOADING':
			return { ...state, isLoading: action.payload }

		case 'SET_LOADING_MORE':
			return { ...state, isLoadingMore: action.payload }

		case 'SET_CURRENT_QUOTE_INDEX':
			return { ...state, currentQuoteIndex: action.payload }

		default:
			return state
	}
}

export function useQuotesReducer() {
	return useReducer(quotesReducer, initialState)
}
