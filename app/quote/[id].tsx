import React from 'react'
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

const { height, width } = Dimensions.get('window')

export default function QuoteDetailScreen() {
	const router = useRouter()
	const insets = useSafeAreaInsets()
	const { quote: quoteParam } = useLocalSearchParams()
	const quote = JSON.parse(quoteParam as string)
	const { savedQuotes, saveQuote, removeQuote } = useQuotes()

	const isQuoteSaved = savedQuotes.some((q: Quote) => q.id === quote.id)

	return (
		<ThemedView className="flex-1">
			<ImageBackground
				source={quote.backgroundImage}
				className="flex-1"
				style={{ width: width, height: height * 0.3 }}
			>
				<LinearGradient
					colors={['transparent', 'rgba(0,0,0,0.85)']}
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
						className="w-10 h-10 rounded-full bg-black/20 items-center justify-center"
					>
						<Feather name="chevron-left" size={28} color="#FFF" />
					</TouchableOpacity>
				</View>

				<View className="absolute right-5 z-10" style={{ top: insets.top + 5 }}>
					<TouchableOpacity
						className="w-10 h-10 rounded-full bg-black/20 items-center justify-center"
						onPress={() =>
							isQuoteSaved ? removeQuote(quote.id) : saveQuote(quote)
						}
					>
						<Feather
							name={isQuoteSaved ? 'heart' : 'heart'}
							size={24}
							color="#FFF"
						/>
					</TouchableOpacity>
				</View>
			</ImageBackground>

			{/* Content Card */}
			<ThemedView
				className="absolute bottom-0 left-0 right-0 rounded-t-[30px] overflow-hidden"
				style={{ minHeight: height * 0.8 }}
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
					<View className="mx-5 mb-8 p-5 bg-gray-100 rounded-2xl">
						<FontAwesome name="quote-left" size={24} color="#666" />
						<ThemedText type="primary">" {quote.text} "</ThemedText>
					</View>

					{/* Similar Quotes Section */}
					<View className="px-5 mb-8">
						<View className="flex-row justify-between items-center mb-4">
							<ThemedText type="subtitle">Similar quotes</ThemedText>
							<ThemedText type="primary">See all</ThemedText>
						</View>
						{/* Add similar quotes carousel here */}
					</View>
				</ScrollView>
			</ThemedView>
		</ThemedView>
	)
}
