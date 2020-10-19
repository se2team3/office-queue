// import modules
// import database
const db = require('./index');

exports.createOperationsList = function() {
    return new Promise ((resolve,reject) =>{
        const sql = 'CREATE TABLE Operations (ID INTEGER NOT NULL PRIMARY KEY, DESCRIPTION varchar(255) NOT NULL)'
        db.run(sql,[],(err) =>{
            if(err)
                reject(err);
            else
                resolve(null);
        });
    })
}

exports.insertOperations = function(description) {
    return new Promise ((resolve,reject) =>{
        const sql = 'INSERT INTO Operations (DESCRIPTION) VALUES (?)'
        db.run(sql,[description],(err) =>{
            if(err)
                reject(err);
            else
                resolve(null);
        });
    })
}

exports.retrieveOperations = function(description) {
    return new Promise ((resolve,reject) =>{
        const sql = 'SELECT ID FROM Operations WHERE DESCRIPTION LIKE ?'
        db.get(sql,[description],(err, row) =>{
            if(err)
                return reject(err);
            if (!row)
                resolve(null);
            else
                resolve(row["ID"]);
        });
    })
}

exports.createCountersList = function() {
    return new Promise ((resolve,reject) =>{
        const sql = 'CREATE TABLE Counters (ID INTEGER NOT NULL PRIMARY KEY)'
        db.run(sql,[],(err) =>{
            if(err)
                reject(err);
            else
                resolve(null);
        });
    })
}

exports.insertCounters = function(id) {
    return new Promise ((resolve,reject) =>{
        const sql = 'INSERT INTO Counters(ID) VALUES(?)'
        db.run(sql,[id],(err) =>{
            if(err)
                reject(err);
            else
                resolve(null);
        });
    })
}

exports.createCountersOperationsList = function() {
    return new Promise ((resolve,reject) =>{
        const sql = 'CREATE TABLE Counters_Operations (ID INTEGER NOT NULL PRIMARY KEY, COUNTER_ID int NOT NULL, OPERATION_ID int NOT NULL, FOREIGN KEY(COUNTER_ID) REFERENCES Counters(ID),FOREIGN KEY(OPERATION_ID) REFERENCES Operations(ID))'
        db.run(sql,[],(err) =>{
            if(err)
                reject(err);
            else
                resolve(null);
        });
    })
}

exports.assignOperation = function(id,counterId,operationId) {
    return new Promise ((resolve,reject) =>{
        const sql = 'INSERT INTO Counters_Operations (ID,COUNTER_ID,OPERATION_ID) values(?,?,?)'
        db.run(sql,[id,counterId,operationId],(err) =>{
            if(err)
                reject(err);
            else
                resolve(null);
        });
    })
}