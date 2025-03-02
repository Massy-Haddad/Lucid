import { View, Text, Image } from 'react-native'

import '../global.css'
import LoginForm from '@/components/login-form'
import { ThemedView } from '@/components/ThemedView'
import { useColorScheme } from '@/hooks/useColorScheme.web'

export default function LoginScreen() {
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
			<LoginForm />
		</ThemedView>
	)
}
