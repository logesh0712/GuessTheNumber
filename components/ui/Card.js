import { StyleSheet, View, Dimensions } from "react-native";
import Colors from "../../constants/colors";

function Card({children})
{
    return (
        <View style={styles.inputContainer}>
            {children}
        </View>
    );
}

export default Card;

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    inputContainer:{
        //flex:1,
        justifyContent: 'center',
        alignItems: 'center', // default is stretch
        padding:5,
        marginTop: deviceWidth< 380? 18:36,
        marginHorizontal: 20,
        borderRadius: 10,
        backgroundColor: Colors.primary600,
        elevation: 70, // android property
        shadowColor: 'black', // iphone property
        shadowOffset: {width: 0, height: 2}, // iphone property
        shadowRadius: 0.25, // iphone property
    }
});