import { Text, View, StyleSheet, Image, ScrollView, Dimensions, useWindowDimensions } from 'react-native';
import Title from '../components/ui/Title';
import Colors from '../constants/colors';
import PrimaryButton from '../components/ui/PrimaryButton';

function GameOverScreen({roundsNumber, userNumber, onStartNewGame})
{
    const {width, height} = useWindowDimensions();
    
    let imageSize = 300;

    if(width < 380)
    {
        imageSize = 150;
    }

    if(height < 400)
    {
        imageSize = 80;
    }

    const imageStyle = {
        width : imageSize,
        height : imageSize,
        borderRadius: imageSize / 2
    }

    return (
        <ScrollView style={styles.screen}>
            <View style={styles.rootContainer}>
                <Title>Game Over!!</Title>

                <View style={[styles.imageContainer, imageStyle]}>
                    <Image style={styles.image} source={require('../assets/images/1.jpg')}></Image>
                </View>

                <Text style={styles.summaryText}> 
                    Your phone took <Text style={styles.highlight}>{roundsNumber}</Text> rounds to identify <Text style={styles.highlight}>{userNumber}</Text> number
                </Text>

                <PrimaryButton onPress={onStartNewGame}>Start new game</PrimaryButton>
            </View>
        </ScrollView>
    );
}

export default GameOverScreen;

//const deviceWidth = Dimensions.get('window').width;
//const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    screen:{
        flex:1
    },
    rootContainer:{
        flex: 1,
        padding: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    // AUI: Below width and height are same value.
    // We cannot go with percentage like width:'50%'. Because percentage of what? parent values may be.
    // So applying percentage of one will screw another one. Eg: Applying percentage on width will screw height.
    // So good to use pixels here.
    // Now, we need to adjust to device sizes.
    // 
    imageContainer:{
        //width: deviceWidth<380?150:300,
        //height: deviceWidth<380?150:300, // Using width here because at end, both width and height should be same for image.
        //borderRadius: deviceWidth<380?75:150, // Value should be half of above.
        borderwidth: 3,
        borderColor: Colors.primary500,
        overflow: 'hidden',
        margin: 36
    },
    image:{
        width: '100%',
        height: '100%'
    },
    titleContainer:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    summaryText:{
        fontFamily: 'open-sans',
        fontSize: 24,
        textAlign: 'center',
        //marginVertical: 24
        marginBottom: 24
    },
    highlight:{
        fontFamily: 'open-sans-bold',
        color: Colors.primary500
    }
});