import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from '@react-navigation/native'
import 'react-native-reanimated'
import { useEffect } from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import { useFonts } from 'expo-font'
import { router, Slot, Stack } from 'expo-router'
import * as SystemUI from 'expo-system-ui'
import { StatusBar } from 'expo-status-bar'
import Toast from 'react-native-toast-message'
import * as NavigationBar from 'expo-navigation-bar'

import Splash from '@/components/Splash'
import * as SplashScreen from 'expo-splash-screen'
import { useColorScheme } from '@/hooks/useColorScheme'
import { toastConfig } from '@/components/ui/CustomToast'
import { QuotesProvider } from '@/context/QuotesContext'
import { SessionProvider, useSession } from '../context/AuthProvider'
import { Feather } from '@expo/vector-icons'
import { ThemedText } from '@/components/ThemedText'

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
	initialRouteName: '/auth',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

function HeaderRight() {
	const { signOut } = useSession()

	const handleSignOut = async () => {
		try {
			signOut()
		} catch (error) {
			console.error('Error signing out:', error)
		}
	}

	return (
		<TouchableOpacity onPress={handleSignOut}>
			<Feather name="log-out" size={30} color="white" />
		</TouchableOpacity>
	)
}

export default function RootLayout() {
	const [loaded, error] = useFonts({
		Lexend: require('@/assets/fonts/Lexend-Regular.ttf'),
		Satoshi: require('@/assets/fonts/Satoshi-Variable.ttf'),
		SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
		ClashGrotesk: require('@/assets/fonts/ClashGrotesk-Variable.ttf'),
		Against: require('@/assets/fonts/Against-Regular.ttf'),
	})

	useEffect(() => {
		if (loaded || error) {
			setTimeout(() => {
				SplashScreen.hideAsync()
			}, 1000)
		}
	}, [loaded, error])

	if (!loaded && !error) {
		return <Splash />
	}

	return <RootLayoutNav />
}

function RootLayoutNav() {
	const colorScheme = useColorScheme()

	useEffect(() => {
		const fetchColor = async () => {
			// enables edge-to-edge mode
			await NavigationBar.setPositionAsync('absolute')
			// transparent backgrounds to see through
			await NavigationBar.setBackgroundColorAsync('#ffffff00')

			// set the color of UI background
			if (colorScheme === 'light') {
				await SystemUI.setBackgroundColorAsync('#FFFFFF')
			} else await SystemUI.setBackgroundColorAsync('#000000')
		}
		fetchColor()
	}, [])

	return (
		<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
			<SessionProvider>
				<QuotesProvider>
					<Stack screenOptions={{ headerShadowVisible: false }}>
						<Stack.Screen name="index" options={{ headerShown: false }} />
						<Stack.Screen name="(auth)" options={{ headerShown: false }} />
						<Stack.Screen
							name="(home)"
							options={{
								headerLeft: () => (
									<Image
										source={
											colorScheme === 'dark'
												? require('@/assets/images/icons/splash-icon-light.png')
												: require('@/assets/images/icons/splash-icon-dark.png')
										}
										style={{ width: 60, height: 60, resizeMode: 'contain' }}
									/>
								),
								headerRight: () => <HeaderRight />,
								headerTitle: () => (
									<View className="flex-1 items-center justify-center">
										<ThemedText type="subtitle" className="text-center">
											Home
										</ThemedText>
									</View>
								),
							}}
						/>
						<Stack.Screen name="quote/[id]" options={{ headerShown: false }} />
					</Stack>
				</QuotesProvider>
			</SessionProvider>
			<StatusBar style="auto" />
			<Toast config={toastConfig} />
		</ThemeProvider>
	)
}
