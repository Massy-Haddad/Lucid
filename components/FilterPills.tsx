import React from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
import { ThemedText } from './ThemedText'
import { QuoteType } from '@/types/quote'

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
	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			className="px-4 mb-4"
			contentContainerStyle={{ gap: 8 }}
		>
			{options.map((option) => (
				<TouchableOpacity
					key={option.value}
					onPress={() => onFilterChange(option.value)}
					className={`px-4 py-2 rounded-full ${
						activeFilter === option.value
							? 'bg-primary'
							: 'bg-muted/50 dark:bg-muted/20'
					}`}
				>
					<ThemedText
						type="default"
						className={`text-sm ${
							activeFilter === option.value
								? 'text-primary-foreground'
								: 'text-muted-foreground'
						}`}
					>
						{option.label}
					</ThemedText>
				</TouchableOpacity>
			))}
		</ScrollView>
	)
}
