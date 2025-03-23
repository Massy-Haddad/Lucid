import React, { useEffect } from 'react'
import { View, ActivityIndicator, Dimensions } from 'react-native'
import { QuoteCard } from '@/components/QuoteCard'
import { useQuotes } from '@/context/QuotesContext'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'
import { ThemedText } from '@/components/ThemedText'
import { VerticalList } from '@/components/VerticalList'
import { useThemeColor } from '@/hooks/useThemeColor'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

export default function PhilosophyQuotesScreen() {
	const {
		philosophyQuotes,
		currentQuoteIndex,
		setCurrentQuoteIndex,
		fetchPhilosophyQuotes,
		saveQuote,
		isQuoteSaved,
		isLoading,
	} = useQuotes()
	const colorScheme = useColorScheme()
	const textColor = useThemeColor({}, 'text')
	const background = useThemeColor({}, 'background')

	useEffect(() => {
		fetchPhilosophyQuotes()
	}, [])

	if (isLoading && philosophyQuotes.length === 0) {
		return (
			<View
				className="flex-1 items-center justify-center"
				style={{ backgroundColor: background }}
			>
				<ActivityIndicator
					size="large"
					color={Colors[colorScheme ?? 'light'].text}
				/>
			</View>
		)
	}

	if (philosophyQuotes.length === 0) {
		return (
			<View
				className="flex-1 items-center justify-center"
				style={{ backgroundColor: background }}
			>
				<ThemedText type="title" className="text-center">
					No philosophy quotes available
				</ThemedText>
			</View>
		)
	}

	return (
		<View className="flex-1" style={{ backgroundColor: background }}>
			<VerticalList data={philosophyQuotes} />
		</View>
	)
}
