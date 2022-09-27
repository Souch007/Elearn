import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';
import DefaultStyles from '../../constants/DefaultStyles';
import FontFamily from '../../constants/FontFamily';
import GV from '../../utils/GV';

export const styles = StyleSheet.create({
    primaryContainer: {
        flex: 1,
    },
    heading: {
        marginHorizontal: 20,
        ...DefaultStyles.heading,
    },
    contentContainerStyle: {
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    iPrimaryContainer: {
        marginBottom: -10,
    },
    cardPrimaryContainer: {
        paddingVertical: 6,
        paddingHorizontal: 12,
    },
    itemContainerStyle: {
        margin: 16,
    },
    iCustomPrimaryContainer: {
        flexDirection: "row",
        // alignItems: "center",
    },
    iTitleStyle: {
        color: colors.white,
        // paddingLeft: 8,
        width: "70%",
        textAlign: "left"
    },
    iStatusStyle: {
        color: colors.white,
        textAlign: "right",
        paddingRight: 8,
        fontFamily: FontFamily.MediumItalic,
        fontStyle: 'italic',
        width: "30%",
    },
    iDateTime: {
        color: colors.white,
        textAlign: "left",
        fontFamily: FontFamily.MediumItalic,
        fontStyle: 'italic',

    },
    iSyncContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        alignSelf: "flex-end",
    },
    iSyncText: {
        paddingLeft: 4,
        color: colors.white,
        textAlign: "left",
        fontFamily: FontFamily.MediumItalic,
        fontStyle: 'italic',
    },
});//end of styles