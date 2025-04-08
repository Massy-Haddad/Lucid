import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Feather, FontAwesome } from '@expo/vector-icons'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { useSession } from '@/context/AuthProvider'
import { useThemeColor } from '@/hooks/useThemeColor'

type MenuItem = {
	icon: keyof typeof Feather.glyphMap
	title: string
	onPress: () => void
	isDestructive?: boolean
}

export default function AccountScreen() {
	const { session, signOut } = useSession()
	const iconColor = useThemeColor({}, 'text')
	const mutedColor = useThemeColor({}, 'mutedForeground')
	const borderColor = useThemeColor({}, 'border')
	const backgroundColor = useThemeColor({}, 'background')

	const menuItems: MenuItem[] = [
		{
			icon: 'user',
			title: 'Profile details',
			onPress: () => {},
		},
		{
			icon: 'lock',
			title: 'Password',
			onPress: () => {},
		},
		{
			icon: 'bell',
			title: 'Notifications',
			onPress: () => {},
		},
	]

	const bottomMenuItems: MenuItem[] = [
		{
			icon: 'info',
			title: 'About application',
			onPress: () => {},
		},
		{
			icon: 'help-circle',
			title: 'Help/FAQ',
			onPress: () => {},
		},
		{
			icon: 'log-out',
			title: 'Sign out',
			onPress: () => {
				signOut()
			},
			isDestructive: true,
		},
	]

	return (
		<ThemedView style={styles.container}>
			<TouchableOpacity style={styles.profileCard}>
				<FontAwesome name="user" size={48} color={iconColor} />
				<View style={styles.profileInfo}>
					<ThemedText type="defaultSemiBold" style={styles.profileName}>
						{session?.email?.split('@')[0] || 'User'}
					</ThemedText>
					<ThemedText style={styles.profileRole}>
						{session?.email || 'user@email.com'}
					</ThemedText>
				</View>
				<Feather name="chevron-right" size={24} color={iconColor} />
			</TouchableOpacity>

			<View style={styles.section}>
				<ThemedText style={styles.sectionTitle}>Other settings</ThemedText>
				<View style={[styles.menuContainer, { borderColor }]}>
					{menuItems.map((item, index) => (
						<TouchableOpacity
							key={item.title}
							style={[
								styles.menuItem,
								index !== menuItems.length - 1 && {
									borderBottomWidth: StyleSheet.hairlineWidth,
									borderBottomColor: borderColor,
								},
							]}
							onPress={item.onPress}
						>
							<View style={styles.menuItemLeft}>
								<Feather name={item.icon} size={20} color={iconColor} />
								<ThemedText style={styles.menuItemText}>
									{item.title}
								</ThemedText>
							</View>
							<Feather name="chevron-right" size={20} color={iconColor} />
						</TouchableOpacity>
					))}
				</View>
			</View>

			<View style={[styles.menuContainer, { borderColor }]}>
				{bottomMenuItems.map((item, index) => (
					<TouchableOpacity
						key={item.title}
						style={[
							styles.menuItem,
							index !== bottomMenuItems.length - 1 && {
								borderBottomWidth: StyleSheet.hairlineWidth,
								borderBottomColor: borderColor,
							},
						]}
						onPress={item.onPress}
					>
						<View style={styles.menuItemLeft}>
							<Feather
								name={item.icon}
								size={20}
								color={item.isDestructive ? '#FF3B30' : iconColor}
							/>
							<ThemedText
								style={[
									styles.menuItemText,
									item.isDestructive && { color: '#FF3B30' },
								]}
							>
								{item.title}
							</ThemedText>
						</View>
						<Feather
							name="chevron-right"
							size={20}
							color={item.isDestructive ? '#FF3B30' : iconColor}
						/>
					</TouchableOpacity>
				))}
			</View>
		</ThemedView>
	)
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 16,
	},
	profileCard: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 16,
		backgroundColor: 'rgba(120, 120, 128, 0.08)',
		borderRadius: 16,
		marginBottom: 24,
		borderWidth: 1,
		borderColor: 'rgba(120, 120, 128, 0.08)',
		gap: 16,
	},
	profileInfo: {
		flex: 1,
		marginLeft: 12,
	},
	profileName: {
		fontSize: 16,
		marginBottom: 4,
	},
	profileRole: {
		fontSize: 14,
		opacity: 0.6,
	},
	section: {
		marginBottom: 24,
	},
	sectionTitle: {
		fontSize: 16,
		marginBottom: 16,
		opacity: 0.6,
	},
	menuContainer: {
		borderRadius: 16,
		backgroundColor: 'rgba(120, 120, 128, 0.08)',
		borderWidth: 1,
		overflow: 'hidden',
	},
	menuItem: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: 16,
		paddingHorizontal: 16,
	},
	menuItemLeft: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
	},
	menuItemText: {
		fontSize: 16,
	},
	switch: {
		width: 51,
		height: 31,
		borderRadius: 15.5,
		padding: 2,
	},
	switchKnob: {
		width: 27,
		height: 27,
		borderRadius: 13.5,
		backgroundColor: '#FFFFFF',
	},
})
