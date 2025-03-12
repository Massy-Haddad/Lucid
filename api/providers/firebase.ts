import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { FirestoreQuote, Quote } from '@/types/quote'

const QUOTES_COLLECTION = 'saved_quotes'

class FirebaseService {
	private getCurrentUserId(): string {
		const userId = auth().currentUser?.uid
		if (!userId) throw new Error('No user ID available')
		return userId
	}

	async initializeAnonymousAuth(): Promise<void> {
		try {
			const currentUser = auth().currentUser
			if (!currentUser) {
				await auth().signInAnonymously()
				console.log('[Firebase] Anonymous auth initialized')
			}
		} catch (error) {
			console.error('[Firebase] Error initializing auth:', error)
			throw error
		}
	}

	async saveQuote(quote: Quote): Promise<FirestoreQuote> {
		try {
			const userId = this.getCurrentUserId()
			const quoteRef = firestore().collection(QUOTES_COLLECTION).doc(quote.id)

			// Use a transaction to prevent duplicate writes
			const quoteData = await firestore().runTransaction(
				async (transaction) => {
					const doc = await transaction.get(quoteRef)

					// If the quote already exists for this user, don't save it again
					if (doc.exists) {
						const existingData = doc.data() as FirestoreQuote
						if (existingData.userId === userId) {
							console.log('[Firebase] Quote already exists:', quote.id)
							return existingData
						}
					}

					const newQuoteData: FirestoreQuote = {
						...quote,
						userId,
						savedAt: firestore.Timestamp.now().toDate().toISOString(),
					}

					transaction.set(quoteRef, newQuoteData)
					return newQuoteData
				}
			)

			console.log('[Firebase] Quote saved successfully:', quote.id)
			return quoteData
		} catch (error) {
			console.error('[Firebase] Error saving quote:', error)
			throw error
		}
	}

	async removeQuote(id: string): Promise<void> {
		try {
			const userId = this.getCurrentUserId()
			const quoteRef = firestore().collection(QUOTES_COLLECTION).doc(id)

			// Use a transaction to ensure we only delete if it exists and belongs to the user
			await firestore().runTransaction(async (transaction) => {
				const doc = await transaction.get(quoteRef)
				if (doc.exists) {
					const data = doc.data() as FirestoreQuote
					if (data.userId === userId) {
						transaction.delete(quoteRef)
					}
				}
			})

			console.log('[Firebase] Quote removed successfully:', id)
		} catch (error) {
			console.error('[Firebase] Error removing quote:', error)
			throw error
		}
	}

	async loadSavedQuotes(): Promise<FirestoreQuote[]> {
		try {
			const userId = this.getCurrentUserId()
			const quotesSnapshot = await firestore()
				.collection(QUOTES_COLLECTION)
				.where('userId', '==', userId)
				.orderBy('savedAt', 'desc')
				.get()

			return quotesSnapshot.docs.map((doc) => ({
				...(doc.data() as FirestoreQuote),
				id: doc.id,
			}))
		} catch (error) {
			console.error('[Firebase] Error loading saved quotes:', error)
			throw error
		}
	}

	private lastUpdate: number = 0
	private readonly UPDATE_DEBOUNCE = 1000 // 1 second debounce

	subscribeToSavedQuotes(
		onQuotesUpdate: (quotes: FirestoreQuote[]) => void,
		onError: (error: Error) => void
	): () => void {
		const userId = this.getCurrentUserId()

		return firestore()
			.collection(QUOTES_COLLECTION)
			.where('userId', '==', userId)
			.orderBy('savedAt', 'desc')
			.onSnapshot(
				(snapshot) => {
					// Debounce updates to prevent rapid-fire state changes
					const now = Date.now()
					if (now - this.lastUpdate < this.UPDATE_DEBOUNCE) {
						return
					}
					this.lastUpdate = now

					const quotes = snapshot.docs.map((doc) => ({
						...(doc.data() as FirestoreQuote),
						id: doc.id,
					}))
					onQuotesUpdate(quotes)
				},
				(error) => {
					console.error('[Firebase] Quotes listener error:', error)
					onError(error)
				}
			)
	}
}

export const firebaseService = new FirebaseService()
