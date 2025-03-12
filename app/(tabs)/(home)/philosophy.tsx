import React, { useEffect, useRef } from 'react'
import { View, ActivityIndicator } from 'react-native'
import Swiper from 'react-native-deck-swiper'

import { Quote } from '@/types/quote'
import { Colors } from '@/constants/Colors'
import { QuoteCard } from '@/components/QuoteCard'
import { useQuotes } from '@/context/QuotesContext'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { useColorScheme } from '@/hooks/useColorScheme'

export default function PhilosophyQuotesScreen() {
	const {
		philosophyQuotes,
		fetchPhilosophyQuotes,
		isLoading,
		setCurrentQuoteIndex,
		isQuoteSaved,
	} = useQuotes()
	const colorScheme = useColorScheme()
	const swiperRef = useRef<Swiper<Quote>>(null)

	useEffect(() => {
		fetchPhilosophyQuotes(true)
	}, [])

	if (isLoading && philosophyQuotes.length === 0) {
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

	if (!isLoading && philosophyQuotes.length === 0) {
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
			<View className="flex-1 items-center justify-center px-5 relative">
				<Swiper<Quote>
					ref={swiperRef}
					cards={philosophyQuotes}
					renderCard={(quote, cardIndex) => {
						if (!quote) return null
						return (
							<QuoteCard
								quote={quote}
								isActive={cardIndex === 0}
								isSaved={isQuoteSaved(quote.id)}
								variant="swiper"
							/>
						)
					}}
					onSwiped={(cardIndex) => {
						setCurrentQuoteIndex(cardIndex + 1)
					}}
					cardIndex={0}
					backgroundColor="transparent"
					infinite
					stackSize={3}
					stackScale={0.95}
					stackSeparation={22}
					cardVerticalMargin={24}
					cardHorizontalMargin={20}
					animateOverlayLabelsOpacity
					animateCardOpacity
					horizontalSwipe={false}
					verticalSwipe={true}
					showSecondCard
					disableBottomSwipe={false}
					goBackToPreviousCardOnSwipeBottom
				/>
				<View className="absolute bottom-0 left-0 right-0 p-16 mb-28">
					<ThemedText type="muted" className="text-center">
						Swipe up for next, swipe down for previous.
					</ThemedText>
				</View>
			</View>
		</ThemedView>
	)
}
