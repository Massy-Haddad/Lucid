import React, { useEffect } from 'react'
import { preloadImages } from '@/utils/imageCache'
import { Images } from '@/constants/Images'

export const ImagePreloader: React.FC = () => {
	useEffect(() => {
		const preloadAllImages = async () => {
			const allImages = [
				...Object.values(Images.quotes.animes),
				...Object.values(Images.quotes.movies),
				...Object.values(Images.quotes.history),
			]
			await preloadImages(allImages)
		}

		preloadAllImages()
	}, [])

	return null
}
