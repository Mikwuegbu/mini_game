import { ReactNode } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Colors } from '../../screens/utils/colors';

const NumberContainer = ({ children }: { children: ReactNode }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.numberInput}>{children}</Text>
		</View>
	);
};

export default NumberContainer;

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
	container: {
		borderWidth: 4,
		borderColor: Colors.accent500,
		padding: deviceWidth < 380 ? 12 : 24,
		borderRadius: deviceWidth < 380 ? 12 : 24,
		margin: 24,
		alignItems: 'center',
		justifyContent: 'center',
		maxWidth: '80%',
		marginHorizontal: 'auto',
	},
	numberInput: {
		color: Colors.accent500,
		fontSize: deviceWidth < 380 ? 28 : 36,
		fontWeight: 'bold',
	},
});
