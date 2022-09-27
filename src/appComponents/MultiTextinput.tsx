import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TextInputProps, StyleProp, ViewStyle, Platform } from 'react-native';
import InputAccessoryView from '../components/InputAccessoryView';
import Text from '../components/Text';
import ColorEnum from '../constants/ColorEnum';
import colors from '../constants/colors';
import FontSize from '../constants/FontSize';
import { emptyValidate } from '../helper/genericFunctions';
//END OF IMPORT's


interface componentInterface {
    error?: any;
    value?: any;
    style?: StyleProp<ViewStyle>;
    numberOfLines?: number;
}//end of INTERFACE 

//@ts-ignore
interface all extends componentInterface, TextInputProps { }

export default class MultiTextinput extends Component<all, any> {

    public static defaultProps = {
        error: '',
        numberOfLines: 4,
    };//end of DEFAULT PROPS DECLARATION

    render() {
        const { style, error, numberOfLines, ...otherProps } = this.props;
        const isError = emptyValidate(error) ? true : false;
        const isPlaceholder = "value" in this.props ? this.props.value.length == 0 ? true : false : true;

        return (
            <>
                <TextInput
                    // style={[isPlaceholder ? [styles.placeholderStyle] : styles.textInput, style]}
                    placeholderTextColor={isError ? `#fff` : colors.get(ColorEnum.name.textinputColor)}
                    autoCorrect={false}
                    multiline
                    maxLength={numberOfLines * 150}
                    numberOfLines={Platform.OS === 'ios' ? numberOfLines : numberOfLines}
                    // @ts-ignore
                    minHeight={(Platform.OS === 'ios' && numberOfLines) ? (20 * numberOfLines) : 120}

                    style={[isPlaceholder ? {
                        ...styles.placeholderStyle,
                        backgroundColor: isError ? `red` : colors.get(ColorEnum.name.textinputBG1),
                        borderColor: isError ? `red` : colors.get(ColorEnum.name.textinputBorder),
                        color: isError ? `#fff` : colors.get(ColorEnum.name.textinputColor),
                        fontSize: FontSize.value(12),
                    } : styles.textInput,
                    {
                        borderColor: isError ? `red` : colors.get(ColorEnum.name.textinputBorder),
                        backgroundColor: isError ? `red` : colors.get(ColorEnum.name.textinputBG1),
                        color: isError ? `#fff` : colors.get(ColorEnum.name.textinputColor),
                        fontSize: FontSize.value(12),

                        maxHeight: Platform.OS === 'ios' && numberOfLines ? (20 * numberOfLines) : 1000,
                    },
                        style,
                    ]
                    }
                    inputAccessoryViewID={'uniqueID'}
                    {...otherProps}
                />
                <InputAccessoryView />
                {isError &&
                    <Text style={[styles.errorText, {
                        fontSize: FontSize.value(12),
                    }]}>{error}</Text>
                }

            </>
        )
    } // end of Function Render

} //end of class MultiTextinput


const styles = StyleSheet.create({
    containerStyle: {
    },
    errorText: {
        color: "red",
        marginTop: 8,
    },
    placeholderStyle: {

        borderWidth: 0.5,


        paddingVertical: 4,
        paddingHorizontal: 6,
    },
    textInput: {
        paddingVertical: 4,
        paddingHorizontal: 6,

        borderWidth: 0.5,

    },
}); //end of StyleSheet STYLES
