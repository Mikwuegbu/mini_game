import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../screens/utils/colors';

const Title = ({ title }: { title: string }) => {
	return <Text style={styles.title}>{title}</Text>;
};

export default Title;

const styles = StyleSheet.create({
	title: {
		fontFamily: 'open-sans-bold',
		fontSize: 24,
		color: 'white',
		textAlign: 'center',
		borderWidth: 2,
		borderColor: 'white',
		padding: 8,
	},
});
