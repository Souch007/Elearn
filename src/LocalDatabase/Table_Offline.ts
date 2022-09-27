import { Platform } from "react-native";
import { createTable, addRecord, deleteTable, tableCheck, recordFetch, updateRecord } from "../SqlLite/DB";

const TABLE_NAME = "OfflineSupport";

const COL_PARAMS = "params";
const COL_API_CLASS = "apiClass";
const COL_TYPE = "apiType";
const CREATED_AT_CLASS = "createdAt";
const UPDATE_AT_TYPE = "updatedAt";

export interface OFFLINE_INTERFACE {
    id?: any;
    params?: any;
    apiClass?: any;
    apiType?: any;
}

export const OFFLINE_INTERFACE_EMPTY_OBJ = {
    id: '',
    params: '',
    apiClass: '',
    apiType: '',
}

export default {
    createTable() {
        return new Promise(async resolve => {
            let columns = [];
            columns.push({
                "name": COL_PARAMS,
                "type": "text"
            }, {
                "name": COL_API_CLASS,
                "type": "text"
            }, {
                "name": COL_TYPE,
                "type": "text"
            });
            const res = await createTable(TABLE_NAME, columns);
            resolve(res);
        });
    },//end of FUNCTION CREATE_TABLE

    checkTable() {
        return new Promise(async resolve => {
            const res = await tableCheck(TABLE_NAME);
            resolve(res);
        });
    },//end of FUNCTION CHECK_TABLE

    insert(values: OFFLINE_INTERFACE) {
        return new Promise(async resolve => {
            let data = [];
            data.push({
                "columnName": COL_PARAMS,
                "columnValue": values.params
            }, {
                "columnName": COL_API_CLASS,
                "columnValue": values.apiClass
            }, {
                "columnName": COL_TYPE,
                "columnValue": values.apiType
            });
            const res = await addRecord(TABLE_NAME, data);
            resolve(res);
        });
    },//end of FUNCTION ADD

    update(id: any, values: OFFLINE_INTERFACE) {
        return new Promise(async resolve => {
            let data = [];
            data.push({
                "columnName": COL_PARAMS,
                "columnValue": values.params
            }, {
                "columnName": COL_API_CLASS,
                "columnValue": values.apiClass
            }, {
                "columnName": COL_TYPE,
                "columnValue": values.apiType
            });
            const res = await updateRecord(TABLE_NAME, data, id);

            resolve(res);
        });
    },//end of update

    fetchAll() {
        return new Promise(async resolve => {
            let data: any = [];
            let newQuery = `select * from ${TABLE_NAME}`;

            const res: any = await recordFetch(newQuery);
            if (res) {
                const len = res.rows.length;

                for (let i = 0; i < len; i++) {
                    const row = res.rows.item(i);
                    const { id, params, apiClass, apiType, createdAt, updatedAt } = row;
                    data.push({ id, params, apiClass, apiType, createdAt, updatedAt });
                }//end of LOOP
            }
            resolve(data);

        });
    },//end of FUNCTION FETCH_ALL

    fetchWithApiClass(apiClass: any) {
        return new Promise(async resolve => {
            let data: any = [];
            let newQuery = `select * from ${TABLE_NAME} where ${COL_API_CLASS}='${apiClass}'`;

            const res: any = await recordFetch(newQuery);
            if (res) {
                const len = res.rows.length;

                for (let i = 0; i < len; i++) {
                    const row = res.rows.item(i);
                    const { id, params, apiClass, apiType, createdAt, updatedAt } = row;
                    data.push({ id, params, apiClass, apiType, createdAt, updatedAt });
                }//end of LOOP
            }
            resolve(data);

        });//end of PROMISE
    },//end of fetchWithApiClass

    removeRow(id: any) {
        return new Promise(async resolve => {

            let newQuery = `DELETE FROM ${TABLE_NAME} where id='${id}'`;

            const res: any = await recordFetch(newQuery);
            if (res) {
                console.log('res', res);

            }
            resolve(true);

        });//end of PROMISE
    },//end of removeRow

    clearTable() {
        return new Promise(async resolve => {
            let newQuery = `DELETE FROM ${TABLE_NAME}`;
            await recordFetch(newQuery);
            resolve(true);
        });
    },//end of clearTable

    delete() {
        return new Promise(async resolve => {
            const res = await deleteTable(TABLE_NAME);
            resolve(res)
        });
    }//end of FUNCTION DELETE

}//end of EXPORT DEFAULT