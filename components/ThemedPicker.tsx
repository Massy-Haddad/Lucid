import React from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import { ThemedText } from './ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'

export type ThemedPickerProps<T extends string> = {
	lightColor?: string
	darkColor?: string
	className?: string
	selectedValue?: T
	onValueChange?: (value: T) => void
	options: Array<{
		label: string
		value: T
	}>
}

export function ThemedPicker<T extends string>({
	lightColor,
	darkColor,
	className,
	selectedValue,
	onValueChange,
	options,
}: ThemedPickerProps<T>) {
	const backgroundColor = useThemeColor({}, 'background')
	const mutedColor = useThemeColor({}, 'muted')
	const tintColor = useThemeColor({}, 'tint')

	return (
		<View className={`flex-row items-center -mx-1 ${className || ''}`}>
			{options.map((option) => (
				<Pressable
					key={option.value}
					onPress={() => onValueChange?.(option.value)}
					className={`flex-1 px-3 py-2 mx-1 rounded-xl ${
						selectedValue === option.value
							? 'bg-white/20'
							: 'border border-white/10'
					}`}
				>
					<ThemedText
						type="default"
						className={`text-sm text-center ${
							selectedValue === option.value
								? 'opacity-100 font-medium'
								: 'opacity-50'
						}`}
					>
						{option.label}
					</ThemedText>
				</Pressable>
			))}
		</View>
	)
}
