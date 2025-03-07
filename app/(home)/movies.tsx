import React, { useEffect, useRef } from 'react'
import { View, ActivityIndicator, Dimensions } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import { QuoteCard } from '@/components/QuoteCard'
import { useQuotes } from '@/context/QuotesContext'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'
import { Quote } from '@/types/quote'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { BlurView } from 'expo-blur'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

export default function MovieQuotesScreen() {
	const {
		movieQuotes,
		fetchMovieQuotes,
		saveQuote,
		isLoading,
		setCurrentQuoteIndex,
	} = useQuotes()
	const colorScheme = useColorScheme()
	const swiperRef = useRef<Swiper<Quote>>(null)

	useEffect(() => {
		fetchMovieQuotes(true)
	}, [])

	if (isLoading && movieQuotes.length === 0) {
		return (
			<View className="flex-1 justify-center items-center">
				<ActivityIndicator
					size="large"
					color={Colors[colorScheme ?? 'light'].tint}
				/>
				<ThemedText type="muted" className="mt-4">
					Loading quotes...
				</ThemedText>
			</View>
		)
	}

	if (!isLoading && movieQuotes.length === 0) {
		return (
			<View className="flex-1 justify-center items-center">
				<ThemedText type="muted" className="text-center px-4">
					No quotes available at the moment.
				</ThemedText>
			</View>
		)
	}

	return (
		<ThemedView className="flex-1">
			<View
				className="flex-1 items-center justify-center px-5"
				style={{ marginTop: SCREEN_HEIGHT * 0.05 }}
			>
				<Swiper<Quote>
					ref={swiperRef}
					cards={movieQuotes}
					renderCard={(quote, cardIndex) => {
						if (!quote) return null
						return (
							<QuoteCard
								quote={quote}
								onSave={() => saveQuote(quote)}
								isActive={cardIndex === 0}
							/>
						)
					}}
					onSwiped={(cardIndex) => {
						setCurrentQuoteIndex(cardIndex + 1)
					}}
					cardIndex={0}
					backgroundColor="transparent"
					stackSize={3}
					cardVerticalMargin={50}
					cardHorizontalMargin={20}
					animateOverlayLabelsOpacity
					animateCardOpacity
					infinite
					showSecondCard={true}
					verticalSwipe={false}
					overlayLabels={{
						left: {
							title: 'NOPE',
							style: {
								label: {
									backgroundColor: 'transparent',
									color: '#FF3B30',
									fontSize: 32,
									fontWeight: 'bold',
									borderWidth: 3,
									borderColor: '#FF3B30',
									borderRadius: 20,
									paddingHorizontal: 20,
									paddingVertical: 10,
									transform: [{ rotate: '30deg' }],
								},
								wrapper: {
									flexDirection: 'column',
									alignItems: 'flex-end',
									justifyContent: 'flex-start',
									marginTop: 30,
									marginLeft: -30,
								},
							},
						},
						right: {
							title: 'SAVE',
							style: {
								label: {
									backgroundColor: 'transparent',
									color: Colors[colorScheme ?? 'light'].tint,
									fontSize: 32,
									fontWeight: 'bold',
									borderWidth: 3,
									borderColor: Colors[colorScheme ?? 'light'].tint,
									borderRadius: 20,
									paddingHorizontal: 20,
									paddingVertical: 10,
									transform: [{ rotate: '-30deg' }],
								},
								wrapper: {
									flexDirection: 'column',
									alignItems: 'flex-start',
									justifyContent: 'flex-start',
									marginTop: 30,
									marginLeft: 30,
								},
							},
						},
					}}
				/>
			</View>
		</ThemedView>
	)
}
