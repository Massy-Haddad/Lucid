import { Redirect, Stack } from 'expo-router'

import { useSession } from '../../context/AuthProvider'

export default function AppLayout() {
	const { session, isLoading } = useSession()

	if (isLoading) {
		return null
	}

	// Only require authentication within the (app) group's layout as users
	// need to be able to access the (auth) group and sign in again.
	if (!session) {
		return <Redirect href="/login" />
	}

	return (
		<Stack>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
		</Stack>
	)
}
