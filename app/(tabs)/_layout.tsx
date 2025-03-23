import { Tabs } from 'expo-router'
import { TouchableOpacity, View } from 'react-native'
import { ThemedText } from '@/components/ThemedText'
import { Feather, FontAwesome, Fontisto } from '@expo/vector-icons'
import { useThemeColor } from '@/hooks/useThemeColor'
import { useSession } from '@/context/AuthProvider'
import React from 'react'

export default function TabLayout() {
	const { session } = useSession()

	const textColor = useThemeColor({}, 'text')
	const cardColor = useThemeColor({}, 'card')
	const borderColor = useThemeColor({}, 'border')
	const tabIconColor = useThemeColor({}, 'tabIconDefault')
	const backgroundColor = useThemeColor({}, 'background')
	const cardForegroundColor = useThemeColor({}, 'cardForeground')
	const tabIconSelectedColor = useThemeColor({}, 'tabIconSelected')

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
					bottom: 32,
					height: 88,
					alignSelf: 'center',
					justifyContent: 'center',
					marginHorizontal: 32,
					paddingHorizontal: 0,
					paddingBottom: 2,
					elevation: 0,
					shadowOpacity: 0,
					borderWidth: 1,
					borderTopWidth: 1,
					borderRadius: 50,
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
								padding: 16,
								borderRadius: 30,
								backgroundColor: focused ? tabIconSelectedColor : 'transparent',
							}}
						>
							<Feather
								name="home"
								size={22}
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
				name="(discover)"
				options={{
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<View
							style={{
								padding: 16,
								borderRadius: 30,
								backgroundColor: focused ? tabIconSelectedColor : 'transparent',
							}}
						>
							<Fontisto
								name="nav-icon-grid-a"
								size={22}
								color={focused ? backgroundColor : cardForegroundColor}
							/>
						</View>
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
								padding: 16,
								borderRadius: 30,
								backgroundColor: focused ? tabIconSelectedColor : 'transparent',
							}}
						>
							<Fontisto
								name="heart-alt"
								size={22}
								color={focused ? backgroundColor : cardForegroundColor}
							/>
						</View>
					),
				}}
			/>
			<Tabs.Screen
				name="(account)"
				options={{
					headerShown: true,
					headerTitle: 'Account',
					headerTitleAlign: 'center',
					headerTitleStyle: {
						fontSize: 24,
						fontWeight: '600',
						fontFamily: 'Lexend',
					},
					headerRight: () => <></>,
					tabBarIcon: ({ focused }) => (
						<View
							style={{
								padding: 16,
								borderRadius: 30,
								backgroundColor: focused ? tabIconSelectedColor : 'transparent',
							}}
						>
							<FontAwesome
								name="user-o"
								size={22}
								color={focused ? backgroundColor : cardForegroundColor}
							/>
						</View>
					),
				}}
			/>
		</Tabs>
	)
}
