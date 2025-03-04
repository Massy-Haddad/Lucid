import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { BlurView } from 'expo-blur'
import { IconSymbol } from './ui/IconSymbol'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'
import { Quote } from '@/types/quote'
import { Link } from 'expo-router'

interface QuoteCardProps {
	quote: Quote
	onSave: () => void
}

export function QuoteCard({ quote, onSave }: QuoteCardProps) {
	const colorScheme = useColorScheme()
	const tintColor = Colors[colorScheme ?? 'light'].tint

	if (!quote) {
		console.log('Quote is undefined in QuoteCard')
		return null
	}

	return (
		<View style={styles.container}>
			<BlurView
				intensity={90}
				tint={colorScheme === 'dark' ? 'dark' : 'light'}
				style={styles.blurContainer}
			>
				<View style={styles.content}>
					<Text style={[styles.quoteText, { color: tintColor }]}>
						"{quote.text}"
					</Text>
					<View style={styles.sourceContainer}>
						<Text style={[styles.sourceText, { color: tintColor }]}>
							{quote.source}
						</Text>
						<Text style={[styles.authorText, { color: tintColor }]}>
							- {quote.author}
						</Text>
					</View>
					<View style={styles.buttonContainer}>
						<TouchableOpacity
							style={[
								styles.button,
								{ backgroundColor: Colors[colorScheme ?? 'light'].background },
							]}
							onPress={onSave}
						>
							<IconSymbol name="heart.fill" size={24} color={tintColor} />
						</TouchableOpacity>
						<Link href={`/quote/${quote.id}`} asChild>
							<TouchableOpacity
								style={[
									styles.button,
									{
										backgroundColor: Colors[colorScheme ?? 'light'].background,
									},
								]}
							>
								<IconSymbol
									name="arrow.up.right.square.fill"
									size={24}
									color={tintColor}
								/>
							</TouchableOpacity>
						</Link>
					</View>
				</View>
			</BlurView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '90%',
		height: 400,
		alignSelf: 'center',
		borderRadius: 20,
		overflow: 'hidden',
		marginVertical: 10,
	},
	blurContainer: {
		flex: 1,
		padding: 20,
		borderRadius: 20,
	},
	content: {
		flex: 1,
		justifyContent: 'space-between',
	},
	quoteText: {
		fontSize: 24,
		fontWeight: '600',
		textAlign: 'center',
		marginBottom: 20,
	},
	sourceContainer: {
		alignItems: 'center',
	},
	sourceText: {
		fontSize: 18,
		fontWeight: '500',
		marginBottom: 5,
	},
	authorText: {
		fontSize: 16,
		fontStyle: 'italic',
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 20,
	},
	button: {
		width: 50,
		height: 50,
		borderRadius: 25,
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
})
