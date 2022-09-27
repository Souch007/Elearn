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
    contentContainerStyle: {
        alignItems: "center",
        justifyContent: "space-evenly",
        marginTop: 30,
    },
    itemContainerStyle: {
        margin: 16,
    },
});//end of styles