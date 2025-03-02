import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from '@react-navigation/native'
import 'react-native-reanimated'
import { useEffect } from 'react'
import { Slot, Stack } from 'expo-router'
import { useFonts } from 'expo-font'
import * as SystemUI from 'expo-system-ui'
import { StatusBar } from 'expo-status-bar'
import Toast from 'react-native-toast-message'
import * as NavigationBar from 'expo-navigation-bar'

import '../global.css'
import { SessionProvider } from '../context/AuthProvider'
import * as SplashScreen from 'expo-splash-screen'
import { useColorScheme } from '@/hooks/useColorScheme'
import Splash from '@/components/Splash'
import { toastConfig } from '@/components/ui/CustomToast'

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
	initialRouteName: 'login',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

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
				<Slot />
			</SessionProvider>
			<StatusBar style="auto" />
			<Toast config={toastConfig} />
		</ThemeProvider>
	)
}
