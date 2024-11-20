import { ImageBackground, SafeAreaView, StyleSheet } from 'react-native';
import StartGameScreen from './screens/StartGameScreen';
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback, useState } from 'react';
import GameScreen from './screens/GameScreen';
import { Colors } from './screens/utils/colors';
import GameOverScreen from './screens/GameOverScreen';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
	const [userNumber, setUserNumber] = useState<null | number>(null);
	const [gameIsOver, setgameIsOver] = useState(true);
	const [guessRounds, setguessRounds] = useState(0);

	const [fontsLoaded] = useFonts({
		'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
		'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
	});

	const onLayoutRootView = useCallback(() => {
		if (fontsLoaded) {
			SplashScreen.hide();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		return null;
	}

	const pickedNumberHandler = (pickedNumber: number) => {
		setUserNumber(pickedNumber);
		setgameIsOver(false);
	};

	const gameOverHandler = () => {
		setgameIsOver(true);
		setguessRounds(guessRounds);
	};

	const startNewGameHandler = () => {
		setguessRounds(0);
		setUserNumber(null);
	};

	let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

	if (userNumber) {
		screen = (
			<GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
		);
	}

	if (gameIsOver && userNumber) {
		screen = (
			<GameOverScreen
				userNumber={userNumber}
				roundsNumber={guessRounds}
				onStartNewGame={startNewGameHandler}
			/>
		);
	}

	return (
		<LinearGradient
			onLayout={onLayoutRootView}
			colors={[Colors.primary700, Colors.accent500]}
			style={styles.rootScreen}
		>
			<ImageBackground
				source={require('./assets/images/background-image.jpg')}
				resizeMode="cover"
				style={styles.rootScreen}
				imageStyle={styles.backgroundImage}
			>
				<SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
			</ImageBackground>
		</LinearGradient>
	);
}

const styles = StyleSheet.create({
	rootScreen: {
		flex: 1,
	},
	backgroundImage: {
		opacity: 0.15,
	},
});
