import React, { Component } from 'react';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import TopCircle from '../../appComponents/TopCircle';
import CustomTextInputMaterial from '../../components/CustomTextInputMaterial';
import { styles } from './styles';
import CustomIcon from "../../components/CustomIcon";
import CustomButton from '../../components/CustomButton';
import KeyboardSpacer from '../../components/KeyboardSpacer';
import colors from '../../constants/colors';
import { IMLocalized } from '../../locales/IMLocalization';
import CustomHeader from '../../components/CustomHeader';
import CustomStatusbar from '../../components/CustomStatusbar';
import FastImage from 'react-native-fast-image';
import LocalAssets from '../../constants/LocalAssets';
import Text from '../../components/Text';
import ROUTES from '../../routes/ROUTES';
import Regex from '../../utils/Regex';
import genericFunctions, { emptyValidate } from '../../helper/genericFunctions';
import ApiManager from '../../manager/ApiManager';
import ApiClasses from '../../manager/ApiClasses';
import appFunctions from '../../helper/appFunctions';
import sharedPreferences from '../../sharedPreferences';
import sharedPreferencesKeys from '../../sharedPreferences/sharedPreferencesKeys';
import IMSignupAPI from '../../controller/IMSignupAPI';
import ColorEnum from '../../constants/ColorEnum';
import FontSize from '../../constants/FontSize';
import { Keyboard } from 'react-native';
import { Dimensions } from 'react-native';
import { Platform } from 'react-native';
//end of IMPORT's

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputEmail: __DEV__ ? '' : '',
            inputEmailError: false,

            inputPhone: __DEV__ ? '' : '',
            inputPhoneError: false,

            inputPassword: __DEV__ ? '' : '',
            inputPasswordError: false,

            inputUsername: __DEV__ ? '' : '',
            inputUsernameError: false,

            isKeyboardOpen: false,

            loading: false,

            isPortrait: true,

        };//end of INITIALIZING STATE's
    }//end of CONSTRUCTOR

    isPortrait = () => {
        const dim = Dimensions.get(Platform.OS === "ios" ? 'screen' : 'window');
        return dim.height >= dim.width;
    };

    /**
     * Returns true of the screen is in landscape mode
     */
    isLandscape = () => {
        const dim = Dimensions.get('screen');
        return dim.width >= dim.height;
    };

    startLoading = () => { this.setState({ loading: true }) };
    stopLoading = () => { this.setState({ loading: false }) };

    _openKeyboard = () => { this.setState({ isKeyboardOpen: true }) };
    _closeKeyboard = async () => { await genericFunctions.sleep(0.2); this.setState({ isKeyboardOpen: false }) };

    keyboardDidShowListener = null;
    keyboardDidHideListener = null;

    componentDidMount = async () => {
        this.load();
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
        Dimensions.addEventListener('change', () => {
            this.setState({
                isPortrait: this.isPortrait() ? true : false
            });
        });
    }//end of COMPONENT_DID_MOUNT

    componentWillUnmount = async () => {
        Dimensions.removeEventListener('change', () => { });
        if (this.keyboardDidShowListener !== null) this.keyboardDidShowListener.remove();
        if (this.keyboardDidHideListener !== null) this.keyboardDidHideListener.remove();
    }//end of COMPONENT_WILL_UNMOUNT

    _keyboardDidShow = () => {
        this._openKeyboard();
    }//end of _keyboardDidShow

    _keyboardDidHide = () => {
        this._closeKeyboard();
    }//end of _keyboardDidHide

    load = () => {

    }//end of LOAD FUNCTION

    backPress = () => {
        this.props.navigation.pop() && this.props.navigation.goBack();
    }//end of BACK PRESS

    validateInput = () => {
        return new Promise(async (resolve) => {
            await this.emailBlur();
            await this.phoneBlur();
            await this.passwordBlur();
            await this.usernameBlur();

            // const phoneValidate = emptyValidate(this.state.inputPhone) || this.state.inputPhoneError ? true : false;
            // const usernameValidate = emptyValidate(this.state.inputUsername) || this.state.inputUsernameError ? true : false;

            if ((!this.state.inputEmailError) && (!this.state.inputPasswordError) &&
                (!this.state.inputPhoneError) && (!this.state.inputUsernameError)) {
                //GOOD TO GO
                resolve(true);
            } else {
                resolve(false);
            }

        })//end of PROMISE
    }//end of validateInput

    signUpPress = async () => {
        const isValid = await this.validateInput();
        if (!isValid) return

        this.startLoading();
        const params = {
            username: this.state.inputUsername.trim().toLowerCase(),
            password: this.state.inputPassword,
            phone: this.state.inputPhone.trim().toLowerCase(),
            email: this.state.inputEmail.trim().toLowerCase(),
        };



        IMSignupAPI.signup(params, this.props).then(() => {
            this.stopLoading();
        }).catch(e => {
            this.stopLoading();
        });


    }//end of signUpPress

    render = () => {
        const { isPortrait, inputEmail, inputEmailError, inputPhone, inputPhoneError, inputPassword, inputPasswordError, inputUsername, inputUsernameError, isKeyboardOpen } = this.state;
        return (
            <View style={[styles.primaryContainer, {
                backgroundColor: colors.get(ColorEnum.name.background),
            }]}>
                <CustomStatusbar />
                {isKeyboardOpen || !isPortrait ?
                    <CustomHeader
                        back
                        backPress={this.backPress}
                        showStepProgress={false} />
                    :
                    <TopCircle
                        back
                        backPress={this.backPress} />
                }
                <ScrollView keyboardShouldPersistTaps='handled'>
                    <KeyboardAvoidingView
                        behavior={"padding"}
                        style={isKeyboardOpen ? styles.contentContainerStyleCenter : {}}>

                        <View style={styles.userNameAboveContainer} />

                        <Text style={[styles.heading, {
                            color: colors.get(ColorEnum.name.heading1),
                            fontSize: FontSize.value(20),
                        }]}>{IMLocalized(`Signup for an account`)}</Text>


                        {/* ******************** EMAIL Start ******************** */}
                        <View style={styles.textInputContainer}>
                            <CustomTextInputMaterial
                                placeholder={IMLocalized(`Email`)}
                                value={inputEmail}
                                onBlur={this.emailBlur}
                                onChangeText={(text) => { this.setState({ inputEmail: text, inputEmailError: false }) }}
                                errorMessage={inputEmailError ? IMLocalized(`Please, enter valid email.`) : ''}
                                keyboardType={"email-address"}
                                leftIcon={() => {
                                    return (
                                        <CustomIcon
                                            iconType={"MaterialCommunityIcons"}
                                            name={"email"}
                                            color={colors.get(ColorEnum.name.mtextinputIcon)}
                                            size={20}
                                            style={styles.textInputLeftIcon} />
                                    )
                                }}
                                style={{

                                }}
                            />
                        </View>

                        {/* ******************** EMAIL End ******************** */}

                        {/* ******************** PHONE NUMBER Start ******************** */}
                        <View style={styles.textInputContainer}>
                            <CustomTextInputMaterial
                                placeholder={IMLocalized(`Phone`)}
                                value={inputPhone}
                                onBlur={this.phoneBlur}
                                onChangeText={(text) => { this.setState({ inputPhone: text, inputPhoneError: false }) }}
                                errorMessage={inputPhoneError ? IMLocalized(`Please, enter valid phone.`) : ''}
                                keyboardType={"phone-pad"}
                                leftIcon={() => {
                                    return (
                                        <CustomIcon
                                            iconType={"MaterialIcons"}
                                            name={"phone"}
                                            color={colors.get(ColorEnum.name.mtextinputIcon)}
                                            size={20}
                                            style={styles.textInputLeftIcon} />
                                    )
                                }}
                                style={{

                                }}
                            />
                        </View>

                        {/* ******************** PHONE NUMBER End ******************** */}

                        {/* ******************** PASSWORD Start ******************** */}
                        <View style={styles.passwordAboveContainer} />
                        <View style={styles.textInputContainer}>
                            <CustomTextInputMaterial
                                placeholder={IMLocalized(`Password`)}
                                value={inputPassword}
                                onBlur={this.passwordBlur}
                                onChangeText={(text) => { this.setState({ inputPassword: text, inputPasswordError: false }) }}
                                errorMessage={inputPasswordError ? IMLocalized(`Please, enter password.`) : ''}
                                maxLength={17}
                                secureTextEntry={Platform.OS === "android" ? this.state.inputPassword.length === 0 ? false : true : true}
                                leftIcon={() => {
                                    return (
                                        <CustomIcon
                                            name={"key-outline"}
                                            color={colors.get(ColorEnum.name.mtextinputIcon)}
                                            size={20}
                                            style={styles.textInputLeftIcon} />
                                    )
                                }}
                                style={{

                                }}
                            />
                        </View>

                        {/* ******************** PASSWORD End ******************** */}

                        {/* ******************** USER NAME Start ******************** */}
                        <View style={styles.textInputContainer}>
                            <CustomTextInputMaterial
                                placeholder={IMLocalized(`Username`)}
                                value={inputUsername}
                                onBlur={this.usernameBlur}
                                onChangeText={(text) => { this.setState({ inputUsername: text, inputUsernameError: false }) }}
                                errorMessage={inputUsernameError ? IMLocalized(`Please, enter valid user name.`) : ''}
                                leftIcon={() => {
                                    return (
                                        <CustomIcon
                                            name={"person"}
                                            color={colors.get(ColorEnum.name.mtextinputIcon)}
                                            size={20}
                                            style={styles.textInputLeftIcon} />
                                    )
                                }}
                                style={{

                                }}
                            />
                        </View>

                        {/* ******************** USER NAME End ******************** */}


                        {/* ******************** LOGIN WITH ACCOUNT BUTTON Start ******************** */}
                        <CustomButton
                            buttonStyle={{
                                marginTop: 36,
                                ...styles.buttonStyle,
                                marginBottom: 20,
                            }}
                            loading={this.state.loading}
                            onPress={this.signUpPress}
                            title={IMLocalized(`Signup`)}
                        />

                        {/* ******************** LOGIN WITH ACCOUNT BUTTON End ******************** */}


                    </KeyboardAvoidingView>
                </ScrollView>
                <KeyboardSpacer />
            </View>
        );
    }//end of RENDER

    emailBlur = async () => {
        let validate = false
        if (Regex.email.test(this.state.inputEmail)) {
            validate = true;
        }

        if (!emptyValidate(this.state.inputEmail) || !validate) {
            this.setState({
                inputEmailError: true
            })
        }
        else {
            this.setState({
                inputEmailError: false
            })
        }
    }//end of emailBlur

    phoneBlur = async () => {
        let validate = false
        if (Regex.pakistanMobileNumber.test(this.state.inputPhone)) {
            validate = true;
        }

        if (!emptyValidate(this.state.inputPhone) || !validate) {
            this.setState({
                inputPhoneError: true
            })
        }
        else {
            this.setState({
                inputPhoneError: false
            })
        }
    }//end of phoneBlur


    passwordBlur = async () => {
        if (!emptyValidate(this.state.inputPassword)) {
            this.setState({
                inputPasswordError: true
            })
        }
        else {
            this.setState({
                inputPasswordError: false
            })
        }
    }//end of passwordBlur

    usernameBlur = async () => {
        let validate = false
        if (Regex.username.test(this.state.inputUsername)) {
            validate = true;
        }

        if (!emptyValidate(this.state.inputUsername) || !validate) {
            this.setState({
                inputUsernameError: true
            })
        }
        else {
            this.setState({
                inputUsernameError: false
            })
        }
    }//end of usernameBlur


}//end of CLASSS index