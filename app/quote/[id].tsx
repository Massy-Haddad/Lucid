import React, { useState, useEffect } from 'react'
import {
	View,
	TouchableOpacity,
	ImageBackground,
	ScrollView,
	Dimensions,
} from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useQuotes } from '@/context/QuotesContext'
import { Quote } from '@/types/quote'
import { ThemedText } from '@/components/ThemedText'
import { Feather, FontAwesome } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ThemedView } from '@/components/ThemedView'
import { LinearGradient } from 'expo-linear-gradient'
import { Images } from '@/constants/Images'
import { captureRef } from 'react-native-view-shot'
import * as Sharing from 'expo-sharing'
import { QuoteCard } from '@/components/QuoteCard'

const { height, width } = Dimensions.get('window')

interface QuoteWithBackground extends Quote {
	backgroundImage?: any
}

export default function QuoteDetailScreen() {
	const router = useRouter()
	const insets = useSafeAreaInsets()
	const { quote: quoteParam } = useLocalSearchParams()
	const quote = JSON.parse(quoteParam as string) as QuoteWithBackground
	const { isQuoteSaved, saveQuote, removeQuote, savedQuotes } = useQuotes()
	const [isSaved, setIsSaved] = useState(false)
	const quoteCardRef = React.useRef(null)

	// Update local state whenever savedQuotes changes
	useEffect(() => {
		const saved = isQuoteSaved(quote.id)
		console.log(`[QuoteDetail] Quote ${quote.id} saved status:`, saved)
		setIsSaved(saved)
	}, [quote.id, savedQuotes]) // Watch savedQuotes instead of isQuoteSaved

	const handleToggleSave = async () => {
		try {
			console.log(
				`[QuoteDetail] Attempting to toggle save for quote ${quote.id}. Current state:`,
				isSaved
			)

			if (isSaved) {
				console.log(`[QuoteDetail] Removing quote ${quote.id}`)
				await removeQuote(quote.id)
			} else {
				console.log(`[QuoteDetail] Saving quote ${quote.id}`)
				await saveQuote(quote)
			}

			const newSavedState = !isSaved
			console.log(
				`[QuoteDetail] Save toggle complete. New state:`,
				newSavedState
			)
			setIsSaved(newSavedState)
		} catch (error) {
			console.error('[QuoteDetail] Error toggling quote save:', error)
		}
	}

	const handleShare = async () => {
		try {
			// Check if sharing is available
			const isSharingAvailable = await Sharing.isAvailableAsync()
			if (!isSharingAvailable) {
				alert('Sharing is not available on your platform')
				return
			}

			// Add a small delay to ensure the view is rendered
			await new Promise((resolve) => setTimeout(resolve, 100))

			// Capture the quote card as an image
			const uri = await captureRef(quoteCardRef, {
				format: 'png',
				quality: 1,
				result: 'tmpfile',
			})

			// Share the image
			await Sharing.shareAsync(uri, {
				mimeType: 'image/png',
				dialogTitle: 'Share Quote',
			})
		} catch (error) {
			console.error('[QuoteDetail] Error sharing quote:', error)
			alert('Failed to share quote')
		}
	}

	// If no background image was passed, get a default one
	if (!quote.backgroundImage) {
		const getRandomImage = (images: Record<string, any>) => {
			const keys = Object.keys(images)
			const randomKey = keys[Math.floor(Math.random() * keys.length)]
			return images[randomKey]
		}

		quote.backgroundImage = getRandomImage(Images.quotes.history)
	}

	return (
		<ThemedView className="flex-1">
			<ImageBackground
				source={quote.backgroundImage}
				className="flex-1"
				style={{ width: width, height: height * 0.45 }}
			>
				<LinearGradient
					colors={['transparent', 'rgba(0,0,255,0.25)']}
					locations={[0, 0.5]}
					style={{
						position: 'absolute',
						left: 0,
						right: 0,
						bottom: 0,
						height: '100%',
					}}
				/>
				{/* Header Buttons */}
				<View className="absolute left-5 z-10" style={{ top: insets.top + 5 }}>
					<TouchableOpacity
						onPress={() => router.back()}
						className="p-2 w-12 h-12 rounded-full bg-black/30 items-center justify-center"
					>
						<Feather name="chevron-left" size={28} color="#FFF" />
					</TouchableOpacity>
				</View>

				<View
					className="absolute right-5 z-10 flex-row gap-2"
					style={{ top: insets.top + 5 }}
				>
					<TouchableOpacity
						className="p-1 w-12 h-12 rounded-full bg-black/20 items-center justify-center"
						onPress={handleShare}
					>
						<Feather name="share" size={24} color="#FFF" />
					</TouchableOpacity>

					<TouchableOpacity
						className="p-1 w-12 h-12 rounded-full bg-black/20 items-center justify-center"
						onPress={handleToggleSave}
					>
						<FontAwesome
							name={isSaved ? 'heart' : 'heart-o'}
							size={24}
							color={isSaved ? '#FF3B30' : '#FFF'}
						/>
					</TouchableOpacity>
				</View>

				{/* Hidden QuoteCard for sharing */}
				<View
					style={{
						position: 'absolute',
						opacity: 0,
						width: width * 0.8,
						height: width * 0.8, // Add fixed height
						left: -9999, // Use left instead of top
					}}
					ref={quoteCardRef}
					collapsable={false} // Add this to ensure the view is not optimized away
				>
					<QuoteCard
						quote={quote}
						isActive={true}
						variant="swiper"
						itemSize={width * 0.8}
					/>
				</View>
			</ImageBackground>

			{/* Content Card */}
			<ThemedView
				className="absolute bottom-0 left-0 right-0 rounded-t-[30px] overflow-hidden"
				style={{ minHeight: height * 0.65 }}
			>
				<ScrollView className="flex-1">
					{/* Author Info */}
					<View className="px-5 mt-8 mb-5">
						<ThemedText type="subtitle" className="mb-3">
							{quote.author}
						</ThemedText>
						<View className="flex-row items-center gap-2">
							<Feather name="bookmark" size={16} color="#666" />
							<ThemedText type="muted">{quote.source}</ThemedText>
						</View>
					</View>

					{/* Quote Text */}
					<ThemedView className="mx-5 mb-8 p-5 rounded-2xl">
						<FontAwesome name="quote-left" size={24} color="#666" />
						<ThemedText type="mutedForeground">" {quote.text} "</ThemedText>
					</ThemedView>

					{/* Similar Quotes Section */}
					<View className="px-5 mb-8">
						<View className="flex-row justify-between items-center mb-4">
							<ThemedText type="subtitle">Similar quotes</ThemedText>
							<ThemedText type="muted">See all</ThemedText>
						</View>
						{/* Add similar quotes carousel here */}
						<ScrollView horizontal showsHorizontalScrollIndicator={false}>
							<View className="flex-row gap-4">
								<View className="w-48 h-24 rounded-2xl bg-gray-700"></View>
								<View className="w-48 h-24 rounded-2xl bg-gray-700"></View>
								<View className="w-48 h-24 rounded-2xl bg-gray-700"></View>
								<View className="w-48 h-24 rounded-2xl bg-gray-700"></View>
							</View>
						</ScrollView>
					</View>
				</ScrollView>
			</ThemedView>
		</ThemedView>
	)
}
