import React, { useState } from 'react'
import { router } from 'expo-router'
import { LogBox } from 'react-native'
import Toast from 'react-native-toast-message'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import '@react-native-firebase/app'

import { useStorageState } from '@/hooks/useStorageState'

// Ignore NOBRIDGE warnings
LogBox.ignoreLogs(['(NOBRIDGE)'])

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
	signUp: (email: string, password: string) => Promise<void>
	signOut: () => void
	session?: FirebaseAuthTypes.User | null
	isLoading: boolean
}>({
	signIn: async () => {},
	signUp: async () => {},
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
	const [[, sessionData], setSessionData] = useStorageState('session')
	const [session, setSession] = useState<FirebaseAuthTypes.User | null>(
		sessionData ? JSON.parse(sessionData) : null
	)
	const [isLoading, setIsLoading] = useState(false)

	const updateSession = (user: FirebaseAuthTypes.User | null) => {
		setSession(user)
		setSessionData(user ? JSON.stringify(user) : null)
	}

	const showError = (title: string, message: string) => {
		// Only log in development
		if (__DEV__) {
			// Using console.warn instead of error to avoid NOBRIDGE
			console.warn(`${title}: ${message}`)
		}

		Toast.show({
			type: 'error',
			text1: title,
			text2: message,
			position: 'bottom',
			visibilityTime: 4000,
			autoHide: true,
		})
	}

	return (
		<AuthContext.Provider
			value={{
				signIn: async (email: string, password: string) => {
					const validation = validateCredentials(email, password)
					if (!validation.isValid) {
						showError('Validation Error', validation.error || '')
						throw new Error(validation.error)
					}

					try {
						setIsLoading(true)
						const userCredential: FirebaseAuthTypes.UserCredential =
							await auth().signInWithEmailAndPassword(email.trim(), password)
						updateSession(userCredential.user)
						router.replace('/')
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

						showError('Error', errorMessage)
						throw error
					} finally {
						setIsLoading(false)
					}
				},
				signUp: async (email: string, password: string) => {
					const validation = validateCredentials(email, password)
					if (!validation.isValid) {
						showError('Validation Error', validation.error || '')
						throw new Error(validation.error)
					}

					try {
						setIsLoading(true)
						const userCredential: FirebaseAuthTypes.UserCredential =
							await auth().createUserWithEmailAndPassword(
								email.trim(),
								password
							)
						updateSession(userCredential.user)
						Toast.show({
							type: 'success',
							text1: 'Success',
							text2: 'Account created successfully',
							position: 'bottom',
							visibilityTime: 2000,
							autoHide: true,
						})
						router.replace('/')
					} catch (error: any) {
						let errorMessage = 'An error occurred during signup'

						// Firebase auth errors
						switch (error.code) {
							case 'auth/email-already-in-use':
								errorMessage = 'This email is already registered'
								break
							case 'auth/invalid-email':
								errorMessage = 'Invalid email address'
								break
							case 'auth/operation-not-allowed':
								errorMessage = 'Email/password accounts are not enabled'
								break
							case 'auth/weak-password':
								errorMessage = 'Password is too weak'
								break
						}

						showError('Error', errorMessage)
						throw error
					} finally {
						setIsLoading(false)
					}
				},
				signOut: async () => {
					try {
						setIsLoading(true)
						await auth().signOut()
						updateSession(null)
						Toast.show({
							type: 'success',
							text1: 'Success',
							text2: 'Successfully logged out',
							position: 'bottom',
							visibilityTime: 2000,
							autoHide: true,
						})
						router.replace('/auth?mode=signin')
					} catch (error) {
						showError('Error', 'Failed to sign out')
					} finally {
						setIsLoading(false)
					}
				},
				session,
				isLoading,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	)
}
