import React, { useState } from 'react'
import { BlurView } from 'expo-blur'
import Checkbox from 'expo-checkbox'
import { FontAwesome } from '@expo/vector-icons'
import { View, TouchableOpacity, ActivityIndicator } from 'react-native'
import { router } from 'expo-router'

import '../global.css'
import { useSession } from '@/context/AuthProvider'
import { ThemedText } from '@/components/ThemedText'
import { useColorScheme } from '@/hooks/useColorScheme.web'
import { ThemedTextInput } from '@/components/ThemedTextInput'

interface LoginFormProps {
	mode: 'signin' | 'signup'
}

export default function LoginForm({ mode }: LoginFormProps) {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [isChecked, setChecked] = useState(false)
	const { signIn, signUp, isLoading: isSessionLoading } = useSession()

	const handleSubmit = async () => {
		try {
			if (mode === 'signin') {
				await signIn(email, password)
			} else {
				await signUp(email, password)
			}
		} catch (error) {
			console.log(error)
		}
	}

	const colorScheme = useColorScheme()

	return (
		<BlurView
			style={
				colorScheme === 'dark'
					? { backgroundColor: 'rgba(0,0,0,0.90)' }
					: { backgroundColor: 'rgba(255,255,255,0.90)' }
			}
			tint={colorScheme === 'dark' ? 'dark' : 'light'}
			intensity={20}
			className="flex h-3/4 w-full p-6 pt-0 justify-start items-center overflow-hidden border-t-[1px] border-gray-50/15"
		>
			<ThemedText type="default" className="my-12 text-center">
				{mode === 'signin'
					? 'Enter your login information'
					: 'Create your account'}
			</ThemedText>

			<ThemedTextInput
				icon="mail"
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

			{mode === 'signin' && (
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
			)}

			<TouchableOpacity
				onPress={handleSubmit}
				className="bg-blue-500 p-4 rounded-xl w-full flex-row justify-center items-center mb-4"
			>
				{isSessionLoading ? (
					<ActivityIndicator size="small" color="white" />
				) : (
					<ThemedText type="subtitle" className="text-white font-semibold">
						{mode === 'signin' ? 'LOGIN' : 'SIGN UP'}
					</ThemedText>
				)}
			</TouchableOpacity>

			{mode === 'signin' && (
				<>
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
							<ThemedText className="text-white font-semibold">
								GOOGLE
							</ThemedText>
						</TouchableOpacity>
						<TouchableOpacity className="bg-white/20 p-3 rounded-xl flex-row items-center justify-center w-1/2 ml-2">
							<FontAwesome
								name="apple"
								size={24}
								color="white"
								className="mr-4"
							/>
							<ThemedText className="text-white font-semibold">
								APPLE
							</ThemedText>
						</TouchableOpacity>
					</View>
				</>
			)}

			<TouchableOpacity
				onPress={() =>
					router.replace(mode === 'signin' ? '/sign-up' : '/sign-in')
				}
			>
				<ThemedText className="flex-1 justify-center items-center text-gray-300 text-sm text-center mt-8">
					{mode === 'signin'
						? "Don't have an account?"
						: 'Already have an account?'}
					{'  '}
					<ThemedText type="link">
						{mode === 'signin' ? 'Sign Up' : 'Sign In'}
					</ThemedText>
				</ThemedText>
			</TouchableOpacity>
		</BlurView>
	)
}
