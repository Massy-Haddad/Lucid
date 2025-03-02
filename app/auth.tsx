import { View, Text, Image } from 'react-native'
import { useLocalSearchParams } from 'expo-router'

import LoginForm from '@/components/auth-form'
import { ThemedView } from '@/components/ThemedView'

export default function AuthScreen() {
	const { mode = 'signin' } = useLocalSearchParams<{
		mode: 'signin' | 'signup'
	}>()

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
				{mode === 'signin' ? 'LOGIN TO\nYOUR ACCOUNT' : 'CREATE\nYOUR ACCOUNT'}
			</Text>
			<LoginForm mode={mode} />
		</ThemedView>
	)
}
