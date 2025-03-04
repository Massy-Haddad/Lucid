import { Redirect, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

import { useSession } from '@/context/AuthProvider'

export default function AuthLayout() {
	const { session, isLoading } = useSession()

	// If user is authenticated, redirect to home
	if (!isLoading && session) {
		return <Redirect href="/(home)" />
	}

	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="auth" />
		</Stack>
	)
}
