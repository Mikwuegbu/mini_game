import React, { ReactNode } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import PrimaryButton from './PrimaryButton';
import { Colors } from '../../screens/utils/colors';

const Card = ({ children }: { children: ReactNode }) => {
	return <View style={styles.Card}>{children}</View>;
};

export default Card;

const styles = StyleSheet.create({
	Card: {
		justifyContent: 'center',
		alignItems: 'center',
		padding: 16,
		marginVertical: 20,
		backgroundColor: Colors.primary800,
		marginHorizontal: 24,
		borderRadius: 8,
		elevation: 4,
		shadowColor: 'black',
		shadowOffset: {
			width: 1,
			height: 2,
		},
		shadowRadius: 6,
		shadowOpacity: 0.25,
	},
});
