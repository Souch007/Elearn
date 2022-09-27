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
    itemContainerStyle: {
        margin: 16,
    },
});//end of styles