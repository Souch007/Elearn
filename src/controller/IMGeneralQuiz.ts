import AppEnum from "../helper/AppEnum";
import appFunctions from "../helper/appFunctions";
import { emptyValidate } from "../helper/genericFunctions";
import { IMLocalized } from "../locales/IMLocalization";
import ApiClasses from "../manager/ApiClasses";
import ApiManager from "../manager/ApiManager";

export default {

    getMCQ(categoryID: any = null) {
        return new Promise(async (resolve: ({ data: [], }) => void, reject) => {
            const authToken = await appFunctions.authToken();
            const param = `${ApiClasses.generalQuizMCQ}?category_id=${categoryID}&authToken=${authToken}`;

            const res = await ApiManager.GET(param);
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
                        question: e.question,
                        options: [{
                            id: 1,
                            option: e.A,
                            selected: false,
                        }, {
                            id: 2,
                            option: e.B,
                            selected: false,
                        }, {
                            id: 3,
                            option: e.C,
                            selected: false,
                        }, {
                            id: 4,
                            option: e.D,
                            selected: false,
                        }],

                        rightAnswer: e.RightAnswer,
                        score: e.score,
                        categoryID: e.category_id,
                        createdAt: e.createdDate,
                        updatedAt: e.modifiedDate,
                        wscore: e.wscore,
                        isActive: e.is_active,
                    }));
                    resolve({ data: newData });


                } else {
                    const errorMsg = "message" in res ? res.message : IMLocalized(`Something went wrong!`);
                    appFunctions.errorFlashMessage(errorMsg);
                    reject(false);
                }
            } else {
                reject(false);
            }
        })//end of PROMISE
    },//end of  get

    getQuestion(categoryID: any = null, type: any = AppEnum.GENERAL_CATEGORY_TYPE.Short) {
        return new Promise(async (resolve: ({ data: [], }) => void, reject) => {
            const authToken = await appFunctions.authToken();
            const param = type === AppEnum.GENERAL_CATEGORY_TYPE.Short ?
                `${ApiClasses.generalQuizShort}?category_id=${categoryID}&authToken=${authToken}`
                :
                `${ApiClasses.generalQuizLong}?category_id=${categoryID}&authToken=${authToken}`;

            const res = await ApiManager.GET(param);
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
                        question: e.question,
                        answers: e.ans,
                        rightAnswer: e.right_ans,
                        score: e.score,
                        categoryID: e.category_id,
                        createdAt: e.createdDate,
                        updatedAt: e.modifiedDate,
                        type: e.type,
                        isActive: e.is_active,
                    }));
                    resolve({ data: newData });


                } else {
                    const errorMsg = "message" in res ? res.message : IMLocalized(`Something went wrong!`);
                    appFunctions.errorFlashMessage(errorMsg);
                    reject(false);
                }
            } else {
                reject(false);
            }
        })//end of PROMISE
    },//end of  getQuestion

}//end of EXPORT DEFAULT