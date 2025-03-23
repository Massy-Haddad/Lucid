import { View, Dimensions } from 'react-native'
import { Quote } from '@/types/quote'
import {
	SharedValue,
	useAnimatedScrollHandler,
	useSharedValue,
} from 'react-native-reanimated'
import Animated from 'react-native-reanimated'
import { QuoteCard } from './QuoteCard'

type VerticalListProps = {
	data: Quote[]
}

const { height } = Dimensions.get('window')
const _spacing = 4
const _itemSize = height * 0.5
const _itemFullSize = _itemSize + _spacing * 2

export function VerticalList({ data }: VerticalListProps) {
	const scrollY = useSharedValue(0)
	const onScroll = useAnimatedScrollHandler({
		onScroll: ({ contentOffset }) => {
			scrollY.value = contentOffset.y / _itemFullSize
		},
	})

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
				gap: _spacing,
			}}
			snapToInterval={_itemFullSize}
			decelerationRate="fast"
			onScroll={onScroll}
			scrollEventThrottle={16}
			initialScrollIndex={0}
		/>
	)
}
