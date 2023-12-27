import { Text, StyleSheet, Platform } from 'react-native';

import Colors from '../../constants/colors';

function Title({children})
{
    return (
        <Text style={styles.title}> 
            {children}
        </Text>
    );
}

export default Title;

const styles = StyleSheet.create({
    title:{
        fontFamily: 'open-sans-bold',
        fontSize: 25,
        //fontWeight: 'bold',
        color: Colors.primary500,
        textAlign: 'center',
        // One way of using the Platform is this
        //borderWidth: Platform.OS === 'android' ? 4 : 0,
        // Another way of using the Platform is below
        borderWidth: Platform.select({ios: 0, android:2}),
        borderColor: Colors.primary500,
        padding: 12,
        maxWidth: '80%', //(AUI)Idea is just take 80 percentage of the width in the screen
        // that is 80 percentage of the parent who ever incorporating the Title
        width: 300 // AUI. taking up to 300 pixels
        //backgroundColor: Colors.primary600
    }
});