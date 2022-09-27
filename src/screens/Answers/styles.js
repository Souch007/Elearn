import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';
import DefaultStyles from '../../constants/DefaultStyles';

export const styles = StyleSheet.create({
    primaryContainer: {
        flex: 1,
        backgroundColor: colors.background,
    },

    contentContainerStyle: {

    },
});//end of styles

export const itemStyles = StyleSheet.create({
    primaryContainer: {
        width: "80%",
        alignSelf: "center",
        marginTop: 10,
        marginBottom: 10,
    },
    heading: {
        ...DefaultStyles.heading,
    },
    text: {
        color: "#1A1818",
        textAlign: "left",
    },
    answerTitle: {
        color: colors.primary,
        textAlign: "left",
        marginVertical: 10,
    },
    answer: {
        color: "#1A1818",
        textAlign: "left",
    },

});