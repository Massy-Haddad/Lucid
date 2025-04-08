import { View, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import { Feather } from '@expo/vector-icons'
import { useColorScheme } from '@/hooks/useColorScheme'
import { useThemeColor } from '@/hooks/useThemeColor'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import AddQuoteForm from '@/components/add-quote-form'

export default function CreateQuoteScreen() {
	const colorScheme = useColorScheme()
	const mutedColor = useThemeColor({}, 'muted')
	const primaryForegroundColor = useThemeColor({}, 'primaryForeground')
	const insets = useSafeAreaInsets()

	const renderHeader = () => (
		<SafeAreaView
			className="border-b border-neutral-800/10 dark:border-neutral-300/10 mb-4"
			style={{ paddingTop: insets.top }}
		>
			<View className="flex-row items-center">
				<TouchableOpacity
					onPress={() => router.back()}
					className="p-2 rounded-full absolute left-0 z-10"
					style={{ backgroundColor: mutedColor }}
				>
					<Feather name="arrow-left" size={20} color={primaryForegroundColor} />
				</TouchableOpacity>
				<View className="flex-1 items-center">
					<ThemedText type="title" className="text-3xl font-bold">
						Create Quote
					</ThemedText>
					<ThemedText type="muted" className="text-base mt-1">
						Capture and save your favorite quotes
					</ThemedText>
				</View>
			</View>
		</SafeAreaView>
	)

	return (
		<ThemedView style={styles.container}>
			{renderHeader()}
			<AddQuoteForm />
		</ThemedView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
})
