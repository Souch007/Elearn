import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';

export const styles = StyleSheet.create({
    primaryContainer: {
        flex: 1,

        justifyContent: "center",
        alignItems: "center",
    },
    backImage: {

        // top: "5%",
        height: "80%",
        width: "100%",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        resizeMode: "cover",
        opacity: 0.9,
        tintColor: "#0D65B1",
        position: "absolute",


    },
    logoImage: {
        height: 110,
        width: 110,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        resizeMode: "cover",
        tintColor: colors.white,
        opacity: 1,
    },
    text: {
        color: colors.white,
        textAlign: "center",
        marginTop: 16,
    },
    bottomIconContainer: {
        position: "absolute",
        zIndex: 1,
        bottom: 20,
    },
});//end of styles