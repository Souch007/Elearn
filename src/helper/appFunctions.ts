import { showMessage } from "react-native-flash-message";
import { IMLocalized } from "../locales/IMLocalization";
import sharedPreferences from "../sharedPreferences";
import sharedPreferencesKeys from "../sharedPreferences/sharedPreferencesKeys";
import GV from "../utils/GV";
import AppEnum from "./AppEnum";
import genericFunctions, { emptyValidate } from "./genericFunctions";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import OfflineApiManager from "../manager/OfflineApiManager";

// type attribute 
// "success" (green),
// "warning" (orange),
// "danger" (red),
// "info" (blue),
// "default" (gray)

export default {
    warningFlashMessage(message = '', description = '') {
        showMessage({
            message: IMLocalized(`${message}`),
            description: IMLocalized(`${description}`),
            type: "warning",
        });
    },//end of warningFlashMessage

    successFlashMessage(message = '', description = '') {
        showMessage({
            message: IMLocalized(`${message}`),
            description: IMLocalized(`${description}`),
            type: "success",
        });
    },//end of flashMessageTest

    errorFlashMessage(message = 'Something went wrong!', description = '') {
        showMessage({
            message: IMLocalized(`${message}`),
            description: IMLocalized(`${description}`),
            type: "danger",
        });
    },//end of flashMessageTest

    formatAMPM(date: any) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    },//end of formatAMPM

    userID() {
        return new Promise(async (resolve) => {
            if (GV.userID !== null) {
                resolve(GV.userID);
                return;
            }

            const currentUser = await sharedPreferences.retrieve(sharedPreferencesKeys.currentUser);
            if (currentUser) {
                GV.userID = currentUser.id;
                resolve(GV.userID)
            } else {
                userLogout();
                resolve(-1);
            }

        })//end of PROMISE
    },//end of USERID

    setAuthToken(authToken: any = null) {
        GV.authToken = authToken;
    },//end of setAuthToken

    setUserID(userID: any = null) {
        GV.userID = userID;
    },//end of setUserID

    authToken() {
        return new Promise(async (resolve) => {
            if (GV.authToken !== null) {
                resolve(GV.authToken);
                return;
            }

            const currentUser = await sharedPreferences.retrieve(sharedPreferencesKeys.currentUser);
            if (currentUser) {
                GV.authToken = currentUser.authToken;
                resolve(GV.authToken)
            } else {
                userLogout();
                showMessage({
                    message: IMLocalized(`Authentication failed!`),
                    description: IMLocalized(`Authentication failed. Please login again.`),
                    type: "danger",
                });
                resolve(false);
            }

        })//end of PROMISE
    },//end of authToken

    logout() {
        userLogout();
    },//end of logout

    createParamID(id) {
        return emptyValidate(id) ? id : null;
    },//end of createParamID

    createGradeNumber(text) {
        const isNumeric = genericFunctions.isNumeric(text);
        if (isNumeric) {
            return {
                isNumeric: true,
                text: GV.isRTL ? genericFunctions.englishToArabicNumber(text) : parseInt(text),
            };
        } else {
            return {
                isNumeric: false,
                text: text,
            };
        }
    },//end of createGradeNumber

    async changeMode(value) {
        await sharedPreferences.remove(sharedPreferencesKeys.mode);

        await sharedPreferences.store(sharedPreferencesKeys.mode, value);

    },//end of changeMode

    getAppMode() {
        return new Promise(async (resolve: ({ value: APP_MODE_INTERFACE }) => void) => {
            const res = await sharedPreferences.retrieve(sharedPreferencesKeys.mode);
            if (res) {
                if (res === AppEnum.APP_MODE.dark) {
                    resolve({ value: AppEnum.APP_MODE.dark })
                } else {
                    resolve({ value: AppEnum.APP_MODE.light })
                }
            } else {
                resolve({ value: AppEnum.APP_MODE.light })
            }
        })//end of PROMISE
    },//end of getAppMode

    getModeBool() {
        return new Promise(async (resolve: ({ value: boolean }) => void) => {
            const res = await sharedPreferences.retrieve(sharedPreferencesKeys.mode);
            if (res) {
                if (res === AppEnum.APP_MODE.dark) {
                    resolve({ value: true })
                } else {
                    resolve({ value: false })
                }
            } else {
                resolve({ value: false })
            }
        })//end of PROMISE
    },//end of getModeBool

    async changeFontSize(value: any) {
        await sharedPreferences.remove(sharedPreferencesKeys.fontSize);

        await sharedPreferences.store(sharedPreferencesKeys.fontSize, value);
    },//end of changeFontSize

    getFontSize() {
        return new Promise(async (resolve: ({ value: number }) => void) => {
            const res = await sharedPreferences.retrieve(sharedPreferencesKeys.fontSize);
            if (res) {
                resolve({ value: parseInt(res) });
            } else {
                resolve({ value: 12 })
            }
        })//end of PROMISE
    },//end of getFontSize



}//end of EXPORT DEFAULT

interface APP_MODE_INTERFACE {
    dark: "Dark",
    light: "Light"
}

const userLogout = async () => {
    if (GV.routeClass !== null) {
        const currentUser = await sharedPreferences.retrieve(sharedPreferencesKeys.currentUser);


        if (currentUser) {
            const type = "type" in currentUser ? emptyValidate(currentUser.type) ? currentUser.type.toLowerCase() : "na" : "na"
            if (type === AppEnum.LOGIN_TYPE.google.toLowerCase().trim()) {
                try {
                    await GoogleSignin.revokeAccess();
                    await GoogleSignin.signOut();
                } catch (error) {
                    console.error(error);
                }
            }
        }

        logoutRest();

    }
}//end of userLogout

const logoutRest = async () => {
    OfflineApiManager.removeAll();
    await sharedPreferences.remove(sharedPreferencesKeys.currentUser);
    GV.userID = null;
    GV.authToken = null;

    GV.routeClass.setIsLoggedIn(false);

}//end of logoutRest