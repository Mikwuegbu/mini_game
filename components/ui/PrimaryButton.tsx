import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../screens/utils/colors';

const PrimaryButton = ({
	children,
	onPress,
}: {
	children: ReactNode;
	onPress?: () => void;
}) => {
	return (
		<View style={styles.buttonOuterContainer}>
			<Pressable
				style={({ pressed }) =>
					pressed
						? [styles.innerButtonContainer, styles.pressed]
						: styles.innerButtonContainer
				}
				onPress={onPress}
				// android_ripple={{ color: Colors.primary600 }}
			>
				<Text style={styles.buttonText}>{children}</Text>
			</Pressable>
		</View>
	);
};

export default PrimaryButton;

const styles = StyleSheet.create({
	buttonOuterContainer: {
		borderRadius: 28,
		margin: 4,
		overflow: 'hidden',
	},
	innerButtonContainer: {
		backgroundColor: Colors.primary500,
		paddingVertical: 8,
		paddingHorizontal: 16,
		elevation: 2,
	},
	buttonText: {
		color: 'white',
		textAlign: 'center',
		padding: 4,
	},
	pressed: {
		opacity: 0.75,
	},
});
