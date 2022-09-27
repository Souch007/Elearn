import appFunctions from "../helper/appFunctions";
import { IMLocalized } from "../locales/IMLocalization";
import ApiClasses from "../manager/ApiClasses";
import ApiManager from "../manager/ApiManager";
import sharedPreferences from "../sharedPreferences";
import sharedPreferencesKeys from "../sharedPreferences/sharedPreferencesKeys";

export default {

    signup(param: any = {}, props: any) {
        return new Promise(async (resolve, reject) => {
            console.log(`PARMS FOR SIGNUP ARE ====> ${JSON.stringify(param)}\n\n`);

            const res = await ApiManager.POST(ApiClasses.signup, param, {}, true, false);
            if (typeof res === "object") {
                if ("internetIssue" in res) {
                    if (res.internetIssue === true) {
                        reject(false);
                        return;
                    }
                }
            }//end of IF INTERNET CHECK
            console.log('res', res);

            if (res) {
                const isOK = ("status" in res ? res.status : false).toString();
                if (isOK === "true") {

                    const successMsg = IMLocalized(`User Signup Successfully`);
                    appFunctions.successFlashMessage(successMsg);
                    const myData = {
                        ...res.message.data,
                        id: res.message.id,
                    }
                    sharedPreferences.store(sharedPreferencesKeys.currentUser, myData);

                    appFunctions.setAuthToken(res.message.data.authToken);
                    appFunctions.setUserID(res.message.data.id);

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
    },//end of  signup


}//end of EXPORT DEFAULT


// const res = await ApiManager.POST(ApiClasses.signup, params);


// if (res) {
//     const isOK = ("status" in res ? res.status : false).toString();
//     if (isOK === "true") {
//         const successMsg = IMLocalized(`User Signup Successfully.`);
//         appFunctions.successFlashMessage(successMsg);
//         const dataa = {
//             id: res.message.id,
//             ...res.message.data
//         }
//         sharedPreferences.store(sharedPreferencesKeys.currentUser, dataa);
//         this.props.setIsLoggedIn(true);

//     } else {
//         const errorMsg = "message" in res ? res.message : IMLocalized(`Something went wrong!`);
//         appFunctions.errorFlashMessage(errorMsg)
//     }
// }