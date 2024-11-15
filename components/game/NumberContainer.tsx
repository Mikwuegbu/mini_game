import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../screens/utils/colors';

const NumberContainer = ({ children }: { children: ReactNode }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.numberInput}>{children}</Text>
		</View>
	);
};

export default NumberContainer;

const styles = StyleSheet.create({
	container: {
		borderWidth: 4,
		borderColor: Colors.accent500,
		padding: 24,
		borderRadius: 8,
		margin: 24,
		alignItems: 'center',
		justifyContent: 'center',
	},
	numberInput: {
		color: Colors.accent500,
		fontSize: 36,
		fontWeight: 'bold',
	},
});
