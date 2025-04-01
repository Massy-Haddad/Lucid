import { Redirect, Stack, withLayoutContext } from 'expo-router'
import { useSession } from '@/context/AuthProvider'
import { BlurView } from 'expo-blur'
import { View } from 'react-native'
import { useColorScheme } from '@/hooks/useColorScheme'
import { useThemeColor } from '@/hooks/useThemeColor'

import {
	createMaterialTopTabNavigator,
	MaterialTopTabNavigationOptions,
	MaterialTopTabNavigationEventMap,
} from '@react-navigation/material-top-tabs'
import { TabNavigationState, ParamListBase } from '@react-navigation/native'
import { useState } from 'react'
import { ThemedTextInput } from '@/components/ThemedTextInput'

const { Navigator } = createMaterialTopTabNavigator()
export const Tab = withLayoutContext<
	MaterialTopTabNavigationOptions,
	typeof Navigator,
	TabNavigationState<ParamListBase>,
	MaterialTopTabNavigationEventMap
>(Navigator)

export default function HomeLayout() {
	const { session, isLoading } = useSession()
	const colorScheme = useColorScheme()

	// Get theme colors
	const tintColor = useThemeColor({}, 'tint')
	const tabIconDefault = useThemeColor({}, 'tabIconDefault')
	const background = useThemeColor({}, 'background')
	const border = useThemeColor({}, 'border')

	// If user is not authenticated, redirect to auth
	if (!isLoading && !session) {
		return <Redirect href="/auth" />
	}

	const [search, setSearch] = useState('')

	return (
		<View className="flex-1" style={{ backgroundColor: background }}>
			<BlurView
				intensity={30}
				tint={colorScheme === 'dark' ? 'dark' : 'light'}
				className="flex-1"
			>
				<View className="px-5">
					{/* <ThemedTextInput
						icon="search"
						placeholder="Search"
						value={search}
						onChangeText={setSearch}
						rounded="full"
					/> */}
				</View>
				<Tab
					screenOptions={{
						tabBarStyle: {
							backgroundColor: 'transparent',
							elevation: 0,
							shadowOpacity: 0,
							borderBottomWidth: 1,
							borderBottomColor: border,
						},
						tabBarIndicatorStyle: {
							backgroundColor: tintColor,
							height: 3,
						},
						tabBarActiveTintColor: tintColor,
						tabBarInactiveTintColor: tabIconDefault,
						tabBarLabelStyle: {
							fontWeight: '600',
							textTransform: 'none',
						},
						swipeEnabled: true,
					}}
				>
					<Tab.Screen
						name="philosophy"
						options={{
							title: 'Philosophy',
						}}
					/>
					<Tab.Screen
						name="movies"
						options={{
							title: 'Movies',
						}}
					/>
					<Tab.Screen
						name="animes"
						options={{
							title: 'Animes',
						}}
					/>
				</Tab>
			</BlurView>
		</View>
	)
}
