import { ImageSourcePropType } from 'react-native'
import { Images } from '@/constants/Images'

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

// Get a consistent image based on quote ID
export function getQuoteImage(
	quoteId: string,
	source: string
): ImageSourcePropType {
	const imageSet =
		source.toLowerCase() === 'anime'
			? Images.quotes.animes
			: Images.quotes.history
	const imageKeys = Object.keys(imageSet as ImageSet)
	const hash = hashString(quoteId)
	const index = hash % imageKeys.length
	return (imageSet as ImageSet)[imageKeys[index]]
}

// Preload all images for better performance
export const preloadedImages = {
	animes: Object.values(Images.quotes.animes as ImageSet),
	history: Object.values(Images.quotes.history as ImageSet),
}
