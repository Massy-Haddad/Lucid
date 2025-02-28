import { useState } from 'react'
import { router } from 'expo-router'
import { BlurView } from 'expo-blur'
import { Feather, FontAwesome } from '@expo/vector-icons'
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	ImageBackground,
	Image,
} from 'react-native'

import '../global.css'
import { useSession } from './ctx'
import { ThemedText } from '@/components/ThemedText'

export default function LoginScreen() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const { signIn } = useSession()

	const handleLogin = () => {
		signIn()
		router.replace('/')
	}

	return (
		<ImageBackground
			source={require('@/assets/images/bg2.jpg')}
			className="flex-1 justify-end items-center"
		>
			<View className="absolute top-1/4 -left-56 -mt-40">
				<Image
					source={require('@/assets/images/flower.png')}
					className="w-80 h-80 -rotate-[22deg]"
				/>
			</View>
			<View className="absolute top-1/4 -right-56 -mt-40">
				<Image
					source={require('@/assets/images/flower.png')}
					className="w-80 h-80 scale-x-[-1] rotate-[22deg]"
				/>
			</View>
			<Text
				style={{ fontFamily: 'Against' }}
				className="text-white text-3xl text-center my-16"
			>
				LOGIN TO{'\n'}YOUR ACCOUNT
			</Text>
			<BlurView
				style={{ backgroundColor: 'rgba(0,0,0,0.90)', overflow: 'hidden' }}
				tint="dark"
				intensity={20}
				className="flex h-3/4 w-full p-6 pt-0 justify-start items-center border-t-[1px] border-gray-50/15"
			>
				<ThemedText type="default" className="text-gray-300 my-12 text-center">
					Enter your login information
				</ThemedText>

				<View className="mb-4 flex-row items-center bg-white/10 p-2 rounded-xl border border-white/20 w-full">
					<Feather name="mail" size={20} color="white" className="mx-4" />
					<TextInput
						style={{ fontFamily: 'Lexend' }}
						placeholder="Email"
						placeholderTextColor="#ddd"
						className="text-white flex-1 font-light"
						value={email}
						onChangeText={setEmail}
					/>
				</View>

				<View className="mb-4 flex-row items-center bg-white/10 p-2 rounded-xl border border-white/20 w-full">
					<Feather name="lock" size={20} color="white" className="mx-4" />
					<TextInput
						style={{ fontFamily: 'Lexend' }}
						placeholder="Password"
						placeholderTextColor="#ddd"
						secureTextEntry
						className="text-white flex-1 font-light"
						value={password}
						onChangeText={setPassword}
					/>
					<Feather name="eye-off" size={20} color="white" className="mx-2" />
				</View>

				<View className="flex-row justify-between items-center mb-8 w-full">
					<TouchableOpacity>
						<ThemedText className="text-gray-300">Remember me</ThemedText>
					</TouchableOpacity>
					<TouchableOpacity>
						<ThemedText className="text-blue-400">Forgot password</ThemedText>
					</TouchableOpacity>
				</View>

				<TouchableOpacity
					onPress={() => handleLogin()}
					className="bg-blue-500 p-3 rounded-xl w-full flex-row justify-center items-center mb-4"
				>
					<ThemedText type="subtitle" className="text-white font-semibold">
						LOGIN
					</ThemedText>
				</TouchableOpacity>

				<View className="flex-row items-center w-full my-4">
					<View className="flex-1 h-px bg-gray-500" />
					<ThemedText className="text-gray-300 text-sm mx-4">Or</ThemedText>
					<View className="flex-1 h-px bg-gray-500" />
				</View>

				<View className="flex-row justify-between w-full mb-4">
					<TouchableOpacity className="bg-white/20 p-3 rounded-xl flex-row items-center justify-center w-1/2 mr-2">
						<FontAwesome
							name="google"
							size={24}
							color="white"
							className="mr-4"
						/>
						<ThemedText className="text-white font-semibold">GOOGLE</ThemedText>
					</TouchableOpacity>
					<TouchableOpacity className="bg-white/20 p-3 rounded-xl flex-row items-center justify-center w-1/2 ml-2">
						<FontAwesome
							name="apple"
							size={24}
							color="white"
							className="mr-4"
						/>
						<ThemedText className="text-white font-semibold">APPLE</ThemedText>
					</TouchableOpacity>
				</View>

				<ThemedText className="text-gray-300 text-sm text-center mt-8">
					Don't have an account?{' '}
					<ThemedText className="text-blue-400">Sign Up</ThemedText>
				</ThemedText>
			</BlurView>
		</ImageBackground>
	)
}
