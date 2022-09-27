import AppEnum from "../helper/AppEnum";
import appFunctions from "../helper/appFunctions";
import { emptyValidate } from "../helper/genericFunctions";
import { IMLocalized } from "../locales/IMLocalization";
import ApiClasses from "../manager/ApiClasses";
import ApiManager from "../manager/ApiManager";

const GENERAL_CATEGORY_TYPE = AppEnum.GENERAL_CATEGORY_TYPE;
export default {

    get(type: any = null) {
        return new Promise(async (resolve: ({ data: [], }) => void, reject) => {
            const authToken = await appFunctions.authToken();
            const param = `${ApiClasses.generalQuizCategory}?authToken=${authToken}`;

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
                    if (!emptyValidate(type)) {
                        const newData = res.message.map(e => ({
                            id: e.id,
                            orderNo: e.order_no,
                            name: e.name,
                            image: e.imgpth,
                            type: e.type,
                            createdAt: e.createdDate,
                            updatedAt: e.modifiedDate,
                        }));
                        resolve({ data: newData });
                    } else {
                        if (type === GENERAL_CATEGORY_TYPE.MCQ) {
                            const newData = res.message.reduce(function (filtered, e) {
                                if (e.type === GENERAL_CATEGORY_TYPE.MCQ) {
                                    const someNewValue = {
                                        id: e.id,
                                        orderNo: e.order_no,
                                        name: e.name,
                                        image: e.imgpth,
                                        type: e.type,
                                        createdAt: e.createdDate,
                                        updatedAt: e.modifiedDate,
                                    };
                                    filtered.push(someNewValue);
                                }
                                return filtered;
                            }, []);
                            resolve({ data: newData });
                        } else if (type === GENERAL_CATEGORY_TYPE.Short) {
                            const newData = res.message.reduce(function (filtered, e) {
                                if (e.type === GENERAL_CATEGORY_TYPE.Short) {
                                    const someNewValue = {
                                        id: e.id,
                                        orderNo: e.order_no,
                                        name: e.name,
                                        image: e.imgpth,
                                        type: e.type,
                                        createdAt: e.createdDate,
                                        updatedAt: e.modifiedDate,
                                    };
                                    filtered.push(someNewValue);
                                }
                                return filtered;
                            }, []);
                            resolve({ data: newData });
                        } else if (type === GENERAL_CATEGORY_TYPE.Long) {
                            const newData = res.message.reduce(function (filtered, e) {
                                if (e.type === GENERAL_CATEGORY_TYPE.Long) {
                                    const someNewValue = {
                                        id: e.id,
                                        orderNo: e.order_no,
                                        name: e.name,
                                        image: e.imgpth,
                                        type: e.type,
                                        createdAt: e.createdDate,
                                        updatedAt: e.modifiedDate,
                                    };
                                    filtered.push(someNewValue);
                                }
                                return filtered;
                            }, []);
                            resolve({ data: newData });
                        } else {
                            const newData = res.message.reduce(function (filtered, e) {
                                if (e.type === GENERAL_CATEGORY_TYPE.MCQ) {
                                    const someNewValue = {
                                        id: e.id,
                                        orderNo: e.order_no,
                                        name: e.name,
                                        image: e.imgpth,
                                        type: e.type,
                                        createdAt: e.createdDate,
                                        updatedAt: e.modifiedDate,
                                    };
                                    filtered.push(someNewValue);
                                }
                                return filtered;
                            }, []);
                            resolve({ data: newData });
                        }

                    }



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

}//end of EXPORT DEFAULT