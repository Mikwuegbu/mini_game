import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import PrimaryButton from '../components/ui/PrimaryButton';
import { useState } from 'react';
import { Colors } from './utils/colors';

const StartGameScreen = ({
	onPickNumber,
}: {
	onPickNumber: (chosenNumber: number) => void;
}) => {
	const [enteredNumber, setEnteredNumber] = useState('');

	const numberInputHandler = (text: string) => {
		setEnteredNumber(text);
	};

	const resetInputHandler = () => {
		setEnteredNumber('');
	};

	const confirmInputHandler = () => {
		const chosenNumber = parseInt(enteredNumber);
		if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 100) {
			Alert.alert(
				'Invalid number!',
				'Please enter a valid number between 1 and 100',
				[
					{
						text: 'Okay',
						style: 'destructive',
						onPress: resetInputHandler,
					},
				]
			);
			return;
		}
		onPickNumber(chosenNumber);
	};

	return (
		<View style={styles.inputContainer}>
			<TextInput
				style={styles.numberInput}
				maxLength={2}
				keyboardType="number-pad"
				onChangeText={numberInputHandler}
				value={enteredNumber}
			/>
			<View style={styles.buttonsContainer}>
				<View style={styles.buttonContainer}>
					<PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
				</View>
				<View style={styles.buttonContainer}>
					<PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
				</View>
			</View>
		</View>
	);
};

export default StartGameScreen;

const styles = StyleSheet.create({
	inputContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		padding: 16,
		marginTop: 100,
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
	numberInput: {
		height: 50,
		width: 50,
		textAlign: 'center',
		fontSize: 32,
		borderBottomColor: Colors.accent500,
		borderBottomWidth: 2,
		color: Colors.accent500,
		marginVertical: 8,
		fontWeight: 'bold',
	},
	buttonsContainer: {
		flexDirection: 'row',
	},
	buttonContainer: {
		flex: 1,
	},
});
