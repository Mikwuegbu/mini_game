import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import Title from '../components/ui/Title';
import { Colors } from './utils/colors';
import PrimaryButton from '../components/ui/PrimaryButton';

const GameOverScreen = ({
	roundsNumber,
	userNumber,
	onStartNewGame,
}: {
	roundsNumber: any;
	userNumber: any;
	onStartNewGame: any;
}) => {
	return (
		<View style={styles.rootContainer}>
			<Title title="GAME OVER!" />
			<View style={styles.imageContainer}>
				<Image
					style={styles.image}
					source={require('../assets/images/gameOver.png')}
				/>
			</View>
			<Text style={styles.summaryText}>
				Your phone needed <Text style={styles.highLight}>{roundsNumber}</Text>{' '}
				rounds to guess the number{' '}
				<Text style={styles.highLight}>{userNumber}</Text>
			</Text>
			<PrimaryButton onPress={onStartNewGame}>Start new Game</PrimaryButton>
		</View>
	);
};

export default GameOverScreen;

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		padding: 24,
		justifyContent: 'center',
		alignItems: 'center',
	},
	imageContainer: {
		borderRadius: 150,
		width: deviceWidth < 380 ? 150 : 300,
		height: deviceWidth < 380 ? 150 : 300,
		borderWidth: 3,
		borderColor: Colors.primary800,
		overflow: 'hidden',

		margin: 36,
	},
	image: {
		width: '100%',
		height: '100%',
		resizeMode: 'contain',
	},
	summaryText: {
		fontFamily: 'open-sans',
		fontSize: 24,
		textAlign: 'center',
		marginBottom: 24,
	},
	highLight: {
		fontFamily: 'open-sans-bold',
		color: Colors.primary500,
	},
});
