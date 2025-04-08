import { Image } from 'react-native'
import * as FileSystem from 'expo-file-system'

const CACHE_FOLDER = `${FileSystem.cacheDirectory}image_cache/`

// Ensure cache directory exists
const ensureCacheDirectory = async () => {
	const dirInfo = await FileSystem.getInfoAsync(CACHE_FOLDER)
	if (!dirInfo.exists) {
		await FileSystem.makeDirectoryAsync(CACHE_FOLDER, { intermediates: true })
	}
}

// Preload images
export const preloadImages = async (images: any[]) => {
	await ensureCacheDirectory()

	const preloadPromises = images.map(async (image) => {
		const filename = image.split('/').pop()
		const cachePath = `${CACHE_FOLDER}${filename}`

		try {
			const fileInfo = await FileSystem.getInfoAsync(cachePath)

			if (!fileInfo.exists) {
				await FileSystem.downloadAsync(image, cachePath)
			}
		} catch (error) {
			console.error(`Failed to cache image: ${image}`, error)
		}
	})

	await Promise.all(preloadPromises)
}

// Get cached image path
export const getCachedImagePath = async (imageUrl: string) => {
	const filename = imageUrl.split('/').pop()
	const cachePath = `${CACHE_FOLDER}${filename}`

	try {
		const fileInfo = await FileSystem.getInfoAsync(cachePath)
		return fileInfo.exists ? cachePath : imageUrl
	} catch (error) {
		console.error(`Failed to get cached image path: ${imageUrl}`, error)
		return imageUrl
	}
}

// Clear image cache
export const clearImageCache = async () => {
	try {
		await FileSystem.deleteAsync(CACHE_FOLDER, { idempotent: true })
		await ensureCacheDirectory()
	} catch (error) {
		console.error('Failed to clear image cache:', error)
	}
}
