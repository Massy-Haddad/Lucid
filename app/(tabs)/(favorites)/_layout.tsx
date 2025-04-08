import React from 'react'
import { Stack } from 'expo-router'

export default function TabLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen
				name="index"
				options={{
					title: 'Favorites',
				}}
			/>
			<Stack.Screen
				name="create-quote"
				options={{
					title: 'Create Quote',
				}}
			/>
		</Stack>
	)
}
