import appFunctions from "../helper/appFunctions";
import { IMLocalized } from "../locales/IMLocalization";
import ApiClasses from "../manager/ApiClasses";
import ApiManager from "../manager/ApiManager";

export default {

    getAllData() {
        return new Promise(async (resolve: ({ subjectData: [], gradeData: [], schoolData: [] }) => void, reject) => {
            const authToken = await appFunctions.authToken();
            if (!authToken) { this.stopLoading(); return }

            const res = await ApiManager.GET(`${ApiClasses.getData}?authToken=${authToken}`);
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
                    resolve({
                        subjectData: res.message.subject,
                        gradeData: res.message.grade,
                        schoolData: res.message.school,
                    })
                } else {
                    const errorMsg = "message" in res ? res.message : IMLocalized(`Something went wrong!`);
                    appFunctions.errorFlashMessage(errorMsg);
                    reject(false);
                }
            } else {
                reject(false);
            }
        })//end of PROMISE
    },//end of  getAllData

}//end of EXPORT DEFAULT