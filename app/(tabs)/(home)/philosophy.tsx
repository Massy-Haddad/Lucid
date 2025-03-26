import React, { useEffect } from 'react'
import { View, ActivityIndicator, Dimensions } from 'react-native'
import { QuoteCard } from '@/components/QuoteCard'
import { useQuotes } from '@/context/QuotesContext'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'
import { ThemedText } from '@/components/ThemedText'
import { VerticalList } from '@/components/VerticalList'
import { useThemeColor } from '@/hooks/useThemeColor'
import { Feather } from '@expo/vector-icons'
import { ThemedView } from '@/components/ThemedView'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

export default function PhilosophyQuotesScreen() {
	const { philosophyQuotes, fetchPhilosophyQuotes, isLoading, isLoadingMore } =
		useQuotes()
	const colorScheme = useColorScheme()
	const textColor = useThemeColor({}, 'text')
	const background = useThemeColor({}, 'background')
	const mutedColor = useThemeColor({}, 'muted')

	useEffect(() => {
		fetchPhilosophyQuotes()
	}, [])

	const handleLoadMore = () => {
		if (!isLoadingMore) {
			fetchPhilosophyQuotes()
		}
	}

	if (isLoading) {
		return (
			<ThemedView className="flex-1 items-center justify-center">
				<ActivityIndicator
					size="large"
					color={Colors[colorScheme ?? 'light'].text}
				/>
			</ThemedView>
		)
	}

	if (!isLoading && philosophyQuotes.length === 0) {
		return (
			<ThemedView className="flex-1 items-center justify-center py-16">
				<Feather
					name="book"
					size={36}
					color={mutedColor}
					className="opacity-90"
				/>
				<ThemedText type="subtitle" className="text-xl text-center mt-4">
					No Philosophy Quotes Available
				</ThemedText>
				<ThemedText type="muted" className="text-center mt-2 px-8">
					Check back later for inspiring philosophy quotes
				</ThemedText>
			</ThemedView>
		)
	}

	return (
		<ThemedView className="flex-1">
			<View className="absolute top-4 left-0 right-0 bottom-0 items-center">
				<ThemedText type="muted" className="text-center">
					Swipe to see more quotes
				</ThemedText>
			</View>
			<VerticalList
				data={philosophyQuotes}
				onEndReached={handleLoadMore}
				isLoadingMore={isLoadingMore}
			/>
		</ThemedView>
	)
}
