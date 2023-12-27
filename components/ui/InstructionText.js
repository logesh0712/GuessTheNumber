import {Text, StyleSheet} from 'react-native'
import Colors from '../../constants/colors';

function InstructionText({children, style})
{
    return (
        <Text style={[styles.instructorContainer,style]}>{children}</Text>
    );
}

export default InstructionText;

const styles = StyleSheet.create({
    instructorContainer:{
        fontFamily: 'open-sans',
        fontSize: 25,
        //fontWeight: 'bold',
        color: Colors.primary500,
        textAlign: 'center',
        //borderWidth: 2,
        //borderColor: Colors.primary500,
        //padding: 12,
    }
});