import React, { Component } from 'react';
import { StyleSheet, TextInputProps, StyleProp, ViewStyle, Platform } from 'react-native';
// import { TextField } from 'rn-material-ui-textfield';
import { Input, InputProps } from 'react-native-elements';
import ColorEnum from '../constants/ColorEnum';
import colors from '../constants/colors';
import FontFamily from '../constants/FontFamily';
import FontSize from '../constants/FontSize';
import GV from '../utils/GV';
//END OF IMPORT's


interface componentInterface {
    containerStyle?: StyleProp<ViewStyle>;
    inputContainerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
}//end of INTERFACE 

//@ts-ignore
interface all extends componentInterface, InputProps {

}


export default class CustomTextInputMaterial extends Component<all, any> {
    fieldRef = React.createRef();


    public static defaultProps = {

    };//end of DEFAULT PROPS DECLARATION

    render() {
        const { containerStyle, inputContainerStyle, style, ...otherProps } = this.props;
        const isPlaceholder = "value" in this.props ? this.props.value.length == 0 ? true : false : true;
        return (
            <Input
                containerStyle={[styles.containerStyle, containerStyle]}
                inputContainerStyle={[styles.inputContainerStyle, {

                }, inputContainerStyle]}
                style={[isPlaceholder ? [styles.placeholderStyle, {
                    ...Platform.OS === "ios" && { borderBottomColor: colors.get(ColorEnum.name.mtextinputBottomBorder) },

                    fontSize: FontSize.value(15),

                }] : [styles.textInput, {
                    color: colors.get(ColorEnum.name.mtextinputText),

                    fontSize: FontSize.value(16),

                }], style]}
                placeholderTextColor={colors.get(ColorEnum.name.mtextinputText)}
                {...otherProps}
            />
        )
    } // end of Function Render

} //end of class CustomTextInputMaterial


const styles = StyleSheet.create({
    containerStyle: {
    },
    inputContainerStyle: {
        ...Platform.OS === "ios" && { borderBottomColor: '#58595B' },
        ...Platform.OS === "ios" && { borderBottomWidth: 0.25, },
        // textAlign: "center",
    },
    placeholderStyle: {
        color: "#414042",
        marginTop: 9,
        marginLeft: 6,
        ...!GV.isRTL && { fontFamily: FontFamily.Regular }
        // textAlign: "center",
    },
    textInput: {
        color: "#414042",
        marginTop: 9,
        marginLeft: 6,
        ...!GV.isRTL && { fontFamily: FontFamily.Regular }
        // textAlign: "center",

    },
}); //end of StyleSheet STYLES
