import Constants from "expo-constants";
import React, { Component } from 'react';
import { GestureResponderEvent, Image, Platform, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import FastImage from "react-native-fast-image";
import StepProgress from "../appComponents/StepProgress";
import CustomIcon from '../components/CustomIcon';
import Text from "../components/Text";
import colors from '../constants/colors';
import FontFamily from "../constants/FontFamily";
import FontSize from "../constants/FontSize";
import LocalAssets from "../constants/LocalAssets";
import { emptyValidate } from '../helper/genericFunctions';
import ROUTES from "../routes/ROUTES";
import GV from '../utils/GV';
import CustomStatusbar from "./CustomStatusbar";
//END OF IMPORT's

interface componentInterface {
    back?: boolean;
    backPress?: (event: GestureResponderEvent) => void;

    title?: string;

    rightIcon?: boolean;
    rightIconName?: any;
    rightIconType?: 'Ionicons' | 'AntDesign' | 'Entypo' | 'EvilIcons' | 'Feather' | 'FontAwesome' | 'Fontisto' | 'MaterialCommunityIcons' | 'MaterialIcons' | "Foundation" | "SimpleLineIcons";
    rightIconPress?: () => void;

    customRightView: React.ReactElement;

    showStepProgress?: boolean;
}//end of INTERFACE 


export default class CustomHeader extends Component<componentInterface, any> {

    public static defaultProps = {
        back: false,
        backPress() { },

        title: '',

        rightIcon: false,
        rightIconName: "person-circle",
        rightIconType: "Ionicons",
        rightIconPress: () => {
            if (GV.tabClass !== null) {
                GV.tabClass.navigate(ROUTES.Settings);
            }
        },
        customRightView: null,
        showStepProgress: true,
    };//end of DEFAULT PROPS DECLARATION

    render() {
        const { back, backPress, title, rightIcon, rightIconName, rightIconType, rightIconPress, customRightView, showStepProgress } = this.props;


        return (
            <>
                <View style={styles.headerContainer}>

                    <CustomStatusbar />
                    {back ?
                        <TouchableOpacity style={styles.backIconContainer}
                            //@ts-ignore
                            onPress={(event: GestureResponderEvent) => backPress(event)}>
                            <CustomIcon
                                name={GV.isRTL ? "keyboard-arrow-right" : "keyboard-arrow-left"}
                                iconType={"MaterialIcons"}
                                size={30}
                                color={colors.white}
                                style={styles.backIcon}
                            />
                        </TouchableOpacity>
                        :
                        <View style={styles.backIconContainer} />
                    }


                    {emptyValidate(title) ?
                        <View style={styles.titleContainer}>
                            <Text style={[styles.title, {
                                fontSize: FontSize.value(20),
                            }]}>
                                {title}
                            </Text>
                        </View>
                        :
                        <View style={styles.titleContainer}>
                            <FastImage
                                source={LocalAssets.JPG.eImageWhite}
                                tintColor={colors.white}
                                style={{ width: 30, height: 30, tintColor: colors.white }} />
                        </View>
                    }

                    {emptyValidate(customRightView) ?
                        <View style={styles.rightIconContainer}>
                            {/* @ts-ignore */}
                            {customRightView()}
                        </View>

                        : rightIcon ?
                            <TouchableOpacity style={styles.rightIconContainer}
                                onPress={rightIconPress}>
                                <CustomIcon
                                    name={rightIconName}
                                    iconType={rightIconType}
                                    size={30}
                                    color={colors.white}
                                    onPress={rightIconPress} />
                            </TouchableOpacity>
                            :
                            <View style={styles.rightIconContainer} />
                    }


                </View>
                {showStepProgress &&
                    <StepProgress />
                }
            </>
        )
    } // end of Function Render

} //end of class CustomHeader


const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.header,
        minHeight: 50,
    },
    backIconContainer: {
        // position: 'absolute',
        // left: 0,
        paddingLeft: 16,
        zIndex: 1,
        alignItems: "flex-start",
        width: "15%",
        // backgroundColor: 'pink',
    },
    backIcon: {
    },
    titleContainer: {
        // position: 'absolute',
        zIndex: 1,
        alignItems: 'center',
        width: "70%",
        // backgroundColor: 'red',
    },
    title: {
        paddingTop: 3,
        alignSelf: "center",
        ...!GV.isRTL && { fontFamily: FontFamily.Bold },
        color: colors.white,
        textAlign: "center",
    },
    rightIconContainer: {
        // position: 'absolute',
        // right: 0,
        zIndex: 1,
        alignItems: "flex-end",
        width: "15%",
        paddingRight: 16,
        // backgroundColor: 'green',
    },


}); //end of StyleSheet STYLES
