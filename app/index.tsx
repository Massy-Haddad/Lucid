import { StatusBar } from 'expo-status-bar'
import { Redirect, router } from 'expo-router'
import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useSession } from '@/context/AuthProvider'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'

const Welcome = () => {
	const { session, isLoading } = useSession()

	if (!isLoading && session) return <Redirect href="/movies" />

	return (
		<SafeAreaView className="bg-primary h-full">
			{isLoading && <ActivityIndicator size="large" color="#0000ff" />}

			<ScrollView
				contentContainerStyle={{
					height: '100%',
				}}
			>
				<View className="w-full flex justify-center items-center h-full px-4">
					<Image
						source={require('@/assets/images/icons/splash-icon-light.png')}
						className="max-w-[380px] w-full h-[298px]"
						resizeMode="contain"
					/>

					<View
						className="w-1/2 mt-7 p-4 rounded-lg bg-purple-100/20"
						onTouchEnd={() => router.push('/auth?mode=signin')}
					>
						<ThemedText className="text-center">Continue with Email</ThemedText>
					</View>
				</View>
			</ScrollView>

			<StatusBar backgroundColor="#161622" style="light" />
		</SafeAreaView>
	)
}

export default Welcome
