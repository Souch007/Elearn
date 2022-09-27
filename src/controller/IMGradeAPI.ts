import appFunctions from "../helper/appFunctions";
import { IMLocalized } from "../locales/IMLocalization";
import ApiClasses from "../manager/ApiClasses";
import ApiManager from "../manager/ApiManager";

export default {


    get(param: any = {}) {
        return new Promise(async (resolve: ({ data: [], }) => void, reject) => {
            const res = await ApiManager.POST(`${ApiClasses.getGrades}`, param);
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
                    const newData = res.message.map(e => ({
                        selected: false,
                        title: e.name,
                        image: e.imgpth,
                        id: e.id,
                        schoolID: e.school_id,
                    }));

                    resolve({ data: newData });
                } else {
                    const errorMsg = "message" in res ? res.message : IMLocalized(`Something went wrong!`);
                    appFunctions.errorFlashMessage(errorMsg)
                    reject(false);
                }
            } else {
                reject(false);
            }
        })//end of PROMISE
    },//end of  get

}//end of EXPORT DEFAULT