import {
	type TextInputProps,
	StyleSheet,
	TextInput,
	View,
	TouchableOpacity,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useState } from 'react'
import { useThemeColor } from '@/hooks/useThemeColor'

export type ThemedTextInputProps = TextInputProps & {
	lightColor?: string
	darkColor?: string
	type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link'
	fontFamily?: 'Satoshi' | 'SpaceMono' | 'ClashGrotesk' | 'Lexend' | 'Against'
	placeholder?: string
	className?: string
	placeholderTextColor?: string
	placeholderClassName?: string
	icon?: keyof typeof Feather.glyphMap
	iconSize?: number
	rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
}

export function ThemedTextInput({
	style,
	lightColor,
	darkColor,
	type = 'default',
	fontFamily = 'Lexend',
	className,
	placeholderTextColor,
	icon,
	iconSize = 20,
	secureTextEntry,
	rounded = 'xl',
	...rest
}: ThemedTextInputProps) {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false)
	const textColor = useThemeColor(
		{ light: lightColor, dark: darkColor },
		'text'
	)
	const placeholderColor =
		placeholderTextColor ||
		useThemeColor({ light: lightColor, dark: darkColor }, 'text')
	const iconColor = useThemeColor(
		{ light: lightColor, dark: darkColor },
		'icon'
	)

	return (
		<View
			className={`mb-4 flex-row items-center bg-white/10 p-4 rounded-${rounded} border border-white/20 w-full ${
				className || ''
			}`}
		>
			{icon && (
				<Feather
					name={icon}
					size={iconSize}
					color={iconColor}
					className="ml-2 mr-4"
				/>
			)}
			<TextInput
				style={[
					{ color: textColor },
					type === 'default' ? styles.default : undefined,
					type === 'title' ? styles.title : undefined,
					type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
					type === 'subtitle' ? styles.subtitle : undefined,
					type === 'link' ? styles.link : undefined,
					style,
					{ fontFamily: fontFamily },
				]}
				className="flex-1"
				placeholderTextColor={placeholderColor}
				secureTextEntry={secureTextEntry && !isPasswordVisible}
				{...rest}
			/>
			{secureTextEntry && (
				<TouchableOpacity
					onPress={() => setIsPasswordVisible(!isPasswordVisible)}
					className="mx-2"
				>
					<Feather
						name={isPasswordVisible ? 'eye' : 'eye-off'}
						size={iconSize}
						color={iconColor}
					/>
				</TouchableOpacity>
			)}
		</View>
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
	},
	title: {
		fontSize: 32,
		lineHeight: 32,
	},
	subtitle: {
		fontSize: 20,
	},
	link: {
		lineHeight: 30,
		fontSize: 16,
		color: '#0a7ea4',
	},
})
