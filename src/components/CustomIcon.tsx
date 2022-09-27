
import React from 'react';
import { StyleProp, TouchableOpacity, ViewStyle, } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

interface CIInterface {
    iconType: 'Ionicons' | 'AntDesign' | 'Entypo' | 'EvilIcons' | 'Feather' | 'FontAwesome' | 'Fontisto' | 'MaterialCommunityIcons' | 'MaterialIcons' | "Foundation" | "SimpleLineIcons";
    style: StyleProp<ViewStyle>;
    name: any;
    size: number;
    color: any;
    onPress(): any;
}

export default class CustomIcon extends React.Component<CIInterface, any> {
    public static defaultProps = {
        iconType: 'Ionicons',
        name: 'ios-camera',
        color: '#000',
        size: 20,
        style: null,
        onPress() { },
    };

    constructor(props: CIInterface) {
        super(props);
    }

    icon = () => {
        let { iconType, style, color, size, name } = this.props;

        if (iconType === 'Ionicons') {
            return <Ionicons name={name} color={color} size={size} style={[style]} />
        } else if (iconType === 'AntDesign') {
            return <AntDesign name={name} color={color} size={size} style={[style]} />;
        } else if (iconType === 'Entypo') {
            return <Entypo name={name} color={color} size={size} style={[style]} />;
        } else if (iconType === 'EvilIcons') {
            return <EvilIcons name={name} color={color} size={size} style={[style]} />;
        } else if (iconType === 'Feather') {
            return <Feather name={name} color={color} size={size} style={[style]} />;
        } else if (iconType === 'FontAwesome') {
            return <FontAwesome name={name} color={color} size={size} style={[style]} />;
        } else if (iconType === 'Fontisto') {
            return <Fontisto name={name} color={color} size={size} style={[style]} />;
        } else if (iconType === 'MaterialCommunityIcons') {
            return <MaterialCommunityIcons name={name} color={color} size={size} style={[style]} />;
        } else if (iconType === 'MaterialIcons') {
            return <MaterialIcons name={name} color={color} size={size} style={[style]} />;
        } else if (iconType === 'Foundation') {
            return <Foundation name={name} color={color} size={size} style={[style]} />;
        } else if (iconType === 'SimpleLineIcons') {
            return <SimpleLineIcons name={name} color={color} size={size} style={[style]} />;
        }
        else {
            return <Ionicons name={name} color={color} size={size} style={[style]} />;
        }

    };

    render() {
        return (
            this.icon()

        )
    } // end of Function Render
} //end of class CustomTextInput
