import React from 'react'
import { ThemedView } from './ThemedView'
import { ThemedText } from './ThemedText'

export default function SplashScreen() {
	return (
		<ThemedView className="flex-1 justify-center items-center">
			<ThemedText>Splash Screen</ThemedText>
		</ThemedView>
	)
}
