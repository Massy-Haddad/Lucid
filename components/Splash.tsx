import React, { useEffect, useRef } from 'react'
import { StyleSheet, View, Image, Animated } from 'react-native'
import { useColorScheme } from '@/hooks/useColorScheme.web'
import { ThemedView } from './ThemedView'
import { StatusBar } from 'expo-status-bar'
import { ThemedText } from './ThemedText'

export default function Splash() {
	const fadeAnimation = useRef(new Animated.Value(0)).current
	const colorScheme = useColorScheme()

	useEffect(() => {
		Animated.timing(fadeAnimation, {
			toValue: 1,
			duration: 1000,
			useNativeDriver: true,
		}).start()
	}, [fadeAnimation])
	return (
		<View
			className="flex-1 justify-center items-center"
			style={
				colorScheme === 'light'
					? { backgroundColor: '#FFFFFF' }
					: { backgroundColor: '#000000' }
			}
		>
			<Animated.View
				style={[styles.imageContainer, { opacity: fadeAnimation }]}
			>
				<Image
					style={styles.image}
					source={
						colorScheme === 'light'
							? require('@/assets/images/icons/splash-icon-dark.png')
							: require('@/assets/images/icons/splash-icon-light.png')
					}
				/>
				{/* <ThemedText
					type="defaultSemiBold"
					style={{ textAlign: 'center', fontSize: 24, marginTop: 20 }}
				>
					Loading...
				</ThemedText> */}
			</Animated.View>
			<StatusBar style="auto" />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
	},
	imageContainer: {
		borderRadius: 20,
		overflow: 'hidden',
	},
	image: {
		width: 200,
		height: 200,
		resizeMode: 'contain',
	},
})
