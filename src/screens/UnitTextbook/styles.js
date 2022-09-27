import { Dimensions, StyleSheet } from 'react-native';
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
    contentContainerStyle: {
        alignSelf: "center",
        paddingBottom: 20,
    },

    pdf: {
        flex: 1,
        backgroundColor: colors.background,

    },
    shareContainer: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        marginTop: 10,
        marginBottom: 10,
    },
});//end of styles