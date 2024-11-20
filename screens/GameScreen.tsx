import { Alert, StyleSheet, Text, View } from 'react-native';
import Title from '../components/ui/Title';
import { useState, useEffect } from 'react';
import { generateRandomBetween } from './utils/generateRandomBetween';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';
import Card from '../components/ui/Card';
import { Colors } from './utils/colors';
import { Ionicons } from '@expo/vector-icons';

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({
	userNumber,
	onGameOver,
}: {
	userNumber: number;
	onGameOver: () => void;
}) => {
	const inititalGuess = generateRandomBetween(1, 100, userNumber);
	const [currentGuess, setCurrentGuess] = useState(inititalGuess);

	useEffect(() => {
		if (currentGuess === userNumber) {
			onGameOver();
		}
	}, [currentGuess, userNumber, onGameOver]);

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
			<Card>
				<Text
					style={{ marginVertical: 20, color: Colors.accent500, fontSize: 24 }}
				>
					Higher or lower
				</Text>
				<View style={styles.buttonsContainer}>
					<View style={styles.buttonContainer}>
						<PrimaryButton onPress={nextGuessHandler.bind(this, 'higher')}>
							<Ionicons name="add" size={24} color="white" />
						</PrimaryButton>
					</View>

					<View style={styles.buttonContainer}>
						<PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
							<Ionicons name="remove" size={24} color="white" />
						</PrimaryButton>
					</View>
				</View>
			</Card>
		</View>
	);
};

export default GameScreen;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 24,
		marginTop: 100,
	},
	buttonsContainer: {
		flexDirection: 'row',
	},
	buttonContainer: {
		flex: 1,
	},
});
