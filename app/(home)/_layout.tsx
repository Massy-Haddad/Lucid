import { Redirect, Stack, withLayoutContext } from 'expo-router'
import { useSession } from '@/context/AuthProvider'

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

	// If user is not authenticated, redirect to auth
	if (!isLoading && !session) {
		return <Redirect href="/auth" />
	}

	return <Tab></Tab>
}
