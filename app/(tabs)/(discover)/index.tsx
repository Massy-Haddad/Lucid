import React, { useState, useCallback } from 'react'
import {
	FlatList,
	View,
	Dimensions,
	RefreshControl,
	ActivityIndicator,
} from 'react-native'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { QuoteCard } from '@/components/QuoteCard'
import { useColorScheme } from '@/hooks/useColorScheme'
import { useThemeColor } from '@/hooks/useThemeColor'
import { Feather } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Quote } from '@/types/quote'
import { animeService } from '@/api/providers/animes'
import { ThemedTextInput } from '@/components/ThemedTextInput'
import { ThemedPicker } from '@/components/ThemedPicker'

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const CARD_MARGIN = 8
const CARD_PADDING = 16
const CARD_WIDTH = (SCREEN_WIDTH - (CARD_PADDING * 2 + CARD_MARGIN * 2)) / 2

type SearchCategory = 'anime' | 'character' | 'show'

export default function DiscoverScreen() {
	const [refreshing, setRefreshing] = useState(false)
	const [searchQuery, setSearchQuery] = useState('')
	const [searchCategory, setSearchCategory] = useState<SearchCategory>('anime')
	const [searchResults, setSearchResults] = useState<Quote[]>([])
	const [isSearching, setIsSearching] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const colorScheme = useColorScheme()
	const mutedColor = useThemeColor({}, 'muted')
	const tintColor = useThemeColor({}, 'tint')
	const primaryForegroundColor = useThemeColor({}, 'primaryForeground')
	const backgroundColor = useThemeColor({}, 'background')
	const borderColor = useThemeColor({}, 'border')

	const insets = useSafeAreaInsets()

	const searchCategories: Array<{ label: string; value: SearchCategory }> = [
		{ label: 'Anime', value: 'anime' },
		{ label: 'Character', value: 'character' },
		{ label: 'Show', value: 'show' },
	]

	const handleSearch = async () => {
		if (!searchQuery.trim()) return

		setIsSearching(true)
		setIsLoading(true)

		try {
			let quotes: Quote[] = []
			if (searchCategory === 'character') {
				quotes = await animeService.getQuotesByCharacter(searchQuery)
			} else if (searchCategory === 'show') {
				quotes = await animeService.getQuotesByShow(searchQuery)
			} else {
				quotes = await animeService.getRandomQuotes({ show: searchQuery })
			}
			setSearchResults(quotes)
		} catch (error) {
			console.error('Error searching quotes:', error)
		} finally {
			setIsLoading(false)
		}
	}

	const onRefresh = useCallback(async () => {
		setRefreshing(true)
		// Add refresh logic here
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
							Discover
						</ThemedText>
						<View
							className="px-3 py-1 rounded-full opacity-80"
							style={{
								backgroundColor: mutedColor,
								minWidth: 40,
								alignItems: 'center',
							}}
						>
							<ThemedText type="default" className="text-sm">
								{isSearching ? searchResults.length : 'All'}
							</ThemedText>
						</View>
					</View>
				</View>
				<ThemedText type="muted" className="text-base mt-1">
					Find your next favorite quote
				</ThemedText>
			</View>
		</View>
	)

	const renderSearchBar = () => (
		<View className="px-4 py-3">
			<View className="flex-col gap-4">
				<View className="flex-col gap-2">
					<ThemedText type="muted" className="text-sm px-1">
						Search for:
					</ThemedText>
					<ThemedPicker<SearchCategory>
						selectedValue={searchCategory}
						onValueChange={setSearchCategory}
						options={searchCategories}
						className="px-1"
					/>
				</View>
				<ThemedTextInput
					className="w-full"
					placeholder={`Search by ${searchCategory.toLowerCase()}...`}
					value={searchQuery}
					onChangeText={setSearchQuery}
					onSubmitEditing={handleSearch}
					icon="search"
					rounded="full"
				/>
			</View>
		</View>
	)

	const renderEmptyComponent = () => (
		<ThemedView className="flex-1 items-center justify-center py-16">
			<Feather
				name="search"
				size={36}
				color={mutedColor}
				className="opacity-90"
			/>
			<ThemedText type="subtitle" className="text-xl text-center mt-4">
				{isSearching ? 'No Results Found' : 'Start Exploring'}
			</ThemedText>
			<ThemedText type="muted" className="text-center mt-2 px-8">
				{isSearching
					? 'Try different search terms or categories'
					: 'Search for quotes by anime, character, or show name'}
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

	const renderLoadingComponent = () => (
		<View className="flex-1 items-center justify-center py-16">
			<ActivityIndicator size="large" color={tintColor} />
		</View>
	)

	return (
		<ThemedView className="flex-1">
			{renderHeader()}
			{renderSearchBar()}
			<FlatList
				data={isSearching ? searchResults : []}
				keyExtractor={(item) => item.id}
				renderItem={renderItem}
				numColumns={2}
				contentContainerStyle={[
					{ paddingHorizontal: CARD_PADDING - CARD_MARGIN },
					(!isSearching || searchResults.length === 0) && { flexGrow: 1 },
				]}
				columnWrapperStyle={{ justifyContent: 'flex-start' }}
				ListEmptyComponent={
					isLoading ? renderLoadingComponent : renderEmptyComponent
				}
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
