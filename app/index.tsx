import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Redirect, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Image, ScrollView, ActivityIndicator } from 'react-native'

import { useSession } from '@/context/AuthProvider'
import { ThemedText } from '@/components/ThemedText'
import { ImagePreloader } from '@/components/ImagePreloader'

const Welcome = () => {
	const { session, isLoading } = useSession()

	if (!isLoading && session) return <Redirect href="/(tabs)/(home)/movies" />
	//else if (!isLoading && !session) return <Redirect href="/auth?mode=signin" />

	return (
		<>
			<ImagePreloader />
			<SafeAreaView className="bg-primary h-full">
				{isLoading && <ActivityIndicator size="large" color="#0000ff" />}
				<View className="w-full flex justify-center items-center h-full px-4">
					<Image
						source={require('@/assets/images/icons/splash-icon-light.png')}
						className="max-w-[200px] w-full h-[200px]"
						resizeMode="contain"
					/>

					<ThemedText type="subtitle" className="text-center mt-5">
						Welcome to Lucid
					</ThemedText>
					<ThemedText type="muted" className="text-center mt-2">
						Your favorites quotes in one place!
					</ThemedText>

					<View
						className="w-1/2 mt-10 p-4 rounded-lg bg-purple-100/20"
						onTouchEnd={() => router.push('/auth?mode=signin')}
					>
						<ThemedText className="text-center">Get Started</ThemedText>
					</View>
				</View>
				<StatusBar backgroundColor="#161622" style="light" />
			</SafeAreaView>
		</>
	)
}

export default Welcome
