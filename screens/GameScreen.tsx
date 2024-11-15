import { Alert, StyleSheet, Text, View } from 'react-native';
import Title from '../components/ui/Title';
import { useState } from 'react';
import { generateRandomBetween } from './utils/generateRandomBetween';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({ userNumber }: { userNumber: number }) => {
	const inititalGuess = generateRandomBetween(
		minBoundary,
		maxBoundary,
		userNumber
	);
	const [currentGuess, setCurrentGuess] = useState(inititalGuess);

	const nextGuessHandler = (direction: string) => {
		if (
			(direction === 'lower' && currentGuess < userNumber) ||
			(direction === 'higher' && currentGuess > userNumber)
		) {
			Alert.alert("Don't lie!", 'you know that this is wrong...', [
				{
					text: 'Sorry',
					style: 'cancel',
				},
			]);
			return;
		}

		if (direction === 'lower') {
			maxBoundary = currentGuess;
		} else {
			minBoundary = currentGuess + 1;
		}
		const newRandNumber = generateRandomBetween(
			minBoundary,
			maxBoundary,
			currentGuess
		);
		setCurrentGuess(newRandNumber);
	};

	return (
		<View style={styles.screen}>
			<Title title="Opponent's Guess" />
			<NumberContainer>{currentGuess}</NumberContainer>
			<View>
				<View>
					<PrimaryButton onPress={nextGuessHandler.bind(this, 'higher')}>
						+
					</PrimaryButton>
					<PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
						-
					</PrimaryButton>
				</View>
			</View>
			{/* <View>LOG ROUNDs</View> */}
		</View>
	);
};

export default GameScreen;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 24,
		marginTop: 24,
	},
});
