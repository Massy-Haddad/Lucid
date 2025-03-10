import { Tabs } from 'expo-router'
import React, { Children } from 'react'
import { Platform, TouchableOpacity, View, Dimensions } from 'react-native'
import { ThemedText } from '@/components/ThemedText'
import { Feather, FontAwesome } from '@expo/vector-icons'
import { useThemeColor } from '@/hooks/useThemeColor'
import { useSession } from '@/context/AuthProvider'
import { BlurView } from 'expo-blur'
import { useColorScheme } from '@/hooks/useColorScheme'

export default function TabLayout() {
	const { session } = useSession()

	const backgroundColor = useThemeColor({}, 'background')
	const cardColor = useThemeColor({}, 'card')
	const borderColor = useThemeColor({}, 'border')
	const cardForegroundColor = useThemeColor({}, 'cardForeground')
	const tabIconColor = useThemeColor({}, 'tabIconDefault')
	const tabIconSelectedColor = useThemeColor({}, 'tabIconSelected')
	const textColor = useThemeColor({}, 'text')

	return (
		<Tabs
			screenOptions={{
				headerStyle: {
					backgroundColor: backgroundColor,
					elevation: 0,
					shadowOpacity: 0,
					borderBottomWidth: 0,
				},
				headerTitleStyle: {
					fontSize: 24,
					fontWeight: '600',
				},
				headerTitleAlign: 'left',
				headerShadowVisible: false,
				headerRight: () => (
					<TouchableOpacity
						style={{
							width: 40,
							height: 40,
							borderRadius: 20,
							backgroundColor: '#000000',
							marginRight: 16,
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Feather name="sliders" size={20} color="#FFFFFF" />
					</TouchableOpacity>
				),
				tabBarStyle: {
					position: 'absolute',
					bottom: 40,
					height: 64,
					alignSelf: 'center',
					justifyContent: 'center',
					marginHorizontal: 120,
					paddingHorizontal: 10,
					paddingVertical: 8,
					paddingBottom: 8,
					borderWidth: 1,
					borderTopWidth: 1,
					borderRadius: 40,
					borderColor: 'rgba(255, 255, 255, 0.25)',
					backgroundColor: backgroundColor,
				},
				tabBarIconStyle: {
					width: '100%',
					height: '100%',
				},
				tabBarShowLabel: false,
				tabBarActiveTintColor: tabIconSelectedColor,
				tabBarInactiveTintColor: tabIconColor,
				tabBarButton: (props) => (
					<TouchableOpacity {...(props as any)} activeOpacity={1} />
				),
			}}
		>
			<Tabs.Screen
				name="(home)"
				options={{
					title: `Hello, ${session?.email?.split('@')[0]}`,
					tabBarIcon: ({ focused }) => (
						<View
							style={{
								padding: 10,
								borderRadius: 30,
								backgroundColor: focused ? tabIconSelectedColor : 'transparent',
							}}
						>
							<Feather
								name="home"
								size={20}
								color={focused ? backgroundColor : cardForegroundColor}
							/>
						</View>
					),
					headerTitle: ({ children }) => (
						<ThemedText type="subtitle">{children}</ThemedText>
					),
				}}
			/>
			<Tabs.Screen
				name="(favorites)"
				options={{
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<View
							style={{
								padding: 10,
								borderRadius: 30,
								backgroundColor: focused ? tabIconSelectedColor : 'transparent',
							}}
						>
							<Feather
								name="grid"
								size={20}
								color={focused ? backgroundColor : cardForegroundColor}
							/>
						</View>
					),
				}}
			/>
			<Tabs.Screen
				name="(account)"
				options={{
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<View
							style={{
								padding: 10,
								borderRadius: 30,
								backgroundColor: focused ? tabIconSelectedColor : 'transparent',
							}}
						>
							<FontAwesome
								name="user-o"
								size={20}
								color={focused ? backgroundColor : cardForegroundColor}
							/>
						</View>
					),
				}}
			/>
		</Tabs>
	)
}
