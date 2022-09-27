import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';
import DefaultStyles from '../../constants/DefaultStyles';
import FontFamily from '../../constants/FontFamily';

export const styles = StyleSheet.create({
    primaryContainer: {
        flex: 1,
    },
    heading: {
        ...DefaultStyles.heading,
    },
    modePrimaryContainer: {
        marginTop: 10,
        marginBottom: 20,
    },
    title: {
        ...DefaultStyles.heading,
        marginTop: 0,
    },
    modeContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        alignSelf: "center",
        backgroundColor: "#E4E4E4",
        minHeight: 50,
        width: 190,
        borderRadius: 50,
    },
    modeTextContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modeTextContainerSelected: {
        flex: 1,
        backgroundColor: "#F5F5F5",
        minHeight: 45,
        marginHorizontal: 5,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    modeText: {
        textAlign: "left",
        color: colors.primary,
        fontFamily: FontFamily.Bold,
    },
    fontSizeContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    iconContainer: {
        backgroundColor: "#F5F5F5",
        height: 30,
        width: 30,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    fontSizeText: {
        color: colors.primary,
        fontFamily: FontFamily.Bold,
        marginHorizontal: 20,
    },
});//end of styles