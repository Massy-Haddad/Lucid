import {
	CameraMode,
	CameraType,
	CameraView,
	useCameraPermissions,
} from 'expo-camera'
import { useEffect, useRef, useState } from 'react'
import {
	Button,
	Pressable,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	ActivityIndicator,
} from 'react-native'
import { Image } from 'expo-image'
import { AntDesign } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'
import { FontAwesome6 } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import { router } from 'expo-router'

import TextRecognition from '@react-native-ml-kit/text-recognition'
import { useQuotes } from '@/context/QuotesContext'
import { Quote, QuoteType } from '@/types/quote'
import { ThemedText } from '@/components/ThemedText'
import { ThemedTextInput } from '@/components/ThemedTextInput'
import { useColorScheme } from '@/hooks/useColorScheme.web'
import { useThemeColor } from '@/hooks/useThemeColor'
import { ThemedView } from './ThemedView'

export default function AddQuoteForm() {
	const [permission, requestPermission] = useCameraPermissions()
	const ref = useRef<CameraView>(null)
	const [uri, setUri] = useState<string | null>(null)
	const [mode, setMode] = useState<CameraMode>('picture')
	const [facing, setFacing] = useState<CameraType>('back')
	const [recording, setRecording] = useState(false)
	const [text, setText] = useState('')
	const [isFormVisible, setIsFormVisible] = useState(false)
	const [isSaving, setIsSaving] = useState(false)
	const [quoteData, setQuoteData] = useState<Partial<Quote>>({
		text: '',
		author: '',
		source: '',
		type: 'movie',
		tags: [],
	})
	const { saveQuote } = useQuotes()
	const colorScheme = useColorScheme()
	const primaryForegroundColor = useThemeColor({}, 'accent')

	useEffect(() => {
		if (uri) {
			handleTextRecognition(uri)
		}
	}, [uri])

	const handleTextRecognition = async (imagePath: string) => {
		const result = await TextRecognition.recognize(imagePath)
		setText(result.text)
		setQuoteData((prev) => ({ ...prev, text: result.text }))
	}

	const handleSaveQuote = async () => {
		try {
			setIsSaving(true)
			const newQuote: Quote = {
				id: Date.now().toString(), // Simple ID generation
				text: quoteData.text || '',
				author: quoteData.author || '',
				source: quoteData.source || '',
				type: quoteData.type || 'movie',
				tags: quoteData.tags || [],
			}
			await saveQuote(newQuote)
			router.back()
		} catch (error) {
			console.error('Error saving quote:', error)
		} finally {
			setIsSaving(false)
		}
	}

	if (!permission) {
		return null
	}

	if (!permission.granted) {
		return (
			<ThemedView className="flex-1 w-full px-6 justify-center items-center gap-4 mb-16">
				<Feather
					name="camera"
					size={64}
					color={colorScheme === 'dark' ? 'white' : 'black'}
				/>
				<ThemedText type="subtitle" className="text-center">
					Camera Access Required
				</ThemedText>
				<ThemedText type="muted" className="text-center text-gray-500">
					We need your permission to use the camera to capture quotes from
					images
				</ThemedText>
				<TouchableOpacity
					onPress={requestPermission}
					style={{ backgroundColor: primaryForegroundColor }}
					className="px-8 py-4 rounded-xl"
				>
					<ThemedText type="default">Grant Permission</ThemedText>
				</TouchableOpacity>
			</ThemedView>
		)
	}

	const takePicture = async () => {
		const photo = await ref.current?.takePictureAsync()
		setUri(photo?.uri ?? null)
	}

	const recordVideo = async () => {
		if (recording) {
			setRecording(false)
			ref.current?.stopRecording()
			return
		}
		setRecording(true)
		const video = await ref.current?.recordAsync()
		console.log({ video })
	}

	const toggleMode = () => {
		setMode((prev) => (prev === 'picture' ? 'video' : 'picture'))
	}

	const toggleFacing = () => {
		setFacing((prev) => (prev === 'back' ? 'front' : 'back'))
	}

	const renderForm = () => {
		return (
			<ThemedView className="flex-1 w-full">
				<View className="flex-1 relative">
					<Image
						source={{ uri }}
						contentFit="cover"
						style={{ width: '100%', height: '100%' }}
					/>
					<BlurView
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							backgroundColor:
								colorScheme === 'dark'
									? 'rgba(0,0,0,0.85)'
									: 'rgba(255,255,255,0.85)',
						}}
						tint={colorScheme === 'dark' ? 'dark' : 'light'}
						intensity={20}
					>
						<View className="flex-1 px-3 py-12">
							<View className="flex-1 w-full justify-start">
								<View>
									<ThemedText type="subtitle" className="text-center mb-8">
										Complete Quote Information
									</ThemedText>

									<ThemedTextInput
										icon="type"
										placeholder="Quote Text"
										value={quoteData.text}
										onChangeText={(text) =>
											setQuoteData((prev) => ({ ...prev, text }))
										}
										multiline
										numberOfLines={4}
									/>

									<ThemedTextInput
										icon="user"
										placeholder="Author"
										value={quoteData.author}
										onChangeText={(author) =>
											setQuoteData((prev) => ({ ...prev, author }))
										}
									/>

									<ThemedTextInput
										icon="book"
										placeholder="Source"
										value={quoteData.source}
										onChangeText={(source) =>
											setQuoteData((prev) => ({ ...prev, source }))
										}
									/>

									<View className="flex-row justify-between w-full mb-4 gap-2">
										<TouchableOpacity
											className={`flex-1 p-2.5 rounded-xl flex-row items-center justify-center ${
												quoteData.type === 'movie'
													? 'bg-blue-500'
													: 'bg-white/20'
											}`}
											onPress={() =>
												setQuoteData((prev) => ({ ...prev, type: 'movie' }))
											}
										>
											<ThemedText className="text-white text-xs font-medium">
												Movie
											</ThemedText>
										</TouchableOpacity>
										<TouchableOpacity
											className={`flex-1 p-2.5 rounded-xl flex-row items-center justify-center ${
												quoteData.type === 'anime'
													? 'bg-blue-500'
													: 'bg-white/20'
											}`}
											onPress={() =>
												setQuoteData((prev) => ({ ...prev, type: 'anime' }))
											}
										>
											<ThemedText className="text-white text-xs font-medium">
												Anime
											</ThemedText>
										</TouchableOpacity>
										<TouchableOpacity
											className={`flex-1 p-2.5 rounded-xl flex-row items-center justify-center ${
												quoteData.type === 'philosophy'
													? 'bg-blue-500'
													: 'bg-white/20'
											}`}
											onPress={() =>
												setQuoteData((prev) => ({
													...prev,
													type: 'philosophy',
												}))
											}
										>
											<ThemedText className="text-white text-xs font-medium">
												Philosophy
											</ThemedText>
										</TouchableOpacity>
									</View>
								</View>

								<View className="space-y-4">
									<TouchableOpacity
										onPress={handleSaveQuote}
										className="bg-blue-500 p-4 rounded-xl w-full flex-row justify-center items-center"
									>
										{isSaving ? (
											<ActivityIndicator size="small" color="white" />
										) : (
											<ThemedText
												type="subtitle"
												className="text-white font-semibold"
											>
												SAVE QUOTE
											</ThemedText>
										)}
									</TouchableOpacity>

									<View className="flex-row items-center w-full my-4">
										<View className="flex-1 h-px bg-gray-500" />
										<ThemedText className="text-gray-300 text-sm mx-4">
											Or
										</ThemedText>
										<View className="flex-1 h-px bg-gray-500" />
									</View>

									<View className="flex-row justify-between w-full">
										<TouchableOpacity
											onPress={() => setUri(null)}
											className="bg-white/20 p-4 rounded-xl flex-row items-center justify-center w-1/2 mr-2"
										>
											<Feather
												name="camera"
												size={20}
												color="white"
												className="mr-2"
											/>
											<ThemedText className="text-white font-semibold">
												TAKE ANOTHER
											</ThemedText>
										</TouchableOpacity>
										<TouchableOpacity
											onPress={() => router.back()}
											className="bg-white/20 p-4 rounded-xl flex-row items-center justify-center w-1/2 ml-2"
										>
											<Feather
												name="x"
												size={20}
												color="white"
												className="mr-2"
											/>
											<ThemedText className="text-white font-semibold">
												CANCEL
											</ThemedText>
										</TouchableOpacity>
									</View>
								</View>
							</View>
						</View>
					</BlurView>
				</View>
			</ThemedView>
		)
	}

	const renderCamera = () => {
		return (
			<ThemedView className="flex-1 w-full items-center justify-start p-6 pt-12">
				<View className="w-full aspect-square rounded-3xl overflow-hidden">
					<CameraView
						style={styles.camera}
						ref={ref}
						mode={mode}
						facing={facing}
						mute={false}
						responsiveOrientationWhenOrientationLocked
					>
						<View style={styles.shutterContainer}>
							<Pressable onPress={toggleMode}>
								{mode === 'picture' ? (
									<AntDesign name="picture" size={32} color="white" />
								) : (
									<Feather name="video" size={32} color="white" />
								)}
							</Pressable>
							<Pressable
								onPress={mode === 'picture' ? takePicture : recordVideo}
							>
								{({ pressed }) => (
									<View
										style={[
											styles.shutterBtn,
											{
												opacity: pressed ? 0.5 : 1,
											},
										]}
									>
										<View
											style={[
												styles.shutterBtnInner,
												{
													backgroundColor: mode === 'picture' ? 'white' : 'red',
												},
											]}
										/>
									</View>
								)}
							</Pressable>
							<Pressable onPress={toggleFacing}>
								<FontAwesome6 name="rotate-left" size={32} color="white" />
							</Pressable>
						</View>
					</CameraView>
				</View>
				<View className="absolute bottom-60 left-0 right-0 px-6">
					<ThemedText type="muted" className="text-center mb-4">
						Position the text within the frame
					</ThemedText>
					<ThemedText type="muted" className="text-center text-sm">
						Tap the shutter button to capture
					</ThemedText>
				</View>
			</ThemedView>
		)
	}

	return (
		<ThemedView className="flex-1 w-full">
			{uri ? renderForm() : renderCamera()}
		</ThemedView>
	)
}

const styles = StyleSheet.create({
	camera: {
		flex: 1,
		width: '100%',
	},
	shutterContainer: {
		position: 'absolute',
		bottom: 20,
		left: 0,
		width: '100%',
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 30,
	},
	shutterBtn: {
		backgroundColor: 'transparent',
		borderWidth: 4,
		borderColor: 'white',
		width: 70,
		height: 70,
		borderRadius: 35,
		alignItems: 'center',
		justifyContent: 'center',
	},
	shutterBtnInner: {
		width: 60,
		height: 60,
		borderRadius: 30,
	},
})
