import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';
import FontFamily from '../../constants/FontFamily';

export const styles = StyleSheet.create({
    primaryContainer: {
        flex: 1,
        backgroundColor: colors.background,
    },
    heading: {
        alignSelf: "center",
        width: "80%",
        color: "#414042",
        fontFamily: FontFamily.Bold,
        marginBottom: 20
    },
    contentContainerStyleCenter: {
        marginTop: 30,
    },
    userNameAboveContainer: {
        marginTop: 20,
    },
    passwordAboveContainer: {
        marginTop: -10,
    },
    textInputContainer: {
        marginHorizontal: 0,
        alignSelf: "center",
        width: "80%",
    },
    textInputLeftIcon: {
        marginBottom: -10,
        marginLeft: 0,
    },
    buttonStyle: {
        borderRadius: 60,
        width: "75%",
        alignSelf: "center",
        // height: 38,
        marginTop: 20,
    },
    buttonIconStyle: {
        paddingHorizontal: 8,

    },
    separator: {
        marginVertical: 16,
        height: 2,
        backgroundColor: "#707070",
        borderRadius: 1,
        width: 50,
        alignSelf: "center",
    },
});//end of styles5