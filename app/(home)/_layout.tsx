import { Redirect, Stack, withLayoutContext } from 'expo-router'
import { useSession } from '@/context/AuthProvider'
import { BlurView } from 'expo-blur'
import { View } from 'react-native'
import { useColorScheme } from '@/hooks/useColorScheme'
import { Colors } from '@/constants/Colors'

import {
	createMaterialTopTabNavigator,
	MaterialTopTabNavigationOptions,
	MaterialTopTabNavigationEventMap,
} from '@react-navigation/material-top-tabs'
import { TabNavigationState, ParamListBase } from '@react-navigation/native'

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

	// If user is not authenticated, redirect to auth
	if (!isLoading && !session) {
		return <Redirect href="/auth" />
	}

	return (
		<View className="flex-1">
			<BlurView
				intensity={30}
				tint={colorScheme === 'dark' ? 'dark' : 'light'}
				className="flex-1"
			>
				<Tab
					screenOptions={{
						tabBarStyle: {
							backgroundColor: 'transparent',
							elevation: 0,
							shadowOpacity: 0,
						},
						tabBarIndicatorStyle: {
							backgroundColor: Colors[colorScheme ?? 'light'].tint,
						},
						tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
						tabBarInactiveTintColor:
							Colors[colorScheme ?? 'light'].tabIconDefault,
						tabBarLabelStyle: {
							fontWeight: '600',
							textTransform: 'none',
						},
						swipeEnabled: false,
					}}
				>
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
