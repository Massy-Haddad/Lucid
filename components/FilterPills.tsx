import React from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
import { ThemedText } from './ThemedText'
import { QuoteType } from '@/types/quote'
import { useThemeColor } from '@/hooks/useThemeColor'

export interface FilterOption {
	label: string
	value: QuoteType | 'all'
}

interface FilterPillsProps {
	options: FilterOption[]
	activeFilter: QuoteType | 'all'
	onFilterChange: (value: QuoteType | 'all') => void
}

export function FilterPills({
	options,
	activeFilter,
	onFilterChange,
}: FilterPillsProps) {
	const primaryColor = useThemeColor({}, 'primary')
	const primaryForegroundColor = useThemeColor({}, 'primaryForeground')
	const mutedColor = useThemeColor({}, 'muted')
	const mutedForegroundColor = useThemeColor({}, 'mutedForeground')

	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			className="px-4"
			contentContainerStyle={{ gap: 8 }}
		>
			{options.map((option) => (
				<TouchableOpacity
					key={option.value}
					onPress={() => onFilterChange(option.value)}
					className={`px-4 py-2 rounded-full ${
						activeFilter === option.value
							? 'bg-primary shadow-sm'
							: 'bg-muted/10 dark:bg-muted/20'
					}`}
					style={{
						backgroundColor:
							activeFilter === option.value
								? primaryColor
								: mutedColor + (activeFilter === option.value ? '' : '20'),
					}}
				>
					<ThemedText
						type="default"
						className={`text-sm font-medium ${
							activeFilter === option.value
								? 'text-primary-foreground'
								: 'text-muted-foreground'
						}`}
						style={{
							color:
								activeFilter === option.value
									? primaryForegroundColor
									: mutedForegroundColor,
						}}
					>
						{option.label}
					</ThemedText>
				</TouchableOpacity>
			))}
		</ScrollView>
	)
}
