export interface Quote {
	id: string
	text: string
	author: string
	source: string
	type: 'movie' | 'anime'
	backgroundImage?: any // ImageSourcePropType from react-native
	savedAt?: string
}
