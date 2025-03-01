import { Link, Stack } from 'expo-router'
import { StyleSheet, Image } from 'react-native'

import { Text, View } from '@/components/Themed'
import React, { Fragment } from 'react'
import { useColorScheme } from '@/hooks/useColorScheme.web'

export default function NotFoundScreen() {
	const colorScheme = useColorScheme()

	return (
		<React.Fragment>
			<Stack.Screen options={{ title: 'Oops!' }} />
			<View style={styles.container}>
				<Image
					style={styles.image}
					source={
						colorScheme === 'light'
							? require('@/assets/images/icons/splash-icon-dark.png')
							: require('@/assets/images/icons/splash-icon-light.png')
					}
				/>
				<Text style={styles.title}>This screen doesn't exist.</Text>

				<Link href="/" style={styles.link}>
					<Text style={styles.linkText}>Go to home screen!</Text>
				</Link>
			</View>
		</React.Fragment>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	link: {
		marginTop: 15,
		paddingVertical: 15,
	},
	linkText: {
		fontSize: 14,
		color: '#2e78b7',
	},
	image: {
		width: 200,
		height: 200,
		resizeMode: 'contain',
	},
})
