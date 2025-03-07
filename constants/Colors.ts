/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * Colors are in HSL format for better color manipulation and consistency.
 */

const tintColorLight = 'hsl(221.2 83.2% 53.3%)'
const tintColorDark = 'hsl(210 40% 98%)'

export const Colors = {
	light: {
		background: 'hsl(0 0% 100%)',
		foreground: 'hsl(224 71.4% 4.1%)',
		card: 'hsl(0 0% 100%)',
		cardForeground: 'hsl(224 71.4% 4.1%)',
		popover: 'hsl(0 0% 100%)',
		popoverForeground: 'hsl(224 71.4% 4.1%)',
		primary: 'hsl(262.1 83.3% 57.8%)',
		primaryForeground: 'hsl(210 20% 98%)',
		secondary: 'hsl(220 14.3% 95.9%)',
		secondaryForeground: 'hsl(220.9 39.3% 11%)',
		muted: 'hsl(220 14.3% 95.9%)',
		mutedForeground: 'hsl(220 8.9% 46.1%)',
		accent: 'hsl(220 14.3% 95.9%)',
		accentForeground: 'hsl(220.9 39.3% 11%)',
		destructive: 'hsl(0 84.2% 60.2%)',
		destructiveForeground: 'hsl(210 20% 98%)',
		border: 'hsl(220 13% 91%)',
		input: 'hsl(220 13% 91%)',
		ring: 'hsl(262.1 83.3% 57.8%)',
		text: 'hsl(224 71.4% 4.1%)',
		// Chart colors
		chart1: 'hsl(12 76% 61%)',
		chart2: 'hsl(173 58% 39%)',
		chart3: 'hsl(197 37% 24%)',
		chart4: 'hsl(43 74% 66%)',
		chart5: 'hsl(27 87% 67%)',
		tint: tintColorLight,
		icon: 'hsl(215.4 16.3% 46.9%)',
		tabIconDefault: 'hsl(215.4 16.3% 46.9%)',
		tabIconSelected: tintColorLight,
	},
	dark: {
		background: 'hsl(224 71.4% 4.1%)',
		foreground: 'hsl(210 20% 98%)',
		card: 'hsl(224 71.4% 4.1%)',
		cardForeground: 'hsl(210 20% 98%)',
		popover: 'hsl(224 71.4% 4.1%)',
		popoverForeground: 'hsl(210 20% 98%)',
		primary: 'hsl(263.4 70% 50.4%)',
		primaryForeground: 'hsl(210 20% 98%)',
		secondary: 'hsl(215 27.9% 16.9%)',
		secondaryForeground: 'hsl(210 20% 98%)',
		muted: 'hsl(215 27.9% 16.9%)',
		mutedForeground: 'hsl(217.9 10.6% 64.9%)',
		accent: 'hsl(215 27.9% 16.9%)',
		accentForeground: 'hsl(210 20% 98%)',
		destructive: 'hsl(0 62.8% 30.6%)',
		destructiveForeground: 'hsl(210 20% 98%)',
		border: 'hsl(215 27.9% 16.9%)',
		input: 'hsl(215 27.9% 16.9%)',
		ring: 'hsl(263.4 70% 50.4%)',
		text: 'hsl(210 20% 98%)',
		// Chart colors
		chart1: 'hsl(220 70% 50%)',
		chart2: 'hsl(160 60% 45%)',
		chart3: 'hsl(30 80% 55%)',
		chart4: 'hsl(280 65% 60%)',
		chart5: 'hsl(340 75% 55%)',
		tint: tintColorDark,
		icon: 'hsl(215 20.2% 65.1%)',
		tabIconDefault: 'hsl(215 20.2% 65.1%)',
		tabIconSelected: tintColorDark,
	},
}
