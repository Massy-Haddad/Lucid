/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = 'hsl(221.2 83.2% 53.3%)'
const tintColorDark = 'hsl(210 40% 98%)'

export const Colors = {
	light: {
		text: 'hsl(222.2 84% 4.9%)',
		background: 'hsl(0 0% 100%)',
		tint: tintColorLight,
		icon: 'hsl(215.4 16.3% 46.9%)',
		tabIconDefault: 'hsl(215.4 16.3% 46.9%)',
		tabIconSelected: tintColorLight,
		muted: 'hsl(210 40% 96.1%)',
		mutedForeground: 'hsl(215.4 16.3% 46.9%)',
		border: 'hsl(214.3 31.8% 91.4%)',
		input: 'hsl(214.3 31.8% 91.4%)',
		primary: 'hsl(221.2 83.2% 53.3%)',
		secondary: 'hsl(210 40% 96.1%)',
		accent: 'hsl(210 40% 96.1%)',
		destructive: 'hsl(0 84.2% 60.2%)',
		ring: 'hsl(221.2 83.2% 53.3%)',
	},
	dark: {
		text: 'hsl(210 40% 98%)',
		background: 'hsl(222.2 84% 4.9%)',
		tint: tintColorDark,
		icon: 'hsl(215 20.2% 65.1%)',
		tabIconDefault: 'hsl(215 20.2% 65.1%)',
		tabIconSelected: tintColorDark,
		muted: 'hsl(217.2 32.6% 17.5%)',
		mutedForeground: 'hsl(215 20.2% 65.1%)',
		border: 'hsl(217.2 32.6% 17.5%)',
		input: 'hsl(217.2 32.6% 17.5%)',
		primary: 'hsl(217.2 91.2% 59.8%)',
		secondary: 'hsl(217.2 32.6% 17.5%)',
		accent: 'hsl(217.2 32.6% 17.5%)',
		destructive: 'hsl(0 62.8% 30.6%)',
		ring: 'hsl(224.3 76.3% 48%)',
	},
}
