import sharedPreferences from "../sharedPreferences";
import ApiClasses from "../manager/ApiClasses";
import AsyncStorage from "@react-native-community/async-storage";
import sharedPreferencesKeys from "../sharedPreferences/sharedPreferencesKeys";

export default {
    save(key: any, param: any, data: any) {
        return new Promise(async (resolve) => {
            // console.log(`STORE KEY ==> ${key}`);
            // console.log(`STORE KEY PARAM ==> ${JSON.stringify(param)}`);
            // console.log(`STORE KEY DATA ==> ${JSON.stringify(data)}`);

            const newKey = `${key}${JSON.stringify(param)}`;
            console.log(`STORE NEW KEY ==> ${newKey}`);

            await sharedPreferences.remove(newKey);
            await sharedPreferences.store(newKey, JSON.stringify(data));
            resolve(true);
        })//end of PROMISE
    },//end of save

    get(key: any, param: any) {
        return new Promise(async (resolve) => {
            const newKey = `${key}${JSON.stringify(param)}`;
            console.log(`GET NEW KEY ==> ${newKey}`);

            let res = await sharedPreferences.retrieve(newKey);
            if (res) {
                res = JSON.parse(res);

                // console.log(`${key.toUpperCase()} ===> ${JSON.stringify(res)}`);
                resolve(res);
            } else {
                resolve(false);
            }




        })//end of PROMISE
    },//end of get

    removeAll() {
        return new Promise(async (resolve) => {

            AsyncStorage.getAllKeys()
                .then(keys => {
                    for (let i = 0; i < keys.length; i++) {
                        const key = keys[i];

                        if (key === sharedPreferencesKeys.isAppOpen || key === sharedPreferencesKeys.language ||
                            key === sharedPreferencesKeys.mode || key === sharedPreferencesKeys.fontSize) {


                        } else {
                            sharedPreferences.remove(key);
                        }
                    }//end of LOOP 
                })
                .then(() => { });

            resolve(true);
        })//end of PROMISE
    },//end of 
}//end of EXPORT DEFAULT