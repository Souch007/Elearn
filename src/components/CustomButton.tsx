import React, { Component } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle, TextStyle } from 'react-native';
import { Button, ButtonProps, } from 'react-native-elements';
import colors from '../constants/colors';
import FontFamily from '../constants/FontFamily';
import FontSize from '../constants/FontSize';
import GV from '../utils/GV';
//END OF IMPORT's


interface componentInterface {
    buttonStyle?: StyleProp<ViewStyle>;
    titleStyle?: StyleProp<TextStyle>;
}//end of INTERFACE 

interface all extends componentInterface, ButtonProps {

}//end of INTERFACE 

export default class CustomButton extends Component<all, any> {

    public static defaultProps = {
    };//end of DEFAULT PROPS DECLARATION

    render() {
        const { buttonStyle, titleStyle, ...otherProps } = this.props;
        return (
            <Button
                buttonStyle={[styles.button, buttonStyle]}
                titleStyle={[styles.buttonTitle, {
                    fontSize: FontSize.value(14),
                    ...!GV.isRTL && { fontFamily: FontFamily.Regular }
                }, titleStyle]}
                {...otherProps}
            />

        )
    } // end of Function Render

} //end of class CustomButton


const styles = StyleSheet.create({
    button: {
        minHeight: 38,
        backgroundColor: colors.primary,
    },
    buttonTitle: {
        textAlign: "center",
        ...!GV.isRTL && { fontFamily: FontFamily.Bold }
    }
}); //end of StyleSheet STYLES
