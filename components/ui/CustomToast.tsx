import React from 'react'
import { View, StyleSheet } from 'react-native'
import { BlurView } from 'expo-blur'
import { FontAwesome } from '@expo/vector-icons'
import { useColorScheme } from '@/hooks/useColorScheme.web'
import { ThemedText } from '../ThemedText'

export const toastConfig = {
	success: ({ text1, text2 }: any) => (
		<CustomToast
			type="success"
			title={text1}
			message={text2}
			icon="check-circle"
		/>
	),
	error: ({ text1, text2 }: any) => (
		<CustomToast
			type="error"
			title={text1}
			message={text2}
			icon="exclamation-circle"
		/>
	),
}

interface CustomToastProps {
	type: 'success' | 'error'
	title: string
	message: string
	icon: 'check-circle' | 'exclamation-circle'
}

function CustomToast({ type, title, message, icon }: CustomToastProps) {
	const colorScheme = useColorScheme()
	const isDark = colorScheme === 'dark'

	return (
		<BlurView
			style={[
				styles.container,
				{
					backgroundColor: isDark
						? 'rgba(0,0,0,0.75)'
						: 'rgba(255,255,255,0.75)',
				},
			]}
			intensity={20}
			tint={isDark ? 'dark' : 'light'}
			className={'border-solid border-[1px] border-gray-50/15'}
		>
			<View style={styles.iconContainer}>
				<FontAwesome
					name={icon}
					size={24}
					color={type === 'success' ? '#4CAF50' : '#f44336'}
				/>
			</View>
			<View style={styles.textContainer}>
				<ThemedText type="defaultSemiBold" style={styles.title}>
					{title}
				</ThemedText>
				<ThemedText type="default" style={styles.message}>
					{message}
				</ThemedText>
			</View>
		</BlurView>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		marginHorizontal: 16,
		paddingVertical: 12,
		paddingHorizontal: 16,
		borderRadius: 16,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		maxWidth: '90%',
		minHeight: 64,
	},
	iconContainer: {
		marginRight: 12,
	},
	textContainer: {
		flex: 1,
	},
	title: {
		marginBottom: 2,
	},
	message: {
		opacity: 0.8,
	},
})
