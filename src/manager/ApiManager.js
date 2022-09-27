import NetInfo from "@react-native-community/netinfo";
import { Platform } from "react-native";
import appFunctions from "../helper/appFunctions";
import { emptyValidate } from "../helper/genericFunctions";
import { IMLocalized } from "../locales/IMLocalization";
import ENV from "../utils/ENV";
import OfflineApiManager from "./OfflineApiManager";

const InternetCheck = () => {
    return new Promise(async resolve => {
        NetInfo.fetch().then(state => {
            if (
                (state.isConnected && state.isInternetReachable) ||
                state.isInternetReachable === null
            ) {
                resolve(true);
                return;
            } else {
                if (!state.isConnected) {

                    resolve(false);
                    return;
                } else if (!state.isInternetReachable) {
                    resolve(false);
                    return;
                } else {

                    resolve(false);
                    return;
                }
            }
        });
    })//end of PROMISE

}//end of InternetCheck

const InternetCheckWithShowError = () => {
    return new Promise(async resolve => {
        NetInfo.fetch().then(state => {
            if (
                (state.isConnected && state.isInternetReachable) ||
                state.isInternetReachable === null
            ) {
                resolve(true);
                return;
            } else {
                if (!state.isConnected) {
                    appFunctions.errorFlashMessage(IMLocalized(`Internet is not connected!`));

                    resolve(false);
                    return;
                } else if (!state.isInternetReachable) {
                    appFunctions.errorFlashMessage(IMLocalized(`Internet is not reachable!`));
                    resolve(false);
                    return;
                } else {
                    appFunctions.errorFlashMessage(IMLocalized(`Something went wrong with your Internet Connection!`));

                    resolve(false);
                    return;
                }
            }
        });
    })//end of PROMISE

}//end of InternetCheckWithShowError

let isDebug = false;

export default {
    enableDebug() {
        isDebug = true;
    },
    disableDebug() {
        isDebug = false;
    },
    GET(classes, header, json = false) {
        return new Promise(async resolve => {
            const internet = await InternetCheck();
            if (!internet) {
                const offlineData = await OfflineApiManager.get(classes.split('?')[0], classes.split('?')[1]);
                if (offlineData) {
                    resolve(offlineData);
                } else {
                    InternetCheckWithShowError();
                    resolve({ internetIssue: true });
                }
                return;
            }



            const urlHeader = await urlHeaderCreation(classes, header);


            if (isDebug) {
                console.log(`\n\n\n`);
                console.warn(`***************** PARAMETERS AND HEADER FOR ${classes} START ***********************\n `);
                console.log(`URL==>\t${urlHeader.url}\n`);
                console.log(`HEADER==>\t${JSON.stringify(urlHeader.header)}\n`);

                console.warn(`***************** PARAMETERS AND HEADER FOR ${classes} END ***********************\n `);

                console.log(`\n`);
            }

            fetch(urlHeader.url, {
                method: 'GET',
                headers: urlHeader.header,
            })
                .then(response => response.json())
                .then(async responseJson => {
                    if (isDebug) {
                        console.log(`GET RESPONSE FOR ${classes} IS ===> ${JSON.stringify(responseJson)}`);
                        console.log(`\n\n\n`);
                    }
                    if ("exception" in responseJson) {
                        const errMsg = "message" in responseJson ? emptyValidate(responseJson.message) ? responseJson.message : IMLocalized(`Something went wrong!`) : IMLocalized(`Something went wrong!`);
                        appFunctions.errorFlashMessage(errMsg);
                        resolve(false);
                        return;
                    }

                    if (responseJson) {
                        const isOK = ("status" in responseJson ? responseJson.status : false).toString();
                        if (isOK === "true") {
                            OfflineApiManager.save(classes.split('?')[0], classes.split('?')[1], responseJson);
                        }
                    }


                    resolve(responseJson);
                })
                .catch(error => {
                    if (!json) {
                        catchErrorHandle(classes, error);
                    }
                    console.log('ERROR', error);
                    appFunctions.errorFlashMessage('Something went wrong!')
                    resolve(undefined);
                }); //end of fetch
        }); //end of Promise
    }, //end of _fetchGet

    POST(classes, param, header, json = false, useAuth = true) {
        return new Promise(async resolve => {
            if (useAuth) {
                if (typeof param === "object") {
                    const authToken = await appFunctions.authToken();
                    param["authToken"] = authToken;
                }
            }

            const internet = await InternetCheck();
            if (!internet) {
                const offlineData = await OfflineApiManager.get(classes, param);
                if (offlineData) {
                    resolve(offlineData);
                } else {
                    InternetCheckWithShowError();
                    resolve({ internetIssue: true });
                }
                return;
            }


            const urlHeader = await urlHeaderCreation(classes, header);


            if (isDebug) {
                console.log(`\n\n\n`);
                console.warn(`***************** PARAMETERS AND HEADER FOR ${classes} START ***********************\n `);
                console.log(`URL==>\t${urlHeader.url}\n`);
                console.log(`HEADER==>\t${JSON.stringify(urlHeader.header)}\n`);


                console.log(`PARAMETERS==>\t${JSON.stringify(param)}\n`);

                console.warn(`***************** PARAMETERS AND HEADER FOR ${classes} END ***********************\n `);

                console.log(`\n`);
            }


            let formData = new FormData();;
            if (Array.isArray(param)) {
                params.forEach(function (item) {
                    Object.keys(item).forEach(function (key) {
                        formData.append(key, item[key]);
                    });
                });
                if (Platform.OS === "android") {
                    urlHeader.header["Content-Type"] = "multipart/form-data";
                }
            } else if (typeof formData === "object") {
                for (var key in param) {
                    formData.append(key, param[key]);
                }
                if (Platform.OS === "android") {
                    urlHeader.header["Content-Type"] = "multipart/form-data";
                }
            } else {
                formData = null;
                formData = param;
            }



            fetch(urlHeader.url, {
                method: 'POST',
                headers: urlHeader.header,
                body: formData,
            })
                .then(response => response.json())
                .then(async responseJson => {
                    if (isDebug) {
                        console.log(`POST RESPONSE FOR ${classes} IS ===> ${JSON.stringify(responseJson)}`);
                        console.log(`\n\n\n`);
                    }
                    if ("exception" in responseJson) {
                        const errMsg = "message" in responseJson ? emptyValidate(responseJson.message) ? responseJson.message : IMLocalized(`Something went wrong!`) : IMLocalized(`Something went wrong!`);
                        appFunctions.errorFlashMessage(errMsg);
                        resolve(false);
                        return;
                    }

                    if (responseJson) {
                        const isOK = ("status" in responseJson ? responseJson.status : false).toString();
                        if (isOK === "true") {
                            OfflineApiManager.save(classes, param, responseJson);
                        }
                    }

                    resolve(responseJson);
                })
                .catch(error => {
                    if (!json) {
                        catchErrorHandle(classes, error);
                    }
                    appFunctions.errorFlashMessage('Something went wrong!')
                    console.log('ERROR', error);

                    resolve(undefined);
                }); //end of fetch
        }); //end of Promise
    },//end of _fetchPost

    PUT(classes, param, header, json = false) {
        return new Promise(async resolve => {
            const internet = await InternetCheck();
            if (!internet) {
                resolve({ internetIssue: true });
                return;
            }

            const urlHeader = await urlHeaderCreation(classes, header);


            if (isDebug) {
                console.log(`\n\n\n`);
                console.warn(`***************** PARAMETERS AND HEADER FOR ${classes} START ***********************\n `);
                console.log(`URL==>\t${urlHeader.url}\n`);
                console.log(`HEADER==>\t${JSON.stringify(urlHeader.header)}\n`);


                console.log(`PARAMETERS==>\t${JSON.stringify(param)}\n`);

                console.warn(`***************** PARAMETERS AND HEADER FOR ${classes} END ***********************\n `);

                console.log(`\n`);
            }

            fetch(urlHeader.url, {
                method: 'PUT',
                headers: urlHeader.header,
                body: JSON.stringify(param),
            })
                .then(response => response.json())
                .then(async responseJson => {

                    if (isDebug) {
                        console.log(`PUT RESPONSE FOR ${classes} IS ===> ${JSON.stringify(responseJson)}`);
                        console.log(`\n\n\n`);
                    }

                    if ("exception" in responseJson) {
                        const errMsg = "message" in responseJson ? emptyValidate(responseJson.message) ? responseJson.message : IMLocalized(`Something went wrong!`) : IMLocalized(`Something went wrong!`);
                        appFunctions.errorFlashMessage(errMsg);
                        resolve(false);
                        return;
                    }
                    resolve(responseJson);
                })
                .catch(error => {
                    if (!json) {
                        catchErrorHandle(classes, error);
                    }
                    console.log('ERROR', error);

                    resolve(undefined);
                }); //end of fetch
        }); //end of Promise
    }, //end of _fetchPut

}//end of API MANAGER



async function catchErrorHandle(classes, error) {
    return new Promise(resolve => {
        if (error.toString().includes('Error: Request failed with status code 401')) {
            resolve(undefined);
            return;
        } else {
            console.log(classes + ' Error By Catch==>\n' + error);
            if (error.message.includes("JSON Parse error: Unrecognized token '<'")) {
                resolve(undefined);
                console.log(error.toString(), '');
                return;
            }


            resolve(undefined);

            console.log(error.toString(), '');
            return;
        }
    });
}

function urlHeaderCreation(classes, header) {
    return new Promise(async resolve => {
        let response = {};
        let url_ = null;
        let header_ = null;

        if (!!classes) {
            if (ENV.ENVIRONMENT == 'production') {
                if (isDebug) {
                    console.log('PROD_API_URL USING URL HEADER CREATION', ENV.PROD_API_URL);
                }

                url_ = ENV.PROD_API_URL + classes
            }
            else {
                if (isDebug) {
                    console.log('DEV_API_URL', ENV.DEV_API_URL);
                }
                url_ = ENV.DEV_API_URL + classes
            }
            if (emptyValidate(ENV.APP_KEY)) {
                header_ = {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'APP_KEY': ENV.APP_KEY,
                };
            } else {
                header_ = {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                };
            }



            if (!!header) {
                for (let i = 0; i < header.length; i++) {
                    const key = Object.keys(header[i]);
                    const values = Object.values(header[i]);
                    header_[key[0]] = values[0];
                }
            }
            response['url'] = url_;
            response['header'] = header_;

            resolve(response);
        } else {
            console.log('API url is not valid!');
            resolve();
        }
    });
}