import React, { useState } from 'react'
import { useStorageState } from '@/hooks/useStorageState'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'

const AuthContext = React.createContext<{
	signIn: (email: string, password: string) => Promise<void>
	signOut: () => void
	session?: FirebaseAuthTypes.User | null
	isLoading: boolean
}>({
	signIn: async () => {},
	signOut: () => null,
	session: null,
	isLoading: false,
})

// This hook can be used to access the user info.
export function useSession() {
	const value = React.useContext(AuthContext)
	if (process.env.NODE_ENV !== 'production') {
		if (!value) {
			throw new Error('useSession must be wrapped in a <SessionProvider />')
		}
	}

	return value
}

export function SessionProvider(props: React.PropsWithChildren) {
	const [[isLoading, sessionData], setSessionData] = useStorageState('session')
	const [session, setSession] = useState<FirebaseAuthTypes.User | null>(
		sessionData ? JSON.parse(sessionData) : null
	)

	const updateSession = (user: FirebaseAuthTypes.User | null) => {
		setSession(user)
		setSessionData(user ? JSON.stringify(user) : null)
	}

	return (
		<AuthContext.Provider
			value={{
				signIn: async (email: string, password: string) => {
					try {
						const userCredential: FirebaseAuthTypes.UserCredential =
							await auth().signInWithEmailAndPassword(email, password)
						updateSession(userCredential.user)
					} catch (error) {
						console.error(error)
						throw error
					}
				},

				signOut: () => {
					updateSession(null)
				},
				session,
				isLoading,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	)
}
