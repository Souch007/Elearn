import appFunctions from "../helper/appFunctions";
import { IMLocalized } from "../locales/IMLocalization";
import ApiClasses from "../manager/ApiClasses";
import ApiManager from "../manager/ApiManager";
import GV from "../utils/GV";
import AppEnum from "../helper/AppEnum";
import ENV from "../utils/ENV";

export default {
    get(param: any = {}) {
        return new Promise(async (resolve: ({ data: [], }) => void, reject) => {
            param["type"] = GV.isRTL ? AppEnum.API_LANGUAGE_TYPE.Urdu : AppEnum.API_LANGUAGE_TYPE.English;

            const res = await ApiManager.POST(`${ApiClasses.allTextbooks}`, param);
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
                        id: e.id,
                        title: e.title,
                        languageType: e.type,
                        path: `${ENV.BASE_URL}${e.path.split('./')[1]}`,
                        topicID: e.topic_id,

                        createdAt: e.createdDate,
                        updatedAt: e.modifiedDate,
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