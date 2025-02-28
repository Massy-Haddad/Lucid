import { useState } from 'react'
import { router } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { BlurView } from 'expo-blur'
import Checkbox from 'expo-checkbox'

import '../global.css'
import { useSession } from '@/context/AuthProvider'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { useColorScheme } from '@/hooks/useColorScheme.web'
import { ThemedTextInput } from '@/components/ThemedTextInput'

export default function LoginScreen() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [isChecked, setChecked] = useState(false)

	const { signIn } = useSession()

	const handleLogin = () => {
		signIn()
		router.replace('/')
	}

	const colorScheme = useColorScheme()

	return (
		<ThemedView className="flex-1 justify-end items-center">
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
				style={
					colorScheme === 'dark'
						? { backgroundColor: 'rgba(0,0,0,0.90)', overflow: 'hidden' }
						: { backgroundColor: 'rgba(255,255,255,0.90)', overflow: 'hidden' }
				}
				tint={colorScheme === 'dark' ? 'dark' : 'light'}
				intensity={20}
				className="flex h-3/4 w-full p-6 pt-0 justify-start items-center border-t-[1px] border-gray-50/15"
			>
				<ThemedText type="default" className="my-12 text-center">
					Enter your login information
				</ThemedText>

				<ThemedTextInput
					icon="user"
					placeholder="Email"
					value={email}
					onChangeText={setEmail}
				/>

				<ThemedTextInput
					icon="lock"
					placeholder="Password"
					secureTextEntry
					value={password}
					onChangeText={setPassword}
				/>

				<View className="flex-row justify-between items-center mb-8 w-full">
					<View className="flex-row justify-between items-center gap-2">
						<Checkbox
							value={isChecked}
							onValueChange={setChecked}
							style={{ width: 16, height: 16 }}
							color={colorScheme === 'dark' ? 'white' : 'black'}
						/>
						<ThemedText className="text-gray-300">Remember me</ThemedText>
					</View>
					<TouchableOpacity>
						<ThemedText className="text-blue-400">Forgot password</ThemedText>
					</TouchableOpacity>
				</View>

				<TouchableOpacity
					onPress={() => handleLogin()}
					className="bg-blue-500 p-4 rounded-xl w-full flex-row justify-center items-center mb-4"
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
					<TouchableOpacity className="bg-white/20 p-4 rounded-xl flex-row items-center justify-center w-1/2 mr-2">
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

				<TouchableOpacity onPress={() => router.push('/')}>
					<ThemedText className="flex-1 justify-center items-center text-gray-300 text-sm text-center mt-8">
						Don't have an account?{'  '}
						<ThemedText type="link">Sign Up</ThemedText>
					</ThemedText>
				</TouchableOpacity>
			</BlurView>
		</ThemedView>
	)
}
