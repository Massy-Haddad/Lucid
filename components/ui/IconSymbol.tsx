// This file is a fallback for using MaterialIcons on Android and web.

import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'

type IconName = keyof typeof MaterialCommunityIcons.glyphMap

interface IconSymbolProps {
	name: string
	size: number
	color: string
}

const iconMap: { [key: string]: IconName } = {
	'house.fill': 'home',
	'paperplane.fill': 'send',
	'heart.fill': 'heart',
	heart: 'heart-outline',
	'arrow.up.right.square.fill': 'arrow-top-right',
	'chevron.left': 'chevron-left',
}

export function IconSymbol({ name, size, color }: IconSymbolProps) {
	const mappedName = iconMap[name] || 'help-circle'
	return <MaterialCommunityIcons name={mappedName} size={size} color={color} />
}
