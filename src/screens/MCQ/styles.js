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
    statusText: {
        color: colors.primary,
        textAlign: "right",
        fontStyle: "italic",
    }
});//end of styles

export const itemStyles = StyleSheet.create({
    emptyPrimaryContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    primaryContainer: {
        width: "80%",
        alignSelf: "center",
        marginTop: 10,
    },
    text: {
        marginTop: 10,
        color: "#1A1818",
        textAlign: "left",
    },
    optionSapartor: {
        marginTop: 10,
        marginBottom: 20,
    },
    optionPrimaryContainer: {
        marginBottom: 20,
    },
});

export const footerStyles = StyleSheet.create({
    primaryContainer: {
        position: "absolute",
        bottom: 16,
        right: 12,
        left: 12,
    },
    cPrimaryContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    buttonContainer: {
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    buttonText: {
        color: colors.white,
        textAlign: "center",
        textTransform: "uppercase",
    },
    cSeparator: {
        height: 0.5,
        backgroundColor: "#fff",
        borderRadius: 1,
        minWidth: 40,
        transform: [{ rotate: "90deg" }]
    },
});//end of footerStyles

export const headerStyles = StyleSheet.create({
    primaryContainer: {
        // width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 20,
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