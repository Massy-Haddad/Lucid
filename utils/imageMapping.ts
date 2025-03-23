import { ImageSourcePropType } from 'react-native'
import { Images } from '@/constants/Images'
import { QuoteType } from '@/types/quote'

// Create a deterministic hash from a string
function hashString(str: string): number {
	let hash = 0
	for (let i = 0; i < str.length; i++) {
		const char = str.charCodeAt(i)
		hash = (hash << 5) - hash + char
		hash = hash & hash // Convert to 32-bit integer
	}
	return Math.abs(hash)
}

type ImageSet = Record<string, ImageSourcePropType>

// Get a consistent image based on quote source and type
export function getQuoteImage(
	source: string,
	type?: QuoteType
): ImageSourcePropType {
	let imageSet: ImageSet

	// Use type if available, otherwise fall back to source
	const category = type || source.toLowerCase()

	switch (category) {
		case 'anime':
			imageSet = Images.quotes.animes
			break
		case 'movie':
			imageSet = Images.quotes.movies
			break
		case 'philosophy':
		case 'history':
		default:
			imageSet = Images.quotes.history
	}

	const imageKeys = Object.keys(imageSet)
	const hash = hashString(source)
	const index = hash % imageKeys.length
	return imageSet[imageKeys[index]]
}

// Preload all images for better performance
export const preloadedImages = {
	animes: Object.values(Images.quotes.animes as ImageSet),
	history: Object.values(Images.quotes.history as ImageSet),
	movies: Object.values(Images.quotes.movies as ImageSet),
}
