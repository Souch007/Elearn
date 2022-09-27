import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';
import DefaultStyles from '../../constants/DefaultStyles';

export const styles = StyleSheet.create({
    primaryContainer: {
        flex: 1,
    },
    heading: {
        ...DefaultStyles.heading,
    },
    contentContainerStyle: {
        alignItems: "center",
        justifyContent: "space-evenly",

    },
});//end of styles

export const itemStyles = StyleSheet.create({
    primaryContainer: {
        backgroundColor: "#CECBCB",
        width: 90,
        height: 90,
        borderRadius: 90,
        margin: 16,
    },
    primaryContainerSelected: {
        backgroundColor: colors.primary,
        width: 90,
        height: 90,
        borderRadius: 90,
        margin: 16,
    },
    textContainer: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    text: {
        textAlign: "center",
        color: "#848484",
    },
    textSelected: {
        textAlign: "center",
        color: colors.white,
    },
});//end of itemStyles