import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../screens/utils/colors';

const Title = ({ title }: { title: string }) => {
	return <Text style={styles.title}>{title}</Text>;
};

export default Title;

const styles = StyleSheet.create({
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		color: 'white',
		textAlign: 'center',
		borderWidth: 2,
		borderColor: 'white',
		padding: 8,
	},
});
