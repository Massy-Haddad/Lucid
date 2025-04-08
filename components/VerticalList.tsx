import { View, Dimensions, ActivityIndicator } from 'react-native'
import { Quote } from '@/types/quote'
import {
	SharedValue,
	useAnimatedScrollHandler,
	useSharedValue,
} from 'react-native-reanimated'
import Animated from 'react-native-reanimated'
import { QuoteCard } from './QuoteCard'
import { useThemeColor } from '@/hooks/useThemeColor'
import { ThemedText } from './ThemedText'

type VerticalListProps = {
	data: Quote[]
	onEndReached?: () => void
	isLoadingMore?: boolean
}

const { height } = Dimensions.get('window')
const _spacing = 4
const _itemSize = height * 0.5
const _itemFullSize = _itemSize + _spacing * 2

export function VerticalList({
	data,
	onEndReached,
	isLoadingMore,
}: VerticalListProps) {
	const scrollY = useSharedValue(0)
	const textColor = useThemeColor({}, 'text')
	const mutedColor = useThemeColor({}, 'muted')

	const onScroll = useAnimatedScrollHandler({
		onScroll: ({ contentOffset }) => {
			scrollY.value = contentOffset.y / _itemFullSize
		},
	})

	const handleEndReached = () => {
		console.log('[VerticalList] End reached, isLoadingMore:', isLoadingMore)
		if (onEndReached && !isLoadingMore) {
			console.log('[VerticalList] Triggering onEndReached')
			onEndReached()
		} else {
			console.log('[VerticalList] Skipping onEndReached:', {
				hasCallback: !!onEndReached,
				isLoadingMore,
			})
		}
	}

	const renderFooter = () => {
		if (!isLoadingMore) return null

		console.log('[VerticalList] Rendering loading footer')
		return (
			<View className="py-8 items-center">
				<ActivityIndicator size="small" color={textColor} />
				<ThemedText type="muted" className="mt-2 text-sm">
					Loading more quotes...
				</ThemedText>
			</View>
		)
	}

	return (
		<Animated.FlatList
			data={data}
			renderItem={({ item, index }: { item: Quote; index: number }) => (
				<QuoteCard
					quote={item}
					isActive={false}
					index={index}
					scrollY={scrollY}
					itemSize={_itemSize}
				/>
			)}
			contentContainerStyle={{
				marginHorizontal: _spacing * 3,
				paddingHorizontal: _spacing * 1,
				paddingVertical: (height - _itemFullSize) / 6,
				paddingBottom: 100,
				gap: _spacing,
			}}
			snapToInterval={_itemFullSize}
			decelerationRate="fast"
			onScroll={onScroll}
			scrollEventThrottle={16}
			initialScrollIndex={0}
			onEndReached={handleEndReached}
			onEndReachedThreshold={0.5}
			ListFooterComponent={renderFooter}
		/>
	)
}
