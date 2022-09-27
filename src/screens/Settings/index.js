import i18n from 'i18n-js';
import React, { Component } from 'react';
import { I18nManager, Platform, ScrollView, TouchableOpacity, View } from 'react-native';
import RNRestart from 'react-native-restart';
import CardBox from '../../appComponents/CardBox';
import CustomHeader from '../../components/CustomHeader';
import CustomIcon from '../../components/CustomIcon';
import CustomStatusbar from '../../components/CustomStatusbar';
import Text from '../../components/Text';
import ColorEnum from '../../constants/ColorEnum';
import colors from '../../constants/colors';
import FontSize from '../../constants/FontSize';
import AppEnum from '../../helper/AppEnum';
import appFunctions from '../../helper/appFunctions';
import { IMLocalized } from '../../locales/IMLocalization';
import sharedPreferences from '../../sharedPreferences';
import sharedPreferencesKeys from '../../sharedPreferences/sharedPreferencesKeys';
import GV from '../../utils/GV';
import { styles } from './styles';
import DeviceInfo from 'react-native-device-info';

//end of IMPORT's

const e2a = s => s.replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d])

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDarkMode: false,

            isUrdu: GV.isRTL ? true : false,

            fontSize: 12,

            appVersion: '',
        };//end of INITIALIZING STATE's
    }//end of CONSTRUCTOR

    componentDidMount = async () => {
        const modeRes = await appFunctions.getModeBool();
        const fs = await appFunctions.getFontSize();
        this.setState({
            isDarkMode: modeRes.value,
            fontSize: fs.value
        })
        this.appVersion();
    }//end of COMPONENT_DID_MOUNT

    componentWillUnmount = async () => {
    }//end of COMPONENT_WILL_UNMOUNT

    backPress = () => {
        this.props.navigation.pop() && this.props.navigation.goBack();
    }//end of BACK PRESS

    logoutPress = async () => {
        appFunctions.logout();
    }//end of logoutPress

    appVersion = () => {
        const version = DeviceInfo.getVersion();
        let buildNumber = "";
        if (Platform.OS === "ios") {
            buildNumber = `.${DeviceInfo.getBuildNumber()}`;
        }

        const versionString = "Version " + version + buildNumber;
        this.setState({
            appVersion: versionString,
        })
    }//end of AppVersion

    render = () => {
        const { isDarkMode, isUrdu, fontSize } = this.state;
        return (
            <View style={[styles.primaryContainer, {
                backgroundColor: colors.get(ColorEnum.name.background),
            }]}>
                <CustomStatusbar />
                <CustomHeader
                    back={false}
                    backPress={this.backPress}
                    rightIcon
                    rightIconName={"logout"}
                    rightIconType={"AntDesign"}
                    rightIconPress={this.logoutPress}
                    showStepProgress={false} />

                <ScrollView
                    bounces={false}>

                    <Text style={[styles.heading, {
                        color: colors.get(ColorEnum.name.heading1),
                        fontSize: FontSize.value(20),
                    }]}>{IMLocalized(`Settings`)}</Text>

                    {/* ******************** MODE's Start ******************** */}
                    <View style={styles.modePrimaryContainer}>
                        <Text style={[styles.title, {
                            fontSize: FontSize.value(18),
                        }]}>{IMLocalized(`Modes`)}</Text>
                        <View style={styles.modeContainer}>

                            <TouchableOpacity
                                onPress={() => { this.setState({ isDarkMode: true }); }}
                                style={isDarkMode ? styles.modeTextContainerSelected : styles.modeTextContainer}>
                                <Text style={[styles.modeText, {
                                    fontSize: FontSize.value(18),
                                }]}>{IMLocalized(`Dark`)}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => { this.setState({ isDarkMode: false }); }}
                                style={!isDarkMode ? styles.modeTextContainerSelected : styles.modeTextContainer}>
                                <Text style={[styles.modeText, {
                                    fontSize: FontSize.value(18),
                                }]}>{IMLocalized(`Light`)}</Text>
                            </TouchableOpacity>

                        </View>
                    </View>

                    {/* ******************** MODE's End ******************** */}


                    {/* ******************** LANGUAGE Start ******************** */}
                    <View style={styles.modePrimaryContainer}>
                        <Text style={[styles.title, {
                            fontSize: FontSize.value(18),
                        }]}>{IMLocalized(`Language`)}</Text>
                        <View style={styles.modeContainer}>

                            <TouchableOpacity
                                onPress={() => { this.setState({ isUrdu: true }) }}
                                style={isUrdu ? styles.modeTextContainerSelected : styles.modeTextContainer}>
                                <Text style={[styles.modeText, {
                                    fontSize: FontSize.value(18),
                                }]}>{IMLocalized(`Urdu`)}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => { this.setState({ isUrdu: false }) }}
                                style={!isUrdu ? styles.modeTextContainerSelected : styles.modeTextContainer}>
                                <Text style={[styles.modeText, {
                                    fontSize: FontSize.value(18),
                                }]}>{IMLocalized(`English`)}</Text>
                            </TouchableOpacity>

                        </View>
                    </View>

                    {/* ******************** LANGUAGE End ******************** */}

                    {/* ******************** FONT SIZE Start ******************** */}
                    <View style={styles.modePrimaryContainer}>
                        <Text style={[styles.title, {
                            fontSize: FontSize.value(18),
                        }]}>{IMLocalized(`Font Size`)}</Text>

                        <View style={styles.fontSizeContainer}>
                            <TouchableOpacity style={styles.iconContainer}
                                onPress={this.decrementFontSize}>
                                <CustomIcon
                                    name={"minus"}
                                    iconType={"FontAwesome"}
                                    color={"#8A8989"}
                                    size={15}
                                />
                            </TouchableOpacity>

                            <Text style={[styles.fontSizeText, {
                                fontSize: FontSize.value(45),
                            }]}>
                                {GV.isRTL ? e2a((fontSize).toString()) : fontSize}
                            </Text>


                            <TouchableOpacity style={styles.iconContainer}
                                onPress={this.incrementFontSize}>
                                <CustomIcon
                                    name={"plus"}
                                    iconType={"FontAwesome"}
                                    color={"#8A8989"}
                                    size={15}
                                />
                            </TouchableOpacity>

                        </View>
                    </View>

                    {/* ******************** FONT SIZE End ******************** */}


                    {/* ******************** SAVE CHANGES Start ******************** */}
                    <View style={{
                        alignSelf: "center",
                        marginTop: 20,
                        marginBottom: 30,
                        width: "80%"
                    }}>
                        <CardBox
                            title={IMLocalized(`Save Changes`)}
                            width={"100%"}
                            minHeight={40}
                            height={40}
                            onPress={() => { this.saveChangesPress() }}
                        />
                    </View>

                    {/* ******************** SAVE CHANGES End ******************** */}



                </ScrollView>
                <View style={{
                    position: "absolute",
                    left: 0,
                    right: 12,
                    bottom: 12,
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                }}>
                    <Text>{this.state.appVersion}</Text>
                </View>
            </View>
        );
    }//end of RENDER

    saveChangesPress = async () => {
        const { isUrdu, isDarkMode } = this.state;

        GV.isRTL = isUrdu;
        await sharedPreferences.store(sharedPreferencesKeys.language, isUrdu ? 'ur' : 'en');

        I18nManager.forceRTL(isUrdu);

        i18n.locale = isUrdu ? 'ur' : 'en';

        await appFunctions.changeMode(isDarkMode ? AppEnum.APP_MODE.dark : AppEnum.APP_MODE.light);

        await appFunctions.changeFontSize(this.state.fontSize)

        RNRestart.Restart();

    }//end of saveChangesPress

    incrementFontSize = () => {
        this.setState(prevState => ({

            fontSize: prevState.fontSize < 16 ? prevState.fontSize + 1 : prevState.fontSize
        }))
    }//end of incrementFontSize

    decrementFontSize = () => {
        this.setState(prevState => ({
            fontSize: prevState.fontSize > 8 ? prevState.fontSize - 1 : prevState.fontSize
        }))
    }//end of decrementFontSize

}//end of CLASSS index

