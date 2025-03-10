import { Image, StyleSheet } from 'react-native'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { useQuotes } from '@/context/QuotesContext'
import { Feather } from '@expo/vector-icons'

export default function FavoritesScreen() {
	const { savedQuotes } = useQuotes()

	return (
		<ParallaxScrollView
			headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
			headerImage={
				<Image
					source={require('@/assets/images/cards/animes-bg-3.jpg')}
					style={styles.reactLogo}
				/>
			}
		>
			<ThemedView style={styles.titleContainer}>
				<Feather name="archive" size={28} color="white" />
				<ThemedText type="title">Saved Quotes</ThemedText>
			</ThemedView>
			<ThemedView style={styles.stepContainer}>
				<ThemedText type="subtitle">Quotes</ThemedText>
				{savedQuotes.length > 0 ? (
					<ThemedText>
						{savedQuotes.map((quote, index) => (
							<ThemedText key={quote.id}>
								{index + 1}. {quote.text}
								{'\n'}
								{'\n'}
							</ThemedText>
						))}
					</ThemedText>
				) : (
					<ThemedText>No saved quotes</ThemedText>
				)}
			</ThemedView>
		</ParallaxScrollView>
	)
}

const styles = StyleSheet.create({
	titleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		textAlign: 'center',
		gap: 8,
	},
	stepContainer: {
		gap: 8,
		marginBottom: 8,
	},
	reactLogo: {
		height: '100%',
		width: '100%',
		bottom: 0,
		left: 0,
		position: 'absolute',
		resizeMode: 'cover',
	},
})
