import {
	Alert,
	FlatList,
	StyleSheet,
	Text,
	useWindowDimensions,
	View,
} from 'react-native';
import Title from '../components/ui/Title';
import { useState, useEffect } from 'react';
import { generateRandomBetween } from './utils/generateRandomBetween';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';
import Card from '../components/ui/Card';
import { Colors } from './utils/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import GuessLogItem from '../components/game/GuessLogItem';

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({
	userNumber,
	onGameOver,
}: {
	userNumber: number;
	onGameOver: (rounds: number) => void;
}) => {
	const inititalGuess = generateRandomBetween(1, 100, userNumber);
	const [currentGuess, setCurrentGuess] = useState(inititalGuess);
	const [guessRounds, setguessRounds] = useState([inititalGuess]);
	const { height, width } = useWindowDimensions();

	useEffect(() => {
		if (currentGuess === userNumber) {
			onGameOver(guessRounds.length);
		}
	}, [currentGuess, userNumber, onGameOver]);

	useEffect(() => {
		(minBoundary = 1), (maxBoundary = 100);
	}, []);

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
		setguessRounds((prev) => [newRandNumber, ...prev]);
	};

	const guessRoundListLenght = guessRounds.length;

	let content = (
		<>
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
		</>
	);

	if (width > 500) {
		content = (
			<>
				<Text
					style={{
						marginVertical: 20,
						color: Colors.accent500,
						fontSize: 24,
						textAlign: 'center',
					}}
				>
					Higher or lower
				</Text>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							marginHorizontal: 20,
						}}
					>
						<View style={styles.buttonContainer}>
							<PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
								<Ionicons name="remove" size={24} color="white" />
							</PrimaryButton>
						</View>
						<NumberContainer>{currentGuess}</NumberContainer>
						<View style={styles.buttonContainer}>
							<PrimaryButton onPress={nextGuessHandler.bind(this, 'higher')}>
								<Ionicons name="add" size={24} color="white" />
							</PrimaryButton>
						</View>
					</View>
				</View>
			</>
		);
	}

	return (
		<View
			style={
				(styles.screen,
				{
					marginTop: width > 500 ? 50 : 100,
				})
			}
		>
			<Title title="Opponent's Guess" />
			{content}
			<View style={styles.guessLogContainer}>
				{/* {guessRounds.map((guessRound) => (
					<Text key={guessRound}>{guessRound}</Text>
				))} */}
				<FlatList
					data={guessRounds}
					renderItem={({ index, item }) => (
						<GuessLogItem
							roundNumber={guessRoundListLenght - index}
							guess={item}
						/>
					)}
					keyExtractor={(item) => item.toString()}
				/>
			</View>
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
	guessLogContainer: {
		flex: 1,
		padding: 16,
	},
});
