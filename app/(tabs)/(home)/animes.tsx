import React, { useEffect } from 'react'
import { View, ActivityIndicator } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import { QuoteCard } from '@/components/QuoteCard'
import { useQuotes } from '@/context/QuotesContext'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'
import { Quote } from '@/types/quote'
import { ThemedText } from '@/components/ThemedText'

export default function AnimeQuotesScreen() {
	return (
		<View className="flex-1 bg-black/5">
			<View className="flex-1">
				<ThemedText type="title">Animes</ThemedText>
			</View>
		</View>
	)
}
