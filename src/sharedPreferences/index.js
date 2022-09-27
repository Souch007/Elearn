import AsyncStorage from '@react-native-community/async-storage';

export default {
    store(STORAGE_KEY, value) {
        return new Promise(async (resolve) => {
            try {
                const del = await this.remove(STORAGE_KEY);
                if (del) {
                    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(value));
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            } catch (e) {
                resolve(false);
            }
        })

    },//end of store

    retrieve(STORAGE_KEY) {
        return new Promise(async resolve => {
            try {
                const value = await AsyncStorage.getItem(STORAGE_KEY);

                if (value !== null) {

                    resolve(JSON.parse(value));
                    return;
                }
                resolve(false);
            } catch (e) {
                resolve(false);
            }
        });
    },//end of retrieve

    remove(STORAGE_KEY) {
        return new Promise(async (resolve) => {
            try {
                await AsyncStorage.removeItem(STORAGE_KEY);
                resolve(true);
            } catch (e) {
                resolve(false);
            }
        })

    },//end of remove

}//end of EXPORT DEFAULT