import {
    TextInput, 
    View, 
    StyleSheet, 
    Button, 
    Alert, 
    Text, 
    Dimensions, // AUI
    useWindowDimensions, // AUI
    KeyboardAvoidingView, // AUI
    ScrollView // AUI
} from 'react-native'
import PrimaryButton from '../components/ui/PrimaryButton';
import {useState} from 'react'
import Colors from '../constants/colors';
import Title from '../components/ui/Title';
import Card from '../components/ui/Card';
import InstructionTextContainer from '../components/ui/InstructionText';
//function StartGameScreen(props)
function StartGameScreen({onPickedNumberHandler})
{
    const [enteredNumber, setEnteredNumber] = useState('');
    
    //AUI
    const {width, height} = useWindowDimensions();

    function numberInputHandler(enteredText)
    {
        setEnteredNumber(enteredText);
    }

    function resetInputHandler()
    {
        setEnteredNumber('');
    }

    function confirmInputHandler()
    {
        console.log('num is '+ enteredNumber);

        const choosenNumber = parseInt(enteredNumber);

        console.log('choosenNumber is '+ choosenNumber);

        if(isNaN(choosenNumber) || choosenNumber<=0 || choosenNumber>99)
        {
            console.log('I am in alert');
            // show alert..........
            Alert.alert(
                'Invalid number', 
                'Number should be in range of 1 to 99', 
                [{text: 'Okay', style: 'destructive', onPress:resetInputHandler}]);

            return;
        }
        
        //console.log('Valid number');
        onPickedNumberHandler(choosenNumber);
    }

    //AUI
    // Styles are applied only once.
    // So whenever the phone orientation changes, it will be same as before.
    // We are doing it dynamically below.
    const marginTopDistance = height < 380 ? 30: 100;

    return (
        <ScrollView style={styles.screen}>
        <KeyboardAvoidingView style={styles.screen} behavior="position">
            <View style={[styles.rootContainer, {marginTop: marginTopDistance} ]}>
                <Title>Guess my number</Title>
                {/*<View style={styles.inputContainer}>*/}
                <Card>
                    <InstructionTextContainer>Enter a number</InstructionTextContainer>
                    <TextInput 
                        style={styles.numberInput} 
                        maxLength={2} 
                        keyboardType='number-pad'
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={numberInputHandler}
                        value={enteredNumber}
                    >
                    </TextInput>
                    
                    <View style={styles.buttonsContainer}>
                        <View style={styles.buttonContainer}>
                            <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
                        </View>
                        <View style={styles.buttonContainer}>
                            <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
                        </View>
                    </View>
                </Card>
                {/*</View>*/}
            </View>
        </KeyboardAvoidingView>
        </ScrollView>
    );
}

export default StartGameScreen;

const deviceHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
    screen:{
        flex: 1
    },
    rootContainer:{
        flex:1,
        marginTop: deviceHeight< 380? 30 : 100,
        alignItems: 'center', // by default it is stretch
        //backgroundColor: Colors.primary600
    },
    numberInput:{
        height: 50,
        width: 50,
        textAlign: 'center',
        fontSize: 32,
        borderBottomColor: Colors.primary500,
        borderBottomWidth: 2,
        color: Colors.primary500,
        marginVertical: 8,
        fontWeight: 'bold'
    },
    buttonsContainer:{
        flexDirection: 'row'
    },
    buttonContainer:{
        flex: 1
    }    
});