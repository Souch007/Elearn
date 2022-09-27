import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';
import DefaultStyles from '../../constants/DefaultStyles';

export const styles = StyleSheet.create({
    primaryContainer: {
        flex: 1,
        backgroundColor: colors.background,
    },
    heading: {
        ...DefaultStyles.heading,
    },
    headingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    viewPdfButtonContainer: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    body: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 40,
    },
    marksText: {
        color: colors.primary,
        textAlign: "center",
    },
    separate: {
        height: 1,
        backgroundColor: "#808183",
        width: "70%",
        marginVertical: 8,
    },
    totalText: {
        color: "#808183",
        textAlign: "center",
        marginBottom: 40,
    },
});//end of styles