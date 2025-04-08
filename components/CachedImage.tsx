import React, { useEffect, useState } from 'react'
import { Image, ImageProps } from 'react-native'

import { getCachedImagePath } from '@/utils/imageCache'

interface CachedImageProps extends Omit<ImageProps, 'source'> {
	uri: string
	fallback?: any
}

export const CachedImage: React.FC<CachedImageProps> = ({
	uri,
	fallback,
	...props
}) => {
	const [source, setSource] = useState<any>(fallback)

	useEffect(() => {
		const loadImage = async () => {
			try {
				const cachedPath = await getCachedImagePath(uri)
				setSource({ uri: cachedPath })
			} catch (error) {
				console.error('Failed to load cached image:', error)
				setSource({ uri })
			}
		}

		loadImage()
	}, [uri])

	return <Image source={source} {...props} />
}
