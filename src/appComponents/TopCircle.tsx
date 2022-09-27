import React, { Component } from 'react';
import { Dimensions, GestureResponderEvent, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Svg, Circle } from "react-native-svg";
import CustomIcon from '../components/CustomIcon';
import colors from '../constants/colors';
import LocalAssets from '../constants/LocalAssets';
import GV from '../utils/GV';
import Constants from 'expo-constants';
//END OF IMPORT's

const { width, height } = Dimensions.get("screen");

interface componentInterface {
    isAbsolute?: boolean;

    back?: boolean;
    backPress?: (event: GestureResponderEvent) => void;
}//end of INTERFACE 

export default class TopCircle extends Component<componentInterface, any> {

    public static defaultProps = {
        isAbsolute: false,

        back: false,
        backPress() { },

    };//end of DEFAULT PROPS DECLARATION

    render() {
        const { isAbsolute, back, backPress, } = this.props;
        const CIRCLE_HEIGHT = (width);
        const CIRCLE_WIDTH = (width);

        return (
            <>
                <Svg
                    style={{ position: isAbsolute ? 'absolute' : 'relative' }}
                    height={CIRCLE_HEIGHT}
                    width={CIRCLE_WIDTH}>
                    <Circle
                        // transform="translate(50,0) scale(-1,1)"
                        cx="0"
                        cy="0"
                        x={GV.isRTL ? width : 0}

                        r={CIRCLE_HEIGHT}
                        fill={colors.loginTopBGColor}
                        strokeWidth={1}
                        stroke={colors.loginTopBGColor}
                    />
                    <FastImage
                        style={{
                            width: CIRCLE_WIDTH - 70,
                            height: CIRCLE_HEIGHT,
                            // marginLeft: -80,
                            transform: [{ scaleX: GV.isRTL ? -1 : 1 }]
                        }}
                        source={LocalAssets.JPG.loginTopE}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                </Svg>

                {back &&
                    <TouchableOpacity
                        style={styles.backIconContainer}
                        //@ts-ignore
                        onPress={(event: GestureResponderEvent) => {
                            backPress(event)
                        }}>
                        <CustomIcon
                            name={GV.isRTL ? "keyboard-arrow-right" : "keyboard-arrow-left"}
                            iconType={"MaterialIcons"}
                            size={30}
                            color={colors.white}
                            style={styles.backIcon}
                        />
                    </TouchableOpacity>

                }

            </>
        )
    } // end of Function Render

} //end of class TopCircle


const styles = StyleSheet.create({
    containerStyle: {
    },
    backIconContainer: {
        position: 'absolute',
        left: 0,
        top: Platform.OS === "ios" ? Constants.statusBarHeight + 10 : 5,
        paddingLeft: 16,
        zIndex: 1,
        alignItems: "flex-start",
        width: "15%",
    },
    backIcon: {

    },
}); //end of StyleSheet STYLES
