import {View, Text, StyleSheet, Dimensions/*AUI*/} from 'react-native';
import Colors from '../../constants/colors';

function NumberContainer({children})
{
    return (
      <View style={styles.container}>
        <Text style={styles.numberText}>
            {children}
        </Text>
      </View>  
    );
}

export default NumberContainer;

// 'window' --> excluding status bar
// 'screen' --> including status bar
const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        borderWidth: 4,
        borderColor: Colors.primary500,
        padding: deviceWidth<380? 12 : 24, // AUI
        margin: deviceWidth<380? 12 : 24, // AUI
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    numberText: {
        color: Colors.primary500,
        fontSize: deviceWidth<380? 28 : 36,
        //fontWeight: 'bold'
        fontFamily: 'open-sans-bold'
    }
});