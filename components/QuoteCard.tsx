import React, { useMemo } from 'react'
import {
	View,
	TouchableOpacity,
	ImageBackground,
	Dimensions,
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

import { Quote } from '@/types/quote'
import { Images } from '@/constants/Images'
import { ThemedText } from '@/components/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

interface QuoteCardProps {
	quote: Quote
	onSave: () => void
	isActive?: boolean
}

export function QuoteCard({ quote, onSave, isActive = true }: QuoteCardProps) {
	const colorScheme = useColorScheme()
	const textColor = useThemeColor({}, 'text')
	const background = useThemeColor({}, 'background')
	const borderColor = useThemeColor({}, 'border')
	const primaryColor = useThemeColor({}, 'primary')
	const mutedColor = useThemeColor({}, 'muted')

	const backgroundImage = useMemo(() => {
		const getRandomImage = (images: Record<string, any>) => {
			const keys = Object.keys(images)
			const randomKey = keys[Math.floor(Math.random() * keys.length)]
			return images[randomKey]
		}

		switch (quote.source.toLowerCase()) {
			case 'anime':
				return getRandomImage(Images.quotes.animes)
			case 'movie':
			case 'history':
			default:
				return getRandomImage(Images.quotes.history)
		}
	}, [quote.id])

	return (
		<View
			className="rounded-3xl overflow-hidden shadow-lg"
			style={{
				height: SCREEN_HEIGHT * 0.5,
				borderColor: borderColor,
				borderWidth: 1,
			}}
		>
			<ImageBackground
				source={backgroundImage}
				className="flex-1 w-full h-full"
				imageStyle={{ borderRadius: 24 }}
			>
				{/* Gradient Overlay */}
				<View className="flex-1">
					<LinearGradient
						colors={[
							'transparent',
							`hsla(${
								colorScheme === 'dark' ? '222.2 84% 4.9%' : '0 0% 0%'
							} / 0.85)`,
						]}
						locations={[0, 0.5]}
						style={{
							position: 'absolute',
							left: 0,
							right: 0,
							bottom: 0,
							height: '100%',
						}}
					/>
					<View className="flex-1 p-4 justify-end">
						{/* Favorite Button */}
						<TouchableOpacity
							className="absolute top-3 right-3 z-10 w-14 h-14 rounded-full items-center justify-center"
							style={{
								backgroundColor: `hsla(${
									colorScheme === 'dark' ? '210 40% 98%' : '0 0% 100%'
								} / 0.15)`,
							}}
							onPress={onSave}
						>
							<FontAwesome name="heart-o" size={22} color={textColor} />
						</TouchableOpacity>

						{/* Content */}
						<View className="gap-3">
							<View>
								<ThemedText type="subtitle" className="leading-6 mb-1">
									{quote.text}
								</ThemedText>

								<View className="flex-row items-center gap-2">
									<MaterialCommunityIcons
										name="comment-quote"
										size={16}
										color={textColor}
									/>
									<ThemedText type="default">{quote.author}</ThemedText>
									<ThemedText type="default">• {quote.source}</ThemedText>
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
										intensity={50}
										className="flex-row items-center justify-between mx-4 my-2 p-2 rounded-full overflow-hidden"
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
											className="flex-1 text-center !text-lg ml-10"
										>
											See more
										</ThemedText>
										<View
											className="flex w-14 h-14 rounded-full items-center justify-center"
											style={{
												backgroundColor: `hsla(${
													colorScheme === 'dark' ? '0 0% 0%' : '0 0% 0%'
												} / 0.6)`,
											}}
										>
											<Feather
												name="chevron-right"
												size={32}
												color={textColor}
												className="ml-1"
											/>
										</View>
									</BlurView>
								</TouchableOpacity>
							</Link>
						</View>
					</View>
				</View>
			</ImageBackground>
		</View>
	)
}
