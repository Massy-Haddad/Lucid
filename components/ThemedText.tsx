import { Text, type TextProps, StyleSheet } from 'react-native'

import { useThemeColor } from '@/hooks/useThemeColor'

export type ThemedTextProps = TextProps & {
	lightColor?: string
	darkColor?: string
	type?:
		| 'default'
		| 'title'
		| 'defaultSemiBold'
		| 'subtitle'
		| 'link'
		| 'muted'
		| 'primary'
		| 'destructive'
		| 'secondary'
		| 'accent'
		| 'ring'
		| 'mutedForeground'
	fontFamily?: 'Satoshi' | 'SpaceMono' | 'ClashGrotesk' | 'Lexend' | 'Against'
}

export function ThemedText({
	style,
	lightColor,
	darkColor,
	type = 'default',
	fontFamily = 'Lexend',
	...rest
}: ThemedTextProps) {
	const color = useThemeColor(
		{ light: lightColor, dark: darkColor },
		type === 'muted'
			? 'mutedForeground'
			: type === 'primary'
			? 'primary'
			: type === 'destructive'
			? 'destructive'
			: type === 'secondary'
			? 'secondary'
			: type === 'accent'
			? 'accent'
			: type === 'ring'
			? 'ring'
			: 'text'
	)

	return (
		<Text
			style={[
				{ color },
				type === 'default' ? styles.default : undefined,
				type === 'title' ? styles.title : undefined,
				type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
				type === 'subtitle' ? styles.subtitle : undefined,
				type === 'link' ? styles.link : undefined,
				type === 'muted' ? styles.muted : undefined,
				type === 'primary' ? styles.primary : undefined,
				type === 'destructive' ? styles.destructive : undefined,
				type === 'secondary' ? styles.secondary : undefined,
				type === 'accent' ? styles.accent : undefined,
				type === 'ring' ? styles.ring : undefined,
				type === 'mutedForeground' ? styles.mutedForeground : undefined,
				style,
				{ fontFamily: fontFamily },
			]}
			{...rest}
		/>
	)
}

const styles = StyleSheet.create({
	default: {
		fontSize: 14,
		lineHeight: 24,
	},
	defaultSemiBold: {
		fontSize: 14,
		lineHeight: 24,
		fontWeight: '600',
	},
	title: {
		fontSize: 32,
		fontWeight: 'bold',
		lineHeight: 32,
	},
	subtitle: {
		fontSize: 20,
		fontWeight: '600',
	},
	link: {
		lineHeight: 30,
		fontSize: 16,
	},
	muted: {
		fontSize: 14,
		lineHeight: 24,
	},
	primary: {
		fontSize: 14,
		lineHeight: 24,
		fontWeight: '600',
	},
	destructive: {
		fontSize: 14,
		lineHeight: 24,
		fontWeight: '600',
	},
	secondary: {
		fontSize: 14,
		lineHeight: 24,
		fontWeight: '600',
	},
	accent: {
		fontSize: 14,
		lineHeight: 24,
		fontWeight: '600',
	},
	ring: {
		fontSize: 14,
		lineHeight: 24,
		fontWeight: '600',
	},
	mutedForeground: {
		fontSize: 14,
		lineHeight: 24,
		fontWeight: '600',
	},
})
