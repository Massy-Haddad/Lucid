import React from 'react'
import { ThemedView } from './ThemedView'
import { Image } from 'react-native'
import { useColorScheme } from '@/hooks/useColorScheme.web'

export default function Splash() {
	const colorScheme = useColorScheme()
	return (
		<ThemedView className="flex-1 justify-center items-center">
			{colorScheme == 'dark' ? (
				<Image
					className="w-60 h-60"
					source={require('@/assets/images/icons/splash-icon-light.png')}
				/>
			) : (
				<Image
					className="w-60 h-60"
					source={require('@/assets/images/icons/splash-icon-dark.png')}
				/>
			)}
		</ThemedView>
	)
}
