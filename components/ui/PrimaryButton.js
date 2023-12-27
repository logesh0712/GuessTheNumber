import { View, Text, Pressable, StyleSheet} from 'react-native';

import Colors from '../../constants/colors';

//function PrimaryButton(props)
function PrimaryButton({children, onPress})
{
    function pressHandler()
    {
        //console.log('Pressed!');
        onPress();
    }

    return (
        <View style={styles.buttonOuterContainer}>
            <Pressable 
            //style={styles.buttonInnerContainer} 
            style={({pressed}) => pressed ? [styles.buttonInnerContainer, styles.pressed]: styles.buttonInnerContainer}
            onPress={pressHandler} 
            android_ripple={{color:Colors.primary900}}>
                <Text style={styles.buttonText}>
                    {children}
                </Text>

            </Pressable>
        </View>
    );

}

export default PrimaryButton;

const styles = StyleSheet.create({
    buttonOuterContainer:{
        borderRadius: 28,
        margin: 4,
        overflow: 'hidden'
    },
    buttonInnerContainer:{
        backgroundColor: Colors.primary500,
        //borderRadius: 29,
        paddingVertical: 8,
        paddingHorizontal: 16,
        //margin: 4,
        elevation: 2,
    },
    buttonText:{
        color: Colors.primary800,
        textAlign: 'center'
    },
    pressed:{ //only for ios since ios dont have ripple effect
        opacity: 0.75
    }
});