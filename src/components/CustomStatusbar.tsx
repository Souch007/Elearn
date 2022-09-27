import React, { Component } from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import colors from '../constants/colors';
//END OF IMPORT's


interface componentInterface {
    backgroundColor?: string;
    barStyle: "dark-content" | "light-content";

}//end of INTERFACE 

const MyStatusBar = ({ backgroundColor = colors.statusbar, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <SafeAreaView>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </SafeAreaView>
    </View>
);

export default class CustomStatusbar extends Component<componentInterface, any> {

    public static defaultProps = {
        backgroundColor: colors.statusbar,
        barStyle: "light-content"
    };//end of DEFAULT PROPS DECLARATION

    render() {
        const { backgroundColor, barStyle } = this.props;
        return (
            <>
                {Platform.OS === "ios" ?
                    <MyStatusBar
                        backgroundColor={backgroundColor} barStyle={barStyle}
                    />
                    :
                    <StatusBar
                        backgroundColor={backgroundColor} barStyle={barStyle} />
                }
            </>
        )
    } // end of Function Render

} //end of class CustomStatusbar


const styles = StyleSheet.create({
    statusBar: {

    },
}); //end of StyleSheet STYLES
