import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';
import DefaultStyles from '../../constants/DefaultStyles';
import FontFamily from '../../constants/FontFamily';

export const styles = StyleSheet.create({
    primaryContainer: {
        flex: 1,
        backgroundColor: colors.background,
    },
    heading: {
        ...DefaultStyles.heading,
    },
    contentContainerStyle: {

    },
});//end of styles

export const itemStyles = StyleSheet.create({
    primaryContainer: {
        width: "80%",
        alignSelf: "center",
        marginTop: 10,
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
        marginBottom: 10,
    },
    viewAnswerContainer: {
        marginVertical: 10,
    },
    answerDataContainer: {
        marginBottom: 10,
    },
    answerDataText: {
        color: "#1A1818",
        textAlign: "left",
    },
    textinputContainer: {
        // marginHorizontal: 12,
        marginTop: 0,
        marginBottom: 12,
    },
});

export const headerStyles = StyleSheet.create({
    primaryContainer: {
        // width: "100%",
        // position: "absolute",
        // bottom: 16,
        // right: 12,
        // left: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        // marginHorizontal: 20,
        marginTop: 10,
        marginBottom: 20,
    },
    text: {
        color: "#58595B",
        fontFamily: FontFamily.Bold,
        textAlign: "center",
    },
    button: {
        minWidth: 90,
    },
});//end of headerStyles