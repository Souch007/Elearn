import { NavigationContainer, useTheme } from '@react-navigation/native';
import i18n from 'i18n-js';
import * as React from 'react';
import { I18nManager, LogBox, View } from 'react-native';
import FlashMessage from "react-native-flash-message";
import 'react-native-gesture-handler';
import Orientation from 'react-native-orientation-locker';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import darkColors from './src/constants/darkColors';
import defaultColors from './src/constants/defaultColors';
import appFunctions from './src/helper/appFunctions';
import Routes from './src/routes';
import sharedPreferences from './src/sharedPreferences';
import sharedPreferencesKeys from './src/sharedPreferences/sharedPreferencesKeys';
import InitializeDB from './src/SqlLite/InitializeDB';
import GV from './src/utils/GV';
import crashlytics from '@react-native-firebase/crashlytics';
import colors from './src/constants/colors';
import SplashScreen from 'react-native-splash-screen'

AntDesign.loadFont();
Entypo.loadFont();
EvilIcons.loadFont();
Feather.loadFont();
FontAwesome.loadFont();
Fontisto.loadFont();
Ionicons.loadFont();
MaterialCommunityIcons.loadFont();
MaterialIcons.loadFont();
Foundation.loadFont();
SimpleLineIcons.loadFont();

LogBox.ignoreAllLogs();


export default function (props) {
  const theme = useTheme()

  return <App {...props} theme={theme} />
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
    this.orientationLock();

    const { theme } = props;

  }//end of constructor

  orientationLock = () => {
    // Orientation.lockToPortrait();
    Orientation.unlockAllOrientations();
  }//end of orientationLock

  subscription = null;
  componentDidMount = async () => {

    // Set the locale once at the beginning of your app.
    let DEFAULT_LANGUAGE = __DEV__ ? 'en' : 'en';
    let isAppRTL = __DEV__ ? false : false;

    const res = await sharedPreferences.retrieve(sharedPreferencesKeys.language);
    if (res !== false) {
      if (res === "ur") {
        DEFAULT_LANGUAGE = 'ur';
        isAppRTL = true;
      }
    }


    console.log(`LANUAGE IS==> ${DEFAULT_LANGUAGE} and IS RTL===> ${isAppRTL}`);
    i18n.locale = DEFAULT_LANGUAGE;
    I18nManager.forceRTL(isAppRTL);

    const mode = await appFunctions.getModeBool();
    GV.theme = mode.value ? MyDarkTheme : MyDefaultTheme;

    const fs = await appFunctions.getFontSize();
    GV.fontSize = fs.value;

    this.setState({
      loading: false
    })

    await crashlytics().setCrashlyticsCollectionEnabled(true);

    this.orientationLock();
    InitializeDB.init();

    SplashScreen.hide();
  }//end of componentDidMount

  componentWillUnmount = async () => {
    // if(this.subscription!==null){
    //   this.subscription.remove();
    // }
  }//end of 

  render = () => {
    if (this.state.loading) return <View />;
    return (

      <SafeAreaProvider style={{ backgroundColor: colors.primary }}>
        <NavigationContainer>

          <Routes />

        </NavigationContainer>
        <FlashMessage position="top" />
      </SafeAreaProvider>
    );
  }//end of RENDER
}//end of CLASS

const MyDarkTheme = {
  colors: {
    ...darkColors
  }
};

export const MyDefaultTheme = {
  colors: {
    ...defaultColors
  }
};