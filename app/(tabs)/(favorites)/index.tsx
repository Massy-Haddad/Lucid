import React from 'react'
import {
	FlatList,
	View,
	Dimensions,
	RefreshControl,
	TouchableOpacity,
} from 'react-native'
import { useQuotes } from '@/context/QuotesContext'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { QuoteCard } from '@/components/QuoteCard'
import { useColorScheme } from '@/hooks/useColorScheme'
import { useThemeColor } from '@/hooks/useThemeColor'
import { Feather } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Quote, QuoteType } from '@/types/quote'
import { router } from 'expo-router'
import { FilterPills, FilterOption } from '@/components/FilterPills'
const { width: SCREEN_WIDTH } = Dimensions.get('window')
const CARD_MARGIN = 8
const CARD_PADDING = 16
const CARD_WIDTH = (SCREEN_WIDTH - (CARD_PADDING * 2 + CARD_MARGIN * 2)) / 2

export default function FavoritesScreen() {
	const { savedQuotes, loadSavedQuotes } = useQuotes()
	const [refreshing, setRefreshing] = React.useState(false)
	const [activeFilter, setActiveFilter] = React.useState<QuoteType | 'all'>(
		'all'
	)
	const colorScheme = useColorScheme()
	const mutedColor = useThemeColor({}, 'muted')
	const tintColor = useThemeColor({}, 'tint')
	const primaryForegroundColor = useThemeColor({}, 'primaryForeground')

	const insets = useSafeAreaInsets()

	const filterOptions: FilterOption[] = [
		{ label: 'All', value: 'all' },
		{ label: 'Anime', value: 'anime' },
		{ label: 'Philosophy', value: 'philosophy' },
		{ label: 'Movie', value: 'movie' },
	]

	const filteredQuotes = React.useMemo(() => {
		if (activeFilter === 'all') return savedQuotes
		return savedQuotes.filter((quote) => quote.type === activeFilter)
	}, [savedQuotes, activeFilter])

	const onRefresh = React.useCallback(async () => {
		setRefreshing(true)
		await loadSavedQuotes()
		setRefreshing(false)
	}, [])

	const renderHeader = () => (
		<View
			className="border-b border-neutral-800/10 dark:border-neutral-300/10 mb-0"
			style={{ paddingTop: insets.top }}
		>
			<View className="px-4 py-4">
				<View className="flex-row items-center justify-between gap-3">
					<View className="flex-row items-center gap-3">
						<ThemedText type="title" className="text-3xl font-bold">
							Favorites
						</ThemedText>
						<View
							className="px-3 py-1 rounded-full opacity-80"
							style={{ backgroundColor: mutedColor }}
						>
							<ThemedText type="default" className="text-sm">
								{filteredQuotes.length}
							</ThemedText>
						</View>
					</View>
					<TouchableOpacity
						onPress={() => router.push('/(tabs)/(favorites)/create-quote')}
						className="p-1 rounded-full bg-blue-500"
					>
						<Feather name="plus" size={24} color={primaryForegroundColor} />
					</TouchableOpacity>
				</View>
				<ThemedText type="muted" className="text-base mt-1">
					Your collection of inspiring quotes
				</ThemedText>
			</View>
		</View>
	)

	const renderFilterHeader = () => (
		<View className="py-2">
			<FilterPills
				options={filterOptions}
				activeFilter={activeFilter}
				onFilterChange={setActiveFilter}
			/>
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
				style={{ height: SCREEN_WIDTH * 0.6 }}
				variant="grid"
			/>
		</View>
	)

	return (
		<ThemedView className="flex-1">
			{renderHeader()}
			<FlatList
				data={filteredQuotes}
				keyExtractor={(item) => item.id}
				renderItem={renderItem}
				numColumns={2}
				contentContainerStyle={[
					{ paddingHorizontal: CARD_PADDING - CARD_MARGIN },
					filteredQuotes.length === 0 && { flexGrow: 1 },
				]}
				columnWrapperStyle={{ justifyContent: 'flex-start' }}
				ListHeaderComponent={renderFilterHeader}
				ListEmptyComponent={renderEmptyComponent}
				showsVerticalScrollIndicator={false}
				className="mb-36"
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
						tintColor={tintColor}
					/>
				}
			/>
		</ThemedView>
	)
}
