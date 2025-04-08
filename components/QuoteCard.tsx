import React, { useState, useEffect } from 'react'
import {
	View,
	TouchableOpacity,
	ImageBackground,
	Dimensions,
	ViewStyle,
	StyleSheet,
} from 'react-native'
import {
	Feather,
	FontAwesome,
	MaterialCommunityIcons,
} from '@expo/vector-icons'
import { Link } from 'expo-router'
import { BlurView } from 'expo-blur'
import { LinearGradient } from 'expo-linear-gradient'
import { useColorScheme } from '@/hooks/useColorScheme'
import { useRouter } from 'expo-router'
import { getQuoteImage } from '@/utils/imageMapping'
import Animated, {
	useAnimatedStyle,
	SharedValue,
	interpolate,
} from 'react-native-reanimated'

import { Quote } from '@/types/quote'
import { ThemedText } from '@/components/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'
import { Colors } from '@/constants/Colors'
import { useQuotes } from '@/context/QuotesContext'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')
const _spacing = 4

export interface QuoteCardProps {
	quote: Quote
	onSave?: () => void
	isActive: boolean
	isSaved?: boolean
	style?: ViewStyle
	variant?: 'grid' | 'swiper'
	index?: number
	scrollY?: SharedValue<number>
	itemSize?: number
}

export function QuoteCard({
	quote,
	onSave,
	isActive,
	style,
	variant = 'swiper',
	index,
	scrollY,
	itemSize = SCREEN_HEIGHT * 0.5,
}: QuoteCardProps) {
	const colorScheme = useColorScheme()
	const textColor = useThemeColor({}, 'text')
	const background = useThemeColor({}, 'background')
	const borderColor = useThemeColor({}, 'border')
	const primaryColor = useThemeColor({}, 'primary')
	const mutedForegroundColor = useThemeColor({}, 'mutedForeground')
	const router = useRouter()
	const { isQuoteSaved, saveQuote, removeQuote, savedQuotes } = useQuotes()
	const [isSaved, setIsSaved] = React.useState(() => isQuoteSaved(quote.id))
	const isGrid = variant === 'grid'

	// Get the background image once and memoize it
	const backgroundImage = React.useMemo(
		() => quote.backgroundImage || getQuoteImage(quote.source, quote.type),
		[quote.backgroundImage, quote.source, quote.type]
	)

	// Add animated style for vertical list animation
	const animatedStyle = useAnimatedStyle(() => {
		if (!scrollY || typeof index === 'undefined') return {}

		return {
			opacity: interpolate(
				scrollY.value,
				[index - 1, index, index + 1],
				[0.2, 1, 0.2]
			),
			transform: [
				{
					scale: interpolate(
						scrollY.value,
						[index - 1, index, index + 1],
						[0.9, 1, 0.9]
					),
				},
			],
		}
	})

	// Update saved state only when the quote's saved status changes in the context
	React.useEffect(() => {
		const saved = isQuoteSaved(quote.id)
		if (saved !== isSaved) {
			setIsSaved(saved)
		}
	}, [quote.id, savedQuotes])

	const handleSave = React.useCallback(async () => {
		try {
			const newSavedState = !isSaved
			setIsSaved(newSavedState)

			if (newSavedState) {
				await saveQuote({ ...quote, backgroundImage })
			} else {
				await removeQuote(quote.id)
			}
		} catch (error) {
			console.error('[QuoteCard] Error handling save:', error)
			setIsSaved(!isSaved)
		}
	}, [quote, isSaved, saveQuote, removeQuote, backgroundImage])

	const CardWrapper = scrollY ? Animated.View : View

	return (
		<CardWrapper
			className={
				isGrid
					? 'rounded-2xl overflow-hidden shadow-lg'
					: 'rounded-3xl overflow-hidden shadow-lg'
			}
			style={[
				{
					height: isGrid
						? SCREEN_HEIGHT * 0.28
						: itemSize || SCREEN_HEIGHT * 0.5,
					borderColor: borderColor,
					borderWidth: 1,
					padding: _spacing * 2,
				},
				animatedStyle,
				style,
			]}
		>
			<ImageBackground
				source={backgroundImage}
				style={StyleSheet.absoluteFillObject}
				imageStyle={{
					borderRadius: 16,
					resizeMode: 'cover',
				}}
			>
				<View className="flex-1">
					<LinearGradient
						colors={[
							'transparent',
							`hsla(${colorScheme === 'dark' ? '255 0% 0%' : '0 0% 0%'} / ${
								isGrid ? '0.85' : '0.80'
							})`,
						]}
						locations={isGrid ? [0.2, 0.8] : [0, 0.6]}
						style={{
							position: 'absolute',
							left: 0,
							right: 0,
							bottom: 0,
							height: isGrid ? '100%' : '80%',
						}}
					/>
					<View className={`flex-1 ${isGrid ? 'p-3' : 'p-4'} justify-end`}>
						{/* Favorite Button */}
						<TouchableOpacity
							className={`absolute ${
								isGrid ? 'top-2 right-2 w-10 h-10' : 'top-3 right-3 w-14 h-14'
							} z-10 rounded-full items-center justify-center`}
							style={{
								backgroundColor: `hsla(${
									colorScheme === 'dark' ? '210 40% 98%' : '0 0% 100%'
								} / 0.15)`,
							}}
							onPress={handleSave}
						>
							<FontAwesome
								name={isSaved ? 'heart' : 'heart-o'}
								size={isGrid ? 18 : 22}
								color={isSaved ? '#FF3B30' : textColor}
							/>
						</TouchableOpacity>

						{/* Content */}
						<View className={`gap-${isGrid ? '2' : '3'}`}>
							<View>
								<ThemedText
									type="subtitle"
									className={`leading-${isGrid ? '5' : '6'} mb-1`}
									numberOfLines={isGrid ? 4 : 6}
									style={isGrid ? { fontSize: 14 } : undefined}
								>
									{quote.text}
								</ThemedText>

								<View
									className={`flex-row items-start w-full px-2 gap-${
										isGrid ? '1' : '2'
									} ${isGrid ? 'flex-wrap' : ''}`}
								>
									<View className="mt-2">
										<MaterialCommunityIcons
											name="comment-quote"
											size={isGrid ? 14 : 16}
											color={textColor}
										/>
									</View>
									<ThemedText
										type="mutedForeground"
										numberOfLines={isGrid ? 1 : undefined}
										style={isGrid ? { fontSize: 12 } : undefined}
									>
										{quote.author} • {quote.source ?? 'Unknown'}
									</ThemedText>
								</View>
							</View>

							{/* See More Button */}
							<Link
								href={{
									pathname: '/quote/[id]',
									params: {
										id: quote.id,
										quote: JSON.stringify({ ...quote, backgroundImage }),
									},
								}}
								asChild
							>
								<TouchableOpacity>
									<BlurView
										intensity={80}
										tint={colorScheme === 'dark' ? 'dark' : 'light'}
										className={`flex-row items-center justify-between ${
											isGrid ? 'mx-2 my-1' : 'mx-4 my-2'
										} p-1 rounded-full overflow-hidden`}
										style={{
											backgroundColor: `hsla(${
												colorScheme === 'dark'
													? '217.2 32.6% 17.5%'
													: '210 40% 96.1%'
											} / 0.5)`,
										}}
									>
										<ThemedText
											type="default"
											className={`flex-1 text-center ${
												isGrid ? 'ml-8' : 'ml-10'
											}`}
											style={isGrid ? { fontSize: 13 } : { fontSize: 16 }}
										>
											See more
										</ThemedText>
										<View
											className={`flex ${
												isGrid ? 'w-8 h-8' : 'w-14 h-14'
											} rounded-full items-center justify-center`}
											style={{
												backgroundColor: `hsla(${
													colorScheme === 'dark' ? '0 0% 0%' : '0 0% 0%'
												} / 0.5)`,
											}}
										>
											<Feather
												name="chevron-right"
												size={isGrid ? 20 : 32}
												color={Colors[colorScheme ?? 'light'].mutedForeground}
												className={isGrid ? undefined : 'ml-1'}
											/>
										</View>
									</BlurView>
								</TouchableOpacity>
							</Link>
						</View>
					</View>
				</View>
			</ImageBackground>
		</CardWrapper>
	)
}
