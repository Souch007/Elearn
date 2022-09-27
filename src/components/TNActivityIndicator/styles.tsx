import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    modalContainer: {
    },
    modalSecondaryContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.12)',
        zIndex: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.12)',
        // backgroundColor: "transparent",
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        zIndex: 1,
    },
    indicatorContainer: {
        minWidth: 100,
        minHeight: 100,
        borderRadius: 10,
        backgroundColor: 'rgba(52, 52, 52, 0.7)',
        alignItems: 'center',
        justifyContent: 'center',
        position: "absolute",
        alignSelf: "center",
        paddingHorizontal: 16,
        paddingVertical: 6,
    },
    text: {
        color: 'white',
        marginVertical: 8,
    },
});

export default styles;