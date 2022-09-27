import React, { Component } from 'react';
import { StyleSheet, Text as RText, StyleProp, TextStyle, TextProps, Platform } from 'react-native';
import FontFamily from '../constants/FontFamily';
import FontSize from '../constants/FontSize';
import GV from '../utils/GV';
//END OF IMPORT's


interface componentInterface {
    style?: StyleProp<TextStyle>;
}//end of INTERFACE 

interface all extends componentInterface, TextProps { }


export default class Text extends Component<any, all> {

    public static defaultProps = {
    };//end of DEFAULT PROPS DECLARATION

    render() {
        let { style, otherProps } = this.props;
        return (
            <RText
                style={[styles.text, {
                    fontSize: FontSize.value(14),
                }, style]}
                {...otherProps}
            >{this.props.children}</RText>
        )
    } // end of Function Render

} //end of class Text


const styles = StyleSheet.create({
    text: {
        color: "#212121",
        ...!GV.isRTL && { fontFamily: FontFamily.Regular }
    }
}); //end of StyleSheet STYLES
