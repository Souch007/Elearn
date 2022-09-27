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
        paddingTop: 10,
        paddingBottom: 10,
    },
    videoYoutube: {
        alignSelf: "center",
        width: "90%",
        minHeight: 180,
        borderRadius: 5,
        backgroundColor: "#E4E4E4",
        borderColor: `rgba(0,0,0,0.2)`,
        borderWidth: 1,
    },
});//end of styles

export const itemStyles = StyleSheet.create({
    ytPrimaryContainer: {
        width: "100%",
        marginBottom: 20,
        alignSelf: "center",
    },
    primaryContainer: {
        backgroundColor: "#E4E4E4",
        width: "90%",
        minHeight: 180,
        maxHeight: 180,
        alignSelf: "center",
        marginBottom: 20,
        borderRadius: 5,
    },
    playIconContainer: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center",
    },
    playIcon: {
        width: 50,
        height: 50,
    },
});//end of itemStyles