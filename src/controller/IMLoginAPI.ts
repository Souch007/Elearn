import appFunctions from "../helper/appFunctions";
import { IMLocalized } from "../locales/IMLocalization";
import ApiClasses from "../manager/ApiClasses";
import ApiManager from "../manager/ApiManager";
import sharedPreferences from "../sharedPreferences";
import sharedPreferencesKeys from "../sharedPreferences/sharedPreferencesKeys";

export default {
    login(param: any = {}, props: any) {
        return new Promise(async (resolve, reject) => {
            const res = await ApiManager.POST(ApiClasses.login, param, {}, true, false);
            if (typeof res === "object") {
                if ("internetIssue" in res) {
                    if (res.internetIssue === true) {
                        reject(false);
                        return;
                    }
                }
            }//end of IF INTERNET CHECK

            if (res) {
                const isOK = ("status" in res ? res.status : false).toString();
                if (isOK === "true") {

                    const successMsg = IMLocalized(`User Login Successfully`);
                    appFunctions.successFlashMessage(successMsg);

                    sharedPreferences.store(sharedPreferencesKeys.currentUser, res.message);

                    appFunctions.setAuthToken(res.message.authToken);
                    appFunctions.setUserID(res.message.id);

                    props.setIsLoggedIn(true);
                    resolve(true);
                } else {
                    const errorMsg = "message" in res ? res.message : IMLocalized(`Something went wrong!`);
                    appFunctions.errorFlashMessage(errorMsg);
                    reject(false);
                }
            } else {
                reject(false);
            }

        })//end of PROMISE
    },//end of LOGIN 

}//end of EXPORT DEFAULT