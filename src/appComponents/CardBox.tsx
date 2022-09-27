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
    height?: number | string;
    minHeight?: number | string;

    width?: number | string;
    widthAuto?: boolean;
    minWidth?: number | string;

    onPress?(): any;

    customView?(): any;
    disabled?: boolean;

    selected?: boolean;
    center?: boolean;
    numberOfLines?: number;
}//end of INTERFACE 

const WIDTH_CARD = Dimensions.get('screen').width - 60;

export default class CardBox extends Component<componentInterface, any> {

    public static defaultProps = {
        containerStyle: null,
        title: '',
        height: 60,
        minHeight: 60,
        width: "auto",
        widthAuto: false,
        minWidth: "auto",
        customView: null,
        disabled: false,

        selected: true,
        center: true,

        numberOfLines: 10000
    };//end of DEFAULT PROPS DECLARATION


    state = {
        cardWidth: WIDTH_CARD,
    }

    unsubDimen = null;

    componentDidMount = () => {
        Dimensions.addEventListener('change', () => {
            const dim = Dimensions.get(Platform.OS === "ios" ? 'screen' : 'window');

            this.setState({
                cardWidth: dim.width - 60
            });
        });
    }//end of componentDidMount

    componentWillUnmount = () => {
        Dimensions.removeEventListener('change', () => { });
    }//end of componentWillUnmount

    render = () => {
        const {
            containerStyle, title, titleStyle, height, minHeight, onPress, disabled, customView,
            selected, center, numberOfLines, widthAuto
        } = this.props;

        let { width, minWidth } = this.props;
        if (width === "auto" && !widthAuto) {
            width = this.state.cardWidth;
        }
        if (minWidth === "auto" && !widthAuto) {
            minWidth = this.state.cardWidth;
        }
        return (
            <LinearGradient
                colors={selected ? ['#006EB9', colors.primary, '#54C1D5',] : [`rgba(0, 110, 185, 0.5)`, `rgba(0, 127, 196, 0.5)`, `rgba(84, 193, 213, 0.5)`,]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.containerStyle, containerStyle, {
                    height: height,
                    minHeight: minHeight,
                    width: width,
                    minWidth: minWidth,
                    ...center && {
                        alignItems: "center",
                        justifyContent: "center"
                    },
                }]}>
                <TouchableOpacity style={[styles.containerStyle, containerStyle, {
                    height: height,
                    minHeight: minHeight,
                    width: width,
                    minWidth: minWidth,
                    ...center && {
                        alignItems: "center",
                        justifyContent: "center"
                    },
                }]}
                    disabled={disabled}
                    onPress={onPress}>
                    {emptyValidate(customView) ?
                        customView() :
                        emptyValidate(title) ?
                            <Text style={[styles.titleStyle, {
                                fontSize: FontSize.value(20),
                            }, titleStyle]}
                                numberOfLines={numberOfLines}>{title}</Text>
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
        minHeight: 60,
        borderRadius: 12,

        paddingHorizontal: 4,
    },
    titleStyle: {

        color: colors.white,
        textAlign: "center",
    },
}); //end of StyleSheet STYLES
