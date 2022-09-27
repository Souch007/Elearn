import { Platform } from 'react-native';

const IOS_FONT = `Roboto`;

export default {
    Black: Platform.OS === "android" ? "Roboto-Black" : IOS_FONT,
    BlackItalic: Platform.OS === "android" ? "Roboto-BlackItalic" : IOS_FONT,

    Bold: Platform.OS === "android" ? "Roboto-Bold" : IOS_FONT,
    BoldItalic: Platform.OS === "android" ? "Roboto-BoldItalic" : IOS_FONT,

    Italic: Platform.OS === "android" ? "Roboto-Italic" : IOS_FONT,

    Light: Platform.OS === "android" ? "Roboto-Light" : IOS_FONT,
    LightItalic: Platform.OS === "android" ? "Roboto-LightItalic" : IOS_FONT,

    Regular: Platform.OS === "android" ? "Roboto-Regular" : IOS_FONT,

    Medium: Platform.OS === "android" ? "Roboto-Medium" : IOS_FONT,
    MediumItalic: Platform.OS === "android" ? "Roboto-MediumItalic" : IOS_FONT,

    Thin: Platform.OS === "android" ? "Roboto-Thin" : IOS_FONT,
    ThinItalic: Platform.OS === "android" ? "Roboto-ThinItalic" : IOS_FONT,

}//end of EXPORT DEFAULT