import React, { Component } from 'react';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import TopCircle from '../../appComponents/TopCircle';
import CustomButton from '../../components/CustomButton';
import CustomHeader from '../../components/CustomHeader';
import CustomIcon from "../../components/CustomIcon";
import CustomStatusbar from '../../components/CustomStatusbar';
import CustomTextInputMaterial from '../../components/CustomTextInputMaterial';
import KeyboardSpacer from '../../components/KeyboardSpacer';
import ColorEnum from '../../constants/ColorEnum';
import colors from '../../constants/colors';
import LocalAssets from '../../constants/LocalAssets';
import IMLoginAPI from '../../controller/IMLoginAPI';
import genericFunctions, { emptyValidate } from '../../helper/genericFunctions';
import { IMLocalized } from '../../locales/IMLocalization';
import ROUTES from "../../routes/ROUTES";
import { styles } from './styles';
import ENV from "../../utils/ENV";
import { GoogleSignin, GoogleSigninButton, statusCodes, } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import appFunctions from '../../helper/appFunctions';
import AppEnum from '../../helper/AppEnum';
import { Keyboard } from 'react-native';
import Regex from '../../utils/Regex';
import { Dimensions } from 'react-native';
import { Platform } from 'react-native';
//end of IMPORT's

GoogleSignin.configure({
    webClientId: ENV.webClientId,
    offlineAccess: true
});
export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputUsername: __DEV__ ? 'testingaccount@yopmail.com' : '',
            inputUsernameError: false,

            inputPassword: __DEV__ ? '12345678' : '',

            inputPasswordError: false,

            isKeyboardOpen: false,

            loading: false,

            googleLoading: false,

            isPortrait: true,
        };//end of INITIALIZING STATE's
    }//end of CONSTRUCTOR

    isPortrait = () => {
        const dim = Dimensions.get(Platform.OS === "ios" ? 'screen' : 'window');
        return dim.height >= dim.width;
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

    validateEmailAndPassword = () => {
        return new Promise(async (resolve) => {
            await this.emailBlur();
            await this.passwordBlur();

            const { inputUsername, inputUsernameError, inputPassword, inputPasswordError } = this.state;
            if (!emptyValidate(inputUsername) || inputUsernameError || !emptyValidate(inputPassword) || inputPasswordError) {
                if (!emptyValidate(inputUsername) || inputUsernameError) {
                    this.setState({
                        inputUsernameError: true,
                    })
                }
                if (!emptyValidate(inputPassword) || inputPasswordError) {
                    this.setState({
                        inputPasswordError: true
                    })
                }
                resolve(false);
                return;
            } else {
                resolve(true);
            }
        })//end of PROMISE
    }//end of validateEmailAndPassword

    loginWithAccountPress = async () => {
        Keyboard.dismiss();
        const isValid = await this.validateEmailAndPassword();
        if (!isValid) { return }

        this.startLoading();
        const params = {
            email: this.state.inputUsername.trim().toLowerCase(),
            password: this.state.inputPassword,
            type: AppEnum.LOGIN_TYPE.normal,
        };

        IMLoginAPI.login(params, this.props).then(() => {
            this.stopLoading();
        }).catch(e => {
            this.stopLoading();
        });

    }//end of loginWithAccountPress

    render = () => {
        const { inputUsername, inputUsernameError, inputPassword, inputPasswordError, isKeyboardOpen, isPortrait } = this.state;
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
                        {/* ******************** USER NAME Start ******************** */}
                        <View style={styles.textInputContainer}>
                            <CustomTextInputMaterial
                                placeholder={IMLocalized(`Email`)}
                                value={inputUsername}
                                onBlur={this.emailBlur}
                                onChangeText={(text) => { this.setState({ inputUsername: text, inputUsernameError: false }) }}
                                errorMessage={inputUsernameError ? IMLocalized(`Please, enter valid email.`) : ''}
                                keyboardType={"email-address"}
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

                        {/* ******************** PASSWORD Start ******************** */}
                        <View style={styles.passwordAboveContainer} />
                        <View style={styles.textInputContainer}>
                            <CustomTextInputMaterial
                                placeholder={IMLocalized(`Password`)}
                                value={inputPassword}
                                onChangeText={(text) => { this.setState({ inputPassword: text, inputPasswordError: false }) }}
                                errorMessage={inputPasswordError ? IMLocalized(`Please, enter password.`) : ''}
                                onBlur={this.passwordBlur}
                                secureTextEntry={Platform.OS === "android" ? this.state.inputPassword.length === 0 ? false : true : true}
                                leftIcon={() => {
                                    return (
                                        <CustomIcon
                                            name={"key-outline"}
                                            color={"#58595B"}
                                            size={20}
                                            style={styles.textInputLeftIcon} />
                                    )
                                }}
                                style={{

                                }}
                            />
                        </View>

                        {/* ******************** PASSWORD End ******************** */}

                        {/* ******************** LOGIN WITH ACCOUNT BUTTON Start ******************** */}
                        <CustomButton
                            buttonStyle={{
                                marginTop: 36,
                                backgroundColor: "#54C1D5",
                                ...styles.buttonStyle,
                            }}
                            title={IMLocalized(`Login with your Account`)}
                            loading={this.state.loading}
                            // onPress={() => { this.props.navigation.navigate(ROUTES.Selections) }}
                            onPress={this.loginWithAccountPress}
                            iconRight
                            icon={() => {
                                return (
                                    <CustomIcon
                                        iconType={"MaterialIcons"}
                                        name={"exit-to-app"}
                                        color={colors.white}
                                        size={20}
                                        style={styles.buttonIconStyle} />
                                )
                            }}
                        />

                        {/* ******************** LOGIN WITH ACCOUNT BUTTON End ******************** */}

                        {/* ******************** CREATE AN ACCOUNT Start ******************** */}
                        <CustomButton
                            buttonStyle={{ ...styles.buttonStyle, marginBottom: 16, }}
                            onPress={() => { this.props.navigation.navigate(ROUTES.Signup) }}
                            title={IMLocalized(`Create an account`)}
                        />

                        {/* ******************** CREATE AN ACCOUNT End ******************** */}
                        <View style={[styles.separator, {
                            backgroundColor: colors.get(ColorEnum.name.textinputBorder)
                        }]} />

                        {/* ******************** SIGN IN WITH GOOGLE Start ******************** */}
                        <CustomButton
                            buttonStyle={{
                                // marginTop: 36,
                                backgroundColor: "#54C1D5",
                                ...styles.buttonStyle,
                                marginBottom: 20,
                            }}
                            onPress={this.signInWithGoogle}
                            title={IMLocalized(`Sign in with Google`)}
                            loading={this.state.googleLoading}
                            iconRight
                            icon={() => {
                                return (
                                    <FastImage
                                        source={LocalAssets.ICON.google}
                                        style={{
                                            ...styles.buttonIconStyle,
                                            height: 25,
                                            width: 25,
                                            marginLeft: 8,
                                        }}
                                        resizeMode={FastImage.resizeMode.contain} />
                                )
                            }}
                        />

                        {/* ******************** SIGN IN WITH GOOGLE End ******************** */}

                    </KeyboardAvoidingView>
                </ScrollView>
                <KeyboardSpacer />
            </View>
        );
    }//end of RENDER

    signInWithGoogle = async () => {
        this.setState({
            googleLoading: true,
        })
        try {
            await GoogleSignin.hasPlayServices();
            const { idToken } = await GoogleSignin.signIn();



            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            // Sign-in the user with the credential
            const userInfo = await auth().signInWithCredential(googleCredential);
            console.log(`USER LOGIN INFO ===> ${JSON.stringify(userInfo)}`);
            if (userInfo) {
                this.startLoading();
                const params = {
                    email: userInfo.user.email.toLowerCase().trim(),
                    password: null,
                    type: AppEnum.LOGIN_TYPE.google,
                };
                IMLoginAPI.login(params, this.props).then(() => {
                    this.stopLoading();
                    this.setState({ googleLoading: false });
                }).catch(e => {
                    this.setState({ googleLoading: false });
                    this.stopLoading();
                });
            } else {
                this.setState({ googleLoading: false });
            }


        } catch (error) {
            console.log(error);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                appFunctions.errorFlashMessage(IMLocalized(`User cancelled the login flow`));
            } else if (error.code === statusCodes.IN_PROGRESS) {
                appFunctions.errorFlashMessage(IMLocalized(`Operation (e.g. sign in) is in progress already`));
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                appFunctions.errorFlashMessage(IMLocalized(`Play services not available or outdated`));
            } else {
                appFunctions.errorFlashMessage(IMLocalized(`Some other error happened`));
            }
            this.setState({ googleLoading: false });
        }
    };

    emailBlur = async () => {
        let validate = false
        if (Regex.email.test(this.state.inputUsername)) {
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
    }//end of emailBlur

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

}//end of CLASSS index