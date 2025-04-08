/** @type {import('tailwindcss').Config} */
module.exports = {
	// NOTE: Update this to include the paths to all of your component files.
	content: [
		'./app/**/*.{js,jsx,ts,tsx}',
		'./app/**/**/*.{js,jsx,ts,tsx}',
		'./app/(auth)/*.{js,jsx,ts,tsx}',
		'./app/(auth)/**/*.{js,jsx,ts,tsx}',
		'./app/(home)/**/*.{js,jsx,ts,tsx}',
		'./app/(home)/*.{js,jsx,ts,tsx}',
		'./components/**/*.{js,jsx,ts,tsx}',
		'./components/ui/*.{js,jsx,ts,tsx}',
	],
	presets: [require('nativewind/preset')],
	theme: {
		extend: {},
	},
	plugins: [],
	corePlugin: {
		backgroundOpacity: true,
	},
}
