import React from 'react'
import { FlatList, View, Dimensions, RefreshControl } from 'react-native'
import { useQuotes } from '@/context/QuotesContext'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { QuoteCard } from '@/components/QuoteCard'
import { useColorScheme } from '@/hooks/useColorScheme'
import { useThemeColor } from '@/hooks/useThemeColor'
import { Feather } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Quote } from '@/types/quote'

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const CARD_MARGIN = 8
const CARD_PADDING = 16
const CARD_WIDTH = (SCREEN_WIDTH - (CARD_PADDING * 2 + CARD_MARGIN * 2)) / 2

export default function FavoritesScreen() {
	const { savedQuotes, loadSavedQuotes } = useQuotes()
	const [refreshing, setRefreshing] = React.useState(false)
	const colorScheme = useColorScheme()
	const mutedColor = useThemeColor({}, 'muted')
	const insets = useSafeAreaInsets()

	const onRefresh = React.useCallback(async () => {
		setRefreshing(true)
		await loadSavedQuotes()
		setRefreshing(false)
	}, [])

	const renderHeader = () => (
		<View
			className="border-b border-neutral-800/10 dark:border-neutral-300/10 mb-4"
			style={{ paddingTop: insets.top }}
		>
			<View className="px-4 py-4">
				<View className="flex-row items-center gap-3">
					<ThemedText type="title" className="text-3xl font-bold">
						Favorites
					</ThemedText>
					<View
						className="px-3 py-1 rounded-full opacity-80"
						style={{ backgroundColor: mutedColor }}
					>
						<ThemedText type="default" className="text-sm">
							{savedQuotes.length}
						</ThemedText>
					</View>
				</View>
				<ThemedText type="muted" className="text-base mt-1">
					Your collection of inspiring quotes
				</ThemedText>
			</View>
		</View>
	)

	const renderEmptyComponent = () => (
		<ThemedView className="flex-1 items-center justify-center py-16">
			<Feather name="heart" size={48} color="#FF3B30" className="opacity-90" />
			<ThemedText type="title" className="text-xl text-center mt-4">
				No Saved Quotes Yet
			</ThemedText>
			<ThemedText type="muted" className="text-center mt-2 px-8">
				Start saving your favorite quotes by tapping the heart icon on any quote
				card
			</ThemedText>
		</ThemedView>
	)

	const renderItem = ({ item, index }: { item: Quote; index: number }) => (
		<View className="m-2" style={{ width: CARD_WIDTH }}>
			<QuoteCard
				quote={item}
				isActive={true}
				style={{ height: SCREEN_WIDTH * 0.7 }}
				variant="grid"
			/>
		</View>
	)

	return (
		<ThemedView className="flex-1">
			<FlatList
				data={savedQuotes}
				keyExtractor={(item) => item.id}
				renderItem={renderItem}
				numColumns={2}
				contentContainerStyle={[
					{ paddingHorizontal: CARD_PADDING - CARD_MARGIN },
					savedQuotes.length === 0 && { flexGrow: 1 },
				]}
				columnWrapperStyle={{ justifyContent: 'flex-start' }}
				ListHeaderComponent={renderHeader}
				ListEmptyComponent={renderEmptyComponent}
				showsVerticalScrollIndicator={false}
				className="mb-36"
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
						tintColor={colorScheme === 'dark' ? '#fff' : '#000'}
					/>
				}
			/>
		</ThemedView>
	)
}
