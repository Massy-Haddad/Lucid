import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { BlurView } from 'expo-blur'
import { Link } from 'expo-router'
import { useColorScheme } from '@/hooks/useColorScheme'
import { Quote } from '@/types/quote'
import { ThemedText } from './ThemedText'

interface QuoteCardProps {
	quote: Quote
	onSave: () => void
}

export function QuoteCard({ quote, onSave }: QuoteCardProps) {
	const colorScheme = useColorScheme()

	return (
		<Link href={`/quote/${quote.id}`} asChild>
			<TouchableOpacity>
				<BlurView
					intensity={30}
					tint={colorScheme === 'dark' ? 'dark' : 'light'}
					className="h-[500px] rounded-3xl overflow-hidden border border-gray-50/15"
				>
					<View className="flex-1 p-6">
						<View className="flex-1 justify-center">
							<ThemedText
								type="title"
								className="text-center text-2xl font-semibold"
							>
								"{quote.text}"
							</ThemedText>
						</View>

						<View className="mt-auto">
							<ThemedText type="subtitle" className="text-center">
								{quote.author}
							</ThemedText>
							<ThemedText
								type="default"
								className="text-center text-gray-400 mt-2"
							>
								{quote.source}
							</ThemedText>
						</View>
					</View>
				</BlurView>
			</TouchableOpacity>
		</Link>
	)
}
