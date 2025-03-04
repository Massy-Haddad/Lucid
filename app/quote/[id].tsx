import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { BlurView } from 'expo-blur'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'
import { useQuotes } from '@/context/QuotesContext'
import { Quote } from '@/types/quote'

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
			<View style={styles.container}>
				<BlurView
					intensity={30}
					tint={colorScheme === 'dark' ? 'dark' : 'light'}
					style={styles.blurContainer}
				>
					<Text
						style={[
							styles.errorText,
							{ color: Colors[colorScheme ?? 'light'].tint },
						]}
					>
						Quote not found
					</Text>
					<TouchableOpacity
						style={[
							styles.button,
							{ backgroundColor: Colors[colorScheme ?? 'light'].background },
						]}
						onPress={() => router.back()}
					>
						<Text
							style={[
								styles.buttonText,
								{ color: Colors[colorScheme ?? 'light'].tint },
							]}
						>
							Go Back
						</Text>
					</TouchableOpacity>
				</BlurView>
			</View>
		)
	}

	const isQuoteSaved = savedQuotes.some((q: Quote) => q.id === quote.id)

	return (
		<View style={styles.container}>
			<BlurView
				intensity={30}
				tint={colorScheme === 'dark' ? 'dark' : 'light'}
				style={styles.blurContainer}
			>
				<View style={styles.content}>
					<TouchableOpacity
						style={[
							styles.backButton,
							{ backgroundColor: Colors[colorScheme ?? 'light'].background },
						]}
						onPress={() => router.back()}
					>
						<IconSymbol
							name="chevron.left"
							size={24}
							color={Colors[colorScheme ?? 'light'].tint}
						/>
					</TouchableOpacity>

					<Text
						style={[
							styles.quoteText,
							{ color: Colors[colorScheme ?? 'light'].tint },
						]}
					>
						"{quote.text}"
					</Text>

					<View style={styles.sourceContainer}>
						<Text
							style={[
								styles.sourceText,
								{ color: Colors[colorScheme ?? 'light'].tint },
							]}
						>
							{quote.source}
						</Text>
						<Text
							style={[
								styles.authorText,
								{ color: Colors[colorScheme ?? 'light'].tint },
							]}
						>
							- {quote.author}
						</Text>
					</View>

					<TouchableOpacity
						style={[
							styles.saveButton,
							{ backgroundColor: Colors[colorScheme ?? 'light'].background },
						]}
						onPress={() =>
							isQuoteSaved ? removeQuote(quote.id) : saveQuote(quote)
						}
					>
						<IconSymbol
							name={isQuoteSaved ? 'heart.fill' : 'heart'}
							size={24}
							color={Colors[colorScheme ?? 'light'].tint}
						/>
						<Text
							style={[
								styles.buttonText,
								{ color: Colors[colorScheme ?? 'light'].tint },
							]}
						>
							{isQuoteSaved ? 'Remove from Favorites' : 'Add to Favorites'}
						</Text>
					</TouchableOpacity>
				</View>
			</BlurView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	blurContainer: {
		flex: 1,
		padding: 20,
	},
	content: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		gap: 20,
	},
	backButton: {
		position: 'absolute',
		top: 20,
		left: 20,
		width: 40,
		height: 40,
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	quoteText: {
		fontSize: 28,
		fontWeight: '600',
		textAlign: 'center',
		marginHorizontal: 20,
	},
	sourceContainer: {
		alignItems: 'center',
		gap: 5,
	},
	sourceText: {
		fontSize: 20,
		fontWeight: '500',
	},
	authorText: {
		fontSize: 18,
		fontStyle: 'italic',
	},
	saveButton: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 20,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	buttonText: {
		fontSize: 16,
		fontWeight: '600',
	},
	errorText: {
		fontSize: 20,
		fontWeight: '600',
		textAlign: 'center',
	},
	button: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 20,
		marginTop: 20,
	},
})
