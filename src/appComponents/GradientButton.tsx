import React, { Component } from 'react';
import { Platform } from 'react-native';
import { Dimensions, StyleProp, StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Text from '../components/Text';
import colors from '../constants/colors';
import FontSize from '../constants/FontSize';
import { emptyValidate, hexToRgbA } from '../helper/genericFunctions';
//END OF IMPORT's


interface componentInterface {
    containerStyle?: StyleProp<ViewStyle>;
    title?: any;
    titleStyle?: StyleProp<TextStyle>;


    onPress?(): any;

    customView?(): any;
    disabled?: boolean;


}//end of INTERFACE 

const WIDTH_CARD = Dimensions.get('screen').width - 60;

export default class GradientButton extends Component<componentInterface, any> {

    public static defaultProps = {
        containerStyle: null,
        title: '',

        customView: null,
        disabled: false,


    };//end of DEFAULT PROPS DECLARATION


    state = {

    }

    componentDidMount = () => {

    }//end of componentDidMount

    render = () => {
        const { containerStyle, title, titleStyle, onPress, disabled, customView, } = this.props;


        return (
            <LinearGradient
                colors={['#006EB9', colors.primary, '#54C1D5',]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.containerStyle, containerStyle, {
                }]}>
                <TouchableOpacity style={[styles.containerStyle, containerStyle, {
                }]}
                    disabled={disabled}
                    onPress={onPress}>
                    {emptyValidate(customView) ?
                        customView() :
                        emptyValidate(title) ?
                            <Text style={[styles.titleStyle, {
                                fontSize: FontSize.value(18),
                            }, titleStyle]}>{title}</Text>
                            :
                            <View />
                    }
                </TouchableOpacity>
            </LinearGradient>

        )
    } // end of Function Render

} //end of class CardBox


const styles = StyleSheet.create({
    containerStyle: {
        paddingVertical: 4,
        borderRadius: 12,

        paddingHorizontal: 10,
    },
    titleStyle: {

        color: colors.white,
        textAlign: "center",
    },
}); //end of StyleSheet STYLES
