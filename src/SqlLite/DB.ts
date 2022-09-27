import SQLite from "react-native-sqlite-storage";

SQLite.DEBUG(false);
SQLite.enablePromise(true);

const database_name = "ananas.db";
const database_version = "1.0";
const database_displayname = "Ananas";
const database_size = 200000;

let db: any = null;

function initDB() {
    return new Promise(resolve => {
        if (db) {
            resolve(db);
            return;
        }
        //@ts-ignore
        SQLite.echoTest()
            .then(() => {
                //@ts-ignore
                SQLite.openDatabase(
                    database_name,
                    database_version,
                    database_displayname,
                    //@ts-ignore
                    database_size
                )
                    .then((DB: any) => {
                        db = DB;

                        resolve(db);
                    })
                    .catch((error: any) => {
                        resolve(false);
                        console.warn("Failed=>\n", error);
                    });
            })
            .catch((error: any) => {
                resolve(false);
                console.warn("echoTest failed - plugin not functional");
            });
    });
}

function closeDatabase(db: any) {
    if (db) {
        db.close()
            .then((status: any) => { })
            .catch((error: any) => { });
    } else {
        console.warn("Database was not OPENED");
    }
}

//create Table usage
// let columns = [];
// columns.push({
//     "name": "username",
//     "type": "text"
// }, {
//     "name": "password",
//     "type": "text"
// });
// createTable("tableName", columns)

export const createTable = (tableName: any, columns: any) => {
    return new Promise(resolve => {
        let columnCreation = "";
        for (let i = 0; i < columns.length; i++) {
            if (typeof columns[i]["name"] === "undefined") {
                console.error(`Didn't find 'NAME' at ${i} index`);
            }
            else if (typeof columns[i]["type"] === "undefined") {
                console.error(`Didn't find 'TYPE' at ${i} index`);
            }
            else {
                let name = columns[i]["name"];
                let type = columns[i]["type"];
                columnCreation += name + " " + type + ",";
            }
        }
        let query = `CREATE TABLE IF NOT EXISTS  ${tableName} (id INTEGER PRIMARY KEY AUTOINCREMENT, createdAt TEXT, updatedAt TEXT, ${columnCreation}`;
        query = query.replace(/,\s*$/, "");
        query += ")";


        initDB()
            .then((db: any) => {
                //Category Table Start
                db.transaction((tx: any) => {
                    tx.executeSql(query);
                });
                //Category Table End
                // closeDatabase(db);
                resolve(true);
            })
            .catch(err => {
                resolve(false);
            });
    });
};

// TableCheck Usage
// tableCheck(tableName);

export const tableCheck = (tableName: any) => {
    return new Promise(resolve => {
        initDB()
            .then((db: any) => {
                db.transaction((tx: any) => {
                    tx.executeSql(
                        `SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}'`
                    ).then(([tx, results]: any) => {
                        var len = results.rows.length;

                        resolve(len);
                    });
                })
                    .then((result: any) => {
                        // closeDatabase(db);
                    })
                    .catch((err: any) => {
                        console.warn('table Check Catch 1 \n', err);
                        resolve(false);
                    });
            })
            .catch(err => {
                console.warn('table Check Catch 2 \n', err);
                resolve(false);
            });
    });
};

export const updateRecord = (tableName: any, data: any, id: any, cn = "id") => {
    return new Promise(async resolve => {
        let columnNames = "";
        let columnValues: any = [];
        for (let i = 0; i < data.length; i++) {
            if (typeof data[i]["columnName"] === "undefined") {
                console.error(`Didn't find 'COLUMN NAME' at ${i} index`);
            }
            else if (typeof data[i]["columnValue"] === "undefined") {
                // console.error(`Didn't find 'COLUMN VALUE' at ${i} index`);
                data[i]["columnValue"] = '';
            }
            else {
                let columnName = data[i]["columnName"];
                let columnValue = data[i]["columnValue"];
                columnValues.push(columnValue);

                columnNames += columnName + "=?,";

            }
        }

        columnNames = columnNames.replace(/,\s*$/, "");

        const updatedAt = new Date().getTime();
        let query = `Update ${tableName} SET ${columnNames},updatedAt WHERE ${cn}='${id}'`;

        initDB()
            .then((db: any) => {
                db.transaction((tx: any) => {
                    tx.executeSql(
                        query,
                        `${columnValues},${updatedAt}`
                    ).then(([tx, results]: any) => {
                        resolve(results);
                    });
                })
                    .then((result: any) => {
                        // closeDatabase(db);
                    })
                    .catch((err: any) => {
                        resolve(false);
                        console.warn("catch 1 ", err);
                    });
            })
            .catch(err => {
                resolve(false);
            });


    });
};


//   addRecord Usage
// let data = [];
// data.push({
//     "columnName": "username",
//     "columnValue": "text"
// }, {
//     "columnName": "password",
//     "columnValue": "text"
// });
// addRecord("tableName", data)

export const addRecord = (tableName: any, data: any) => {
    return new Promise(async resolve => {
        let columnNames = "";
        let columnValues: any = [];
        let columnValuesQuestionMark = "";
        for (let i = 0; i < data.length; i++) {
            if (typeof data[i]["columnName"] === "undefined") {
                console.error(`Didn't find 'COLUMN NAME' at ${i} index`);
            }
            else if (typeof data[i]["columnValue"] === "undefined") {
                data[i]["columnValue"] = '';
                // console.error(`Didn't find 'COLUMN VALUE' at ${i} index`);
            }
            else {
                let columnName = data[i]["columnName"];
                let columnValue = data[i]["columnValue"];
                columnNames += columnName + ",";
                columnValues.push(columnValue);
                columnValuesQuestionMark += "?,";
            }
        }

        columnNames = columnNames.replace(/,\s*$/, "");

        columnValuesQuestionMark = columnValuesQuestionMark.replace(/,\s*$/, "");
        const createdAt = new Date().getTime();
        let query = `INSERT INTO ${tableName} (${columnNames},createdAt,updatedAt)  VALUES (${columnValuesQuestionMark} ,'${createdAt}','${createdAt}' )`;


        initDB()

            .then((db: any) => {
                db.transaction((tx: any) => {
                    tx.executeSql(
                        query,
                        columnValues
                    ).then(([tx, results]: any) => {
                        resolve(results);
                        closeDatabase(db);

                    });
                })
                    .then((result: any) => {
                        // closeDatabase(db);
                    })
                    .catch((err: any) => {
                        resolve(false);
                        console.warn("catch 1 ", err);
                    });
            })
            .catch(err => {
                resolve(false);
            });


    });
};

// recordFetch Usage
// recordFetch("Select * from tableName")

export const openDBForExecute = () => {
    return new Promise((resolve) => {
        initDB()

            .then(db => {
                resolve({ execute: "tx", database: db });
                // db.transaction(tx => {
                //     resolve({ execute: tx, database: db });
                // })
                //     .then(result => {
                //         // closeDatabase(db);
                //     })
                //     .catch(err => {
                //         resolve(false);
                //         console.warn("catch 1 ", err);
                //     });
            })
            .catch((err: any) => {
                resolve(false);
            });

    })//end of PROMISE
}//end of openDBForExecute

export const closeDBForExecute = (db: any) => {
    closeDatabase(db);
}//end of closeDBForExecute


export const addRecordExecute = (db: any, tableName: any, data: any) => {
    return new Promise(async resolve => {
        let columnNames = "";
        let columnValues: any = [];
        let columnValuesQuestionMark = "";
        for (let i = 0; i < data.length; i++) {
            if (typeof data[i]["columnName"] === "undefined") {
                console.error(`Didn't find 'COLUMN NAME' at ${i} index`);
            }
            else if (typeof data[i]["columnValue"] === "undefined") {
                data[i]["columnValue"] = '';
                // console.error(`Didn't find 'COLUMN VALUE' at ${i} index`);
            }
            else {
                let columnName = data[i]["columnName"];
                let columnValue = data[i]["columnValue"];
                columnNames += columnName + ",";
                columnValues.push(columnValue);
                columnValuesQuestionMark += "?,";
            }
        }

        columnNames = columnNames.replace(/,\s*$/, "");

        columnValuesQuestionMark = columnValuesQuestionMark.replace(/,\s*$/, "");

        let query = `INSERT INTO ${tableName} (${columnNames})  VALUES (${columnValuesQuestionMark} )`;

        db.transaction((tx: any) => {
            tx.executeSql(
                query,
                columnValues
            ).then(([tx, results]: any) => {
                resolve(results);
            }).catch((err: any) => {

            });

        }).catch((err: any) => {
            console.log('ERROR ON ADD RECORD EXECUTE ', JSON.stringify(err));
            resolve(false);
        })



    });
};//end of addRecordExecute

export const recordFetch = (query: any) => {
    return new Promise(async resolve => {
        initDB()
            .then((db: any) => {
                db.transaction((tx: any) => {
                    tx.executeSql(query).then(([tx, results]: any) => {
                        resolve(results);
                    }).catch((err: any) => {
                        console.log("ERROR 1  IS==> ", err);
                    });
                })
                    .then((result: any) => {
                        // closeDatabase(db);
                    })
                    .catch((err: any) => {
                        console.log("ERROR 2 IS==> ", err);
                        resolve(false);
                    });
            })
            .catch((err: any) => {
                console.log("ERROR 3 IS==> ", err);
                resolve(false);
            })
    });
};

export const deleteTable = (tableName: any) => {
    return new Promise(resolve => {
        initDB()
            .then((db: any) => {
                db.transaction(async (tx: any) => {
                    tx.executeSql(`DROP TABLE IF EXISTS ${tableName}`).then(() => {
                        resolve(true);
                    });


                })
                    .then((result: any) => {
                        // closeDatabase(db);
                    })
                    .catch((err: any) => {
                        resolve(false);
                        console.log(err);
                    });
            })
            .catch((err: any) => {
                resolve(false);
                console.log(err);
            });
    });
};
export const clearDB = (tableName: any) => {
    return new Promise(resolve => {
        initDB()
            .then((db: any) => {
                db.transaction(async (tx: any) => {
                    tx.executeSql(`DROP TABLE IF EXISTS ${tableName}`);

                    resolve(true);
                })
                    .then((result: any) => {
                        // closeDatabase(db);
                    })
                    .catch((err: any) => {
                        resolve(false);
                        console.log(err);
                    });
            })
            .catch((err: any) => {
                resolve(false);
                console.log(err);
            });
    });
};


export const deleteDatabase = async () => {
    const db: any = await initDB();
    let [results] = await db.executeSql('SELECT name FROM sqlite_master WHERE type="table" ORDER BY name');
    var len = results.rows.length;
    for (let i = 0; i < len; i++) {
        let tableName = results.rows.item(i).name;
        if (tableName !== 'sqlite_sequence' && tableName !== 'android_metadata') {
            await db.executeSql(`DELETE FROM ${results.rows.item(i).name}`);
        }
    }

}

export const createDatabase = () => {
    //@ts-ignore
    SQLite.createDatabase({
        name: database_name,
        location: "default",
    }, function (res: any) {
        console.log(res); //database removed                              
    }).catch((e: any) => {
    });

}