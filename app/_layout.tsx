import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from '@react-navigation/native'
import 'react-native-reanimated'
import { useEffect } from 'react'
import { Stack } from 'expo-router'
import { useFonts } from 'expo-font'
import * as SystemUI from 'expo-system-ui'
import { StatusBar } from 'expo-status-bar'
import { Feather } from '@expo/vector-icons'
import Toast from 'react-native-toast-message'
import * as SplashScreen from 'expo-splash-screen'
import * as NavigationBar from 'expo-navigation-bar'
import { Image, TouchableOpacity, View, useColorScheme } from 'react-native'
import { BlurView } from 'expo-blur'
import { useThemeColor } from '@/hooks/useThemeColor'

import Splash from '@/components/Splash'
import { ThemedText } from '@/components/ThemedText'
import { useColorScheme as useAppColorScheme } from '@/hooks/useColorScheme'
import { QuotesProvider } from '@/context/QuotesContext'
import { toastConfig } from '@/components/ui/CustomToast'
import { SessionProvider, useSession } from '@/context/AuthProvider'

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
	initialRouteName: '/auth',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

// Add this type near the top of the file
type HeaderStyle = {
	backgroundColor?: string
	borderBottomWidth?: number
	borderBottomColor?: string
	height?: number
}

function HeaderRight() {
	const { signOut } = useSession()
	const textColor = useThemeColor({}, 'text')
	const backgroundColor = useThemeColor({}, 'background')

	const handleSignOut = async () => {
		try {
			signOut()
		} catch (error) {
			console.error('Error signing out:', error)
		}
	}

	return (
		<TouchableOpacity
			onPress={handleSignOut}
			className="w-10 h-10 rounded-full items-center justify-center"
			style={{
				backgroundColor: backgroundColor,
			}}
		>
			<Feather name="log-out" size={20} color={textColor} />
		</TouchableOpacity>
	)
}

function HeaderLeft() {
	const textColor = useThemeColor({}, 'text')
	const backgroundColor = useThemeColor({}, 'background')

	return (
		<TouchableOpacity
			className="w-10 h-10 rounded-full items-center justify-center"
			style={{
				backgroundColor: backgroundColor,
			}}
		>
			<Feather name="user" size={20} color={textColor} />
		</TouchableOpacity>
	)
}

function HeaderTitle() {
	return (
		<View className="flex-1 items-center justify-center">
			<ThemedText type="subtitle" className="text-center text-lg font-semibold">
				Home
			</ThemedText>
		</View>
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
	const colorScheme = useAppColorScheme()
	const backgroundColor = useThemeColor({}, 'background')
	const borderColor = useThemeColor({}, 'border')

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
					<Stack
						screenOptions={{
							headerShadowVisible: false,
							headerStyle: {
								backgroundColor: backgroundColor,
								borderBottomWidth: 1,
								borderBottomColor: borderColor,
							} as HeaderStyle,
						}}
					>
						<Stack.Screen name="index" options={{ headerShown: false }} />
						<Stack.Screen name="(auth)" options={{ headerShown: false }} />
						<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
						<Stack.Screen name="quote/[id]" options={{ headerShown: false }} />
					</Stack>
				</QuotesProvider>
			</SessionProvider>
			<StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
			<Toast config={toastConfig} />
		</ThemeProvider>
	)
}
