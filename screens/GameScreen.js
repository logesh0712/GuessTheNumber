import { useState, useEffect } from 'react';
import {StyleSheet, Text, View, Alert, FlatList, useWindowDimensions} from 'react-native';
import Title from '../components/ui/Title';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import { Ionicons } from '@expo/vector-icons';
import GuessLogItem from '../components/game/GuessLogItem';

function generateRandomBetween(min, max, exclude){
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if(rndNum === exclude){
        return generateRandomBetween(min, max, exclude);
    }
    else{
        return rndNum;
    }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({userNumber, onGameOverHandler})
{
    const initialGuess = generateRandomBetween(1, 100, userNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guessRounds, setGuessRounds] = useState([initialGuess]);

    const {width, height} = useWindowDimensions();

    useEffect(() => {
        if(currentGuess === userNumber)
        {
            onGameOverHandler(guessRounds.length);
        }
    }, [currentGuess, userNumber, onGameOverHandler]); //If values here are changed, this will be executed.

    useEffect(() => {
        minBoundary = 1;
        maxBoundary = 100;
    },[]); // Empty array here: So that on every time page loads this is executed.

    function nextGuessHandler(direction) //direction => 'lower', 'greater'
    {
        if ((direction ==='lower' && currentGuess < userNumber) || 
        (direction ==='greater' && currentGuess > userNumber))
        {
            //Alert.alert("Don't lie, You know this is wrong input ....", [{text: 'Sorry!', style:'cancel'}]);

            Alert.alert(
                "Wrong input!", 
                "Don't lie, You know this is wrong input ....", 
                [{text: 'Sorry!', style: 'cancel'}]);
            return;
        }

        if(direction === 'lower')
        {
            maxBoundary = currentGuess;
        }
        else
        {
            minBoundary = currentGuess + 1;
        }

        const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
        setCurrentGuess(newRndNumber);
        setGuessRounds(prevGuessRounds => [newRndNumber, ...prevGuessRounds]);
    }

    const guessRoundsListLength = guessRounds.length;
    let content = (
        <>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <InstructionText style={styles.instructionTextContainer}>
                    Higher or lower?
                </InstructionText>
    
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}> 
                            <Ionicons name="md-remove" size={20} color="white"></Ionicons>
                        </PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}> 
                            <Ionicons name="md-add" size={20} color="white"></Ionicons> 
                        </PrimaryButton>
                    </View>
                </View>
            </Card>
        </>
    );
    
    if (width > 500)
    {
        content = (
            <>
                {/* 
                <InstructionText style={styles.instructionTextContainer}>
                    Higher or lower?
                </InstructionText>
                */}
                <View style={styles.buttonContainerWide}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}> 
                            <Ionicons name="md-remove" size={20} color="white"></Ionicons>
                        </PrimaryButton>
                    </View>
                    
                    <NumberContainer>{currentGuess}</NumberContainer>

                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}> 
                            <Ionicons name="md-add" size={20} color="white"></Ionicons> 
                        </PrimaryButton>
                    </View>
                </View>

            </>
        );
    }

    return (
        <View style={styles.screen}>
            
            <Title>Opponent's Guess</Title>
            
            
            {content}
            

            <View style={styles.listContainer}>
                {/*
                {guessRounds.map(guessRound => <Text key={guessRound}>{guessRound}</Text>)}
                */}
                <FlatList 
                    data={guessRounds} 
                    renderItem={(itemData) => <GuessLogItem guess={itemData.item} roundNumber={guessRoundsListLength - itemData.index}></GuessLogItem>}
                    keyExtractor = {(item) => item}
                >
                </FlatList>
            </View>
        </View>
    );
}

export default GameScreen;

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        padding: 30,
        alignItems: 'center' // AUI
    },
    buttonsContainer:{
        flexDirection: 'row'
    },
    buttonContainer:{
        flex: 1
    },
    instructionTextContainer:{
        marginBottom: 12
    },
    listContainer:{
        flex: 1,
        padding: 16
    },
    buttonContainerWide:{
        flexDirection: 'row', //Default is column
        alignItems: 'center'
    }
});