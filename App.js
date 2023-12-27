//import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, SafeAreaView} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import {StatusBar} from 'expo-status-bar';

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import Colors from './constants/colors';

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);
  const [nRounds, setNRounds] = useState(0);

  const [fontsLoaded] = useFonts({
    'open-sans' : require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold' : require('./assets/fonts/OpenSans-Bold.ttf')
  });

  if (!fontsLoaded)
  {
    return <AppLoading></AppLoading>;
  }

  function startNewGameHandler()
  {
    setNRounds(0);
    setUserNumber(null);
  }

  function pickedNumberHandler(pickedNumber){
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }

  function gameOverHandler(numberOfRounds)
  {
    setGameIsOver(true);
    setNRounds(numberOfRounds);
  }

  let screen = <StartGameScreen onPickedNumberHandler={pickedNumberHandler}></StartGameScreen>;

  if (userNumber)
  {
    screen = <GameScreen userNumber={userNumber} onGameOverHandler={gameOverHandler}></GameScreen>;
  }

  if (gameIsOver && userNumber)
  {
    screen = <GameOverScreen userNumber={userNumber} roundsNumber={nRounds} onStartNewGame={startNewGameHandler}></GameOverScreen>
  }

  return (
    <>
    <StatusBar style="light"></StatusBar>
    {/*<View style={styles.rootScreen}>
    //<LinearGradient colors={['#2ECBE9', '#0583D2']} style={styles.rootScreen}>
  */}
    <LinearGradient colors={[Colors.primary600, Colors.primary500]} style={styles.rootScreen}>
      <ImageBackground 
      source={require('./assets/images/2.jpg')} 
      resizeMode='cover' 
      style={styles.rootScreen}
      imageStyle={styles.backgroundImage}
      >
        
        <SafeAreaView style={styles.rootScreen}>
          {screen}
        </SafeAreaView>

      </ImageBackground>
      </LinearGradient>
    {/*</View>*/}
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen:{
    flex: 1,
    //backgroundColor:'#2ECBE9'
    //backgroundColor:'#B8E3FF'
  },
  backgroundImage:{
    opacity: 0.30
  }
});
