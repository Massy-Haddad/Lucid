import React, { useState } from 'react'
import { Alert } from 'react-native'
import { useStorageState } from '@/hooks/useStorageState'
import '@react-native-firebase/app'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'

const validateCredentials = (
	email: string,
	password: string
): { isValid: boolean; error?: string } => {
	if (!email.trim()) {
		return { isValid: false, error: 'Please enter your email' }
	}
	if (!password.trim()) {
		return { isValid: false, error: 'Please enter your password' }
	}
	// Basic email validation
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	if (!emailRegex.test(email.trim())) {
		return { isValid: false, error: 'Please enter a valid email address' }
	}
	return { isValid: true }
}

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
					const validation = validateCredentials(email, password)
					if (!validation.isValid) {
						Alert.alert('Validation Error', validation.error)
						throw new Error(validation.error)
					}

					try {
						const userCredential: FirebaseAuthTypes.UserCredential =
							await auth().signInWithEmailAndPassword(email.trim(), password)
						updateSession(userCredential.user)
					} catch (error: any) {
						let errorMessage = 'An error occurred during login'

						// Firebase auth errors
						switch (error.code) {
							case 'auth/invalid-email':
								errorMessage = 'Invalid email address'
								break
							case 'auth/user-disabled':
								errorMessage = 'This account has been disabled'
								break
							case 'auth/user-not-found':
								errorMessage = 'No account found with this email'
								break
							case 'auth/wrong-password':
								errorMessage = 'Incorrect password'
								break
							case 'auth/too-many-requests':
								errorMessage =
									'Too many failed attempts. Please try again later'
								break
							case 'auth/network-request-failed':
								errorMessage = 'Network error. Please check your connection'
								break
						}

						Alert.alert('Login Error', errorMessage)
						throw error
					}
				},
				signOut: () => {
					auth()
						.signOut()
						.then(() => {
							console.log('Signed out')
						})
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
