import React, { useEffect } from 'react'
import { View, Text, ImageBackground } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import { QuoteCard } from '@/components/QuoteCard'
import { useQuotes } from '@/context/QuotesContext'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'
import { Quote } from '@/types/quote'

export default function AnimeQuotesScreen() {
	const { animeQuotes, fetchAnimeQuotes, saveQuote, isLoading } = useQuotes()
	const colorScheme = useColorScheme()

	useEffect(() => {
		fetchAnimeQuotes()
	}, [])

	if (isLoading && animeQuotes.length === 0) {
		return (
			<View className="flex-1 justify-center items-center">
				<Text className={colorScheme === 'dark' ? 'text-white' : 'text-black'}>
					Loading quotes...
				</Text>
			</View>
		)
	}

	if (!isLoading && animeQuotes.length === 0) {
		return (
			<View className="flex-1 justify-center items-center">
				<Text className={colorScheme === 'dark' ? 'text-white' : 'text-black'}>
					No quotes available. Pull to refresh.
				</Text>
			</View>
		)
	}

	return (
		<View className="flex-1">
			<ImageBackground
				source={require('@/assets/images/bg1.jpg')}
				className="flex-1 w-full h-full"
				blurRadius={3}
			>
				<View className="flex-1 bg-black/30">
					<Swiper<Quote>
						cards={animeQuotes}
						renderCard={(quote) => {
							if (!quote) return null
							return <QuoteCard quote={quote} onSave={() => saveQuote(quote)} />
						}}
						onSwipedAll={fetchAnimeQuotes}
						cardIndex={0}
						backgroundColor="transparent"
						stackSize={3}
						cardVerticalMargin={20}
						cardHorizontalMargin={10}
						animateOverlayLabelsOpacity
						animateCardOpacity
						swipeBackCard
						overlayLabels={{
							left: {
								title: 'NOPE',
								style: {
									label: {
										backgroundColor: '#FF3B30',
										color: '#fff',
										fontSize: 24,
									},
									wrapper: {
										flexDirection: 'column',
										alignItems: 'flex-end',
										justifyContent: 'flex-start',
										marginTop: 20,
										marginLeft: -20,
									},
								},
							},
							right: {
								title: 'SAVE',
								style: {
									label: {
										backgroundColor: Colors[colorScheme ?? 'light'].tint,
										color: '#fff',
										fontSize: 24,
									},
									wrapper: {
										flexDirection: 'column',
										alignItems: 'flex-start',
										justifyContent: 'flex-start',
										marginTop: 20,
										marginLeft: 20,
									},
								},
							},
						}}
					/>
				</View>
			</ImageBackground>
		</View>
	)
}
