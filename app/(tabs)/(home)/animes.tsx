import React, { useEffect } from 'react'
import { View, ActivityIndicator, Dimensions } from 'react-native'
import { QuoteCard } from '@/components/QuoteCard'
import { useQuotes } from '@/context/QuotesContext'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'
import { ThemedText } from '@/components/ThemedText'
import { VerticalList } from '@/components/VerticalList'
import { useThemeColor } from '@/hooks/useThemeColor'
import { ThemedView } from '@/components/ThemedView'
import { Feather } from '@expo/vector-icons'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

export default function AnimeQuotesScreen() {
	const { animeQuotes, fetchAnimeQuotes, isLoading, isLoadingMore } =
		useQuotes()
	const colorScheme = useColorScheme()
	const textColor = useThemeColor({}, 'text')
	const background = useThemeColor({}, 'background')
	const mutedColor = useThemeColor({}, 'muted')

	useEffect(() => {
		fetchAnimeQuotes()
	}, [])

	const handleLoadMore = () => {
		if (!isLoadingMore) {
			fetchAnimeQuotes()
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

	if (!isLoading && animeQuotes.length === 0) {
		return (
			<ThemedView className="flex-1 items-center justify-center py-16">
				<Feather
					name="film"
					size={36}
					color={mutedColor}
					className="opacity-90"
				/>
				<ThemedText type="subtitle" className="text-xl text-center mt-4">
					No Anime Quotes Available
				</ThemedText>
				<ThemedText type="muted" className="text-center mt-2 px-8">
					Check back later for inspiring anime quotes
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
				data={animeQuotes}
				onEndReached={handleLoadMore}
				isLoadingMore={isLoadingMore}
			/>
		</ThemedView>
	)
}
