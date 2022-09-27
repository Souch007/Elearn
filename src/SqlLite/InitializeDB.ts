import Table_Offline from "../LocalDatabase/Table_Offline";
import ClearDB from "./ClearDB";
import { deleteDatabase } from "./DB";

export default {
    init() {
        return new Promise(async resolve => {
            Table_Offline.createTable();
            resolve(true);
        });
    },//end of FUNCTION init

    initWithDelete() {
        return new Promise(async resolve => {
            resolve(true);
        });
    }//end of FUNCTION initWithDelete
}//end of EXPORT DEFAULT