import React from 'react'
import { View, ImageBackground, Dimensions, StyleSheet } from 'react-native'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useColorScheme } from '@/hooks/useColorScheme'
import { Quote } from '@/types/quote'
import { ThemedText } from '@/components/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'
import { Images } from '@/constants/Images' // Import the logo image

const { width: SCREEN_WIDTH } = Dimensions.get('window')

interface SharedQuoteCardProps {
	quote: Quote
}

export function SharedQuoteCard({ quote }: SharedQuoteCardProps) {
	const colorScheme = useColorScheme()
	const textColor = useThemeColor({}, 'text')
	const borderColor = useThemeColor({}, 'border')

	return (
		<View
			className="overflow-hidden"
			style={[
				{
					width: SCREEN_WIDTH * 0.8,
					aspectRatio: 1,
					borderRadius: 24,
					borderColor: borderColor,
					borderWidth: 1,
					padding: 16,
				},
			]}
		>
			<ImageBackground
				source={quote.backgroundImage}
				style={StyleSheet.absoluteFillObject}
				blurRadius={10}
				imageStyle={{
					borderRadius: 24,
					resizeMode: 'cover',
				}}
			>
				<LinearGradient
					colors={[
						'transparent',
						`hsla(${colorScheme === 'dark' ? '255 0% 0%' : '0 0% 0%'} / 0.85)`,
					]}
					locations={[0.2, 1]}
					style={{
						position: 'absolute',
						left: 0,
						right: 0,
						bottom: 0,
						height: '100%',
					}}
				/>

				<View className="flex-1 justify-between p-6">
					{/* Quote Content */}
					<View className="flex-1 justify-center items-center">
						<FontAwesome
							name="quote-left"
							size={32}
							color="rgba(255,255,255,0.8)"
							style={{ marginBottom: 16 }}
						/>
						<ThemedText
							type="subtitle"
							className="text-center leading-7 mb-4"
							numberOfLines={5}
							style={{ fontSize: 18 }}
						>
							{quote.text}
						</ThemedText>
					</View>

					{/* Author Info */}
					<View className="border-t border-white/20 pt-4">
						<View className="flex-row items-center justify-between">
							<View className="flex-row items-center gap-2">
								<MaterialCommunityIcons
									name="comment-quote"
									size={20}
									color={textColor}
								/>
								<View>
									<ThemedText type="subtitle" style={{ fontSize: 16 }}>
										{quote.author}
									</ThemedText>
									<ThemedText type="mutedForeground" style={{ fontSize: 14 }}>
										{quote.source ?? 'Unknown'}
									</ThemedText>
								</View>
							</View>
						</View>
						{/* Enhanced "via Lucid" branding */}
						<View
							className="mt-4 flex-row items-center justify-center gap-2"
							style={{
								backgroundColor: 'rgba(255,255,255,0.1)',
								padding: 8,
								borderRadius: 12,
							}}
						>
							{/* <ImageBackground
                                source={Images.logo.dark} // Use the Lucid logo
                                style={{
                                    width: 24,
                                    height: 24,
                                    borderRadius: 12,
                                }}
                                imageStyle={{ resizeMode: 'contain' }}
                            /> */}
							<ThemedText type="muted" style={{ fontSize: 14 }}>
								Powered by
							</ThemedText>
							<ThemedText type="mutedForeground" style={{ fontSize: 14 }}>
								Lucid
							</ThemedText>
						</View>
					</View>
				</View>
			</ImageBackground>
		</View>
	)
}
