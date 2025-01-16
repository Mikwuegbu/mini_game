import {
	Alert,
	StyleSheet,
	Text,
	TextInput,
	useWindowDimensions,
	View,
	KeyboardAvoidingView,
	ScrollView,
} from 'react-native';
import PrimaryButton from '../components/ui/PrimaryButton';
import { useState } from 'react';
import { Colors } from './utils/colors';
import Title from '../components/ui/Title';
import Card from '../components/ui/Card';

const StartGameScreen = ({
	onPickNumber,
}: {
	onPickNumber: (chosenNumber: number) => void;
}) => {
	const [enteredNumber, setEnteredNumber] = useState('');

	const { height, width } = useWindowDimensions();

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

	const marginTopDistance = height < 380 ? 30 : 100;

	return (
		<ScrollView style={styles.screen}>
			<KeyboardAvoidingView style={styles.screen} behavior="position">
				<View
					style={
						(styles.rootContainer,
						{
							marginTop: marginTopDistance,
						})
					}
				>
					<Title title="Guess my Number"></Title>
					<Card>
						<Text style={styles.instructionText}>Enter a number</Text>
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
								<PrimaryButton onPress={confirmInputHandler}>
									Confirm
								</PrimaryButton>
							</View>
						</View>
					</Card>
				</View>
			</KeyboardAvoidingView>
		</ScrollView>
	);
};

export default StartGameScreen;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
	rootContainer: {
		flex: 1,
		marginTop: 100,
		alignItems: 'center',
	},
	instructionText: {
		color: Colors.accent500,
		fontSize: 24,
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
