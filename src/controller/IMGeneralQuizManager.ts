import AppEnum from "../helper/AppEnum";
import appFunctions from "../helper/appFunctions";
import { emptyValidate } from "../helper/genericFunctions";
import Table_Offline from "../LocalDatabase/Table_Offline";
import { IMLocalized } from "../locales/IMLocalization";
import ApiClasses from "../manager/ApiClasses";
import ApiManager from "../manager/ApiManager";
import DateFormatter from "../utils/DateFormatter";

const insertInOffline = async (apiclass: any, param: any, type: any,) => {
    const res: any = await Table_Offline.fetchWithApiClass(apiclass);

    if (res.length > 0) {
        let isExist = false;
        for (let i = 0; i < res.length; i++) {
            const paaa = JSON.parse(res[i].params);
            if (paaa.userID === param.userID && paaa.currentQusId === param.currentQusId) {
                isExist = true;
                return;
            }
        }//end of LOOP

        if (!isExist) {
            console.log(`INSERTED IN OFFLINE SUPPORT`);

            Table_Offline.insert({ params: JSON.stringify(param), apiClass: apiclass, apiType: type });
        }
    }//end of RES LENGTH
    else {
        console.log(`INSERTED IN OFFLINE SUPPORT`);

        Table_Offline.insert({ params: JSON.stringify(param), apiClass: apiclass, apiType: type });
    }
}//end of insertInOffline

export default {

    insertInOffline,

    create(param: any = {}) {
        return new Promise(async (resolve: ({ data: { }, }) => void, reject) => {
            const res = await ApiManager.POST(`${ApiClasses.quizManagerInsert}`, param);
            if (typeof res === "object") {
                if ("internetIssue" in res) {
                    if (res.internetIssue === true) {
                        insertInOffline(ApiClasses.quizManagerInsert, param, "POST");
                        reject(false);
                        return;
                    }
                }
            }//end of IF INTERNET CHECK



            if (res) {
                const isOK = ("status" in res ? res.status : false).toString();
                if (isOK === "true") {
                    const e = res.message;
                    const newData = {
                        id: e.id,
                        quizSessionId: e.data.quizSessionId,
                        userID: e.data.userID,
                        quizId: e.data.quizId,
                        quizStatus: e.data.quizStatus,
                        currentQusId: e.data.currentQusId,
                        quizType: e.data.quizType,
                        quizResult: e.data.quizResult,
                        quizUserScore: e.data.quizUserScore,
                        createdAt: e.data.createdDate,
                        updatedAt: e.data.modifiedDate,
                    };

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
    },//end of  create


    update(param: any = {}) {
        return new Promise(async (resolve: ({ data: { }, status: any }) => void, reject) => {

            const res = await ApiManager.POST(`${ApiClasses.quizManagerUpdate}`, param);
            if (typeof res === "object") {
                if ("internetIssue" in res) {
                    if (res.internetIssue === true) {
                        insertInOffline(ApiClasses.quizManagerUpdate, param, "POST");
                        reject(false);
                        return;
                    }
                }
            }//end of IF INTERNET CHECK

            if (res) {
                const isOK = ("status" in res ? res.status : false).toString();
                if (isOK === "true") {
                    const e = res.message;

                    resolve({
                        data: e,
                        status: quizStatusToName(param.quizStatus)
                    });
                } else {
                    const errorMsg = "message" in res ? res.message : IMLocalized(`Something went wrong!`);
                    appFunctions.errorFlashMessage(errorMsg)
                    reject(false);
                }
            } else {
                reject(false);
            }
        })//end of PROMISE
    },//end of  update

    get() {
        return new Promise(async (resolve: ({ data: [] }) => void, reject) => {

            const userID = await appFunctions.userID();
            const param = {
                userID
            };
            const res = await ApiManager.POST(`${ApiClasses.quizManagerGet}`, param);
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

                    const newData = res.message.reduce(function (filtered, e) {
                        if (e.quizType === AppEnum.GENERAL_CATEGORY_TYPE_NO.MCQ) {
                            const someNewValue = {
                                id: e.id,
                                quizSessionId: e.quizSessionId,
                                userID: e.userID,
                                quizId: e.quizId,
                                quizStatus: e.quizStatus,
                                status: quizStatusToName(e.quizStatus),
                                currentQusID: e.currentQusId,
                                quizType: e.quizType,
                                quizResult: emptyValidate(e.quizResult) ? JSON.parse(e.quizResult) : e.quizResult,
                                quizUserScore: emptyValidate(e.quizUserScore) ? JSON.parse(e.quizUserScore) : e.quizUserScore,
                                createdAt: DateFormatter.dbTimeToTS(e.createdDate),
                                updatedAt: DateFormatter.dbTimeToTS(e.modifiedDate),
                                isOffline: false,
                                pdfLink: e.pdfLink,
                            };

                            filtered.push(someNewValue);
                        }
                        return filtered;
                    }, []);

                    newData.sort(function (a: any, b: any) {
                        const aDT: any = new Date(a.updatedAt);
                        const bDT: any = new Date(b.updatedAt);

                        return bDT - aDT;
                    });
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

    getSpecific(param: any = {}) {
        return new Promise(async (resolve: ({ data: [] }) => void, reject) => {

            const res = await ApiManager.POST(`${ApiClasses.getSpecificQuiz}`, param);
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

                    const myMsg: any = res.message;
                    const newData = myMsg.map(e => ({
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
                    appFunctions.errorFlashMessage(errorMsg)
                    reject(false);
                }
            } else {
                reject(false);
            }
        })//end of PROMISE
    },//end of getSpecific

}//end of EXPORT DEFAULT

export const quizStatusToName = (quizStatus: any) => {
    if (quizStatus === AppEnum.QUIZ_STATUS.Idle) {
        return "Idle";
    } else if (quizStatus === AppEnum.QUIZ_STATUS.done) {
        return "Done";
    } else if (quizStatus === AppEnum.QUIZ_STATUS.inProgress) {
        return "In Progress";
    } else if (quizStatus === AppEnum.QUIZ_STATUS.pause) {
        return "Pause";
    } else if (quizStatus === AppEnum.QUIZ_STATUS.skip) {
        return "Skip";
    } else {
        return "";
    }
}//end of quizStatusToName