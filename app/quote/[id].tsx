import React from 'react'
import { View, TouchableOpacity, ImageBackground } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { BlurView } from 'expo-blur'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'
import { useQuotes } from '@/context/QuotesContext'
import { Quote } from '@/types/quote'
import { ThemedText } from '@/components/ThemedText'

export default function QuoteDetailScreen() {
	const { id } = useLocalSearchParams()
	const router = useRouter()
	const colorScheme = useColorScheme()
	const { movieQuotes, animeQuotes, savedQuotes, saveQuote, removeQuote } =
		useQuotes()

	const quote = [...movieQuotes, ...animeQuotes, ...savedQuotes].find(
		(q: Quote) => q.id === id
	)

	if (!quote) {
		return (
			<View className="flex-1">
				<ImageBackground
					source={require('@/assets/images/bg1.jpg')}
					className="flex-1 w-full h-full"
					blurRadius={3}
				>
					<View className="flex-1 bg-black/30">
						<BlurView
							intensity={30}
							tint={colorScheme === 'dark' ? 'dark' : 'light'}
							className="flex-1 items-center justify-center p-6"
						>
							<ThemedText type="title" className="text-center text-2xl mb-6">
								Quote not found
							</ThemedText>
							<TouchableOpacity
								className="bg-white/10 backdrop-blur-lg px-6 py-3 rounded-2xl"
								onPress={() => router.back()}
							>
								<ThemedText type="default">Go Back</ThemedText>
							</TouchableOpacity>
						</BlurView>
					</View>
				</ImageBackground>
			</View>
		)
	}

	const isQuoteSaved = savedQuotes.some((q: Quote) => q.id === quote.id)

	return (
		<View className="flex-1">
			<ImageBackground
				source={require('@/assets/images/bg1.jpg')}
				className="flex-1 w-full h-full"
				blurRadius={3}
			>
				<View className="flex-1 bg-black/30">
					<BlurView
						intensity={30}
						tint={colorScheme === 'dark' ? 'dark' : 'light'}
						className="flex-1"
					>
						<View className="flex-1 p-6">
							{/* Back Button */}
							<TouchableOpacity
								className="absolute top-16 left-6 z-10 bg-white/10 backdrop-blur-lg w-12 h-12 rounded-full items-center justify-center"
								onPress={() => router.back()}
							>
								<IconSymbol
									name="chevron.left"
									size={24}
									color={Colors[colorScheme ?? 'light'].tint}
								/>
							</TouchableOpacity>

							{/* Save Button */}
							<TouchableOpacity
								className="absolute top-16 right-6 z-10 bg-white/10 backdrop-blur-lg w-12 h-12 rounded-full items-center justify-center"
								onPress={() =>
									isQuoteSaved ? removeQuote(quote.id) : saveQuote(quote)
								}
							>
								<IconSymbol
									name={isQuoteSaved ? 'heart.fill' : 'heart'}
									size={24}
									color={Colors[colorScheme ?? 'light'].tint}
								/>
							</TouchableOpacity>

							{/* Quote Content */}
							<View className="flex-1 justify-center items-center">
								<View className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 w-full max-w-lg">
									<ThemedText
										type="title"
										className="text-center text-3xl font-bold mb-8"
									>
										"{quote.text}"
									</ThemedText>

									<View className="mt-6">
										<ThemedText
											type="subtitle"
											className="text-center text-xl font-semibold"
										>
											{quote.source}
										</ThemedText>
										<ThemedText
											type="default"
											className="text-center text-lg mt-2 italic"
										>
											- {quote.author}
										</ThemedText>
									</View>
								</View>
							</View>

							{/* Save Button Label */}
							<View className="items-center mb-6">
								<TouchableOpacity
									className="flex-row items-center bg-white/10 backdrop-blur-lg px-6 py-3 rounded-2xl"
									onPress={() =>
										isQuoteSaved ? removeQuote(quote.id) : saveQuote(quote)
									}
								>
									<IconSymbol
										name={isQuoteSaved ? 'heart.fill' : 'heart'}
										size={20}
										color={Colors[colorScheme ?? 'light'].tint}
									/>
									<ThemedText type="default" className="ml-2">
										{isQuoteSaved
											? 'Remove from Favorites'
											: 'Add to Favorites'}
									</ThemedText>
								</TouchableOpacity>
							</View>
						</View>
					</BlurView>
				</View>
			</ImageBackground>
		</View>
	)
}
