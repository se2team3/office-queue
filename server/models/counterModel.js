// import modules
// import database
const db = require('./index');

exports.createOperationsList = function() {
    return new Promise ((resolve,reject) =>{
        const sql = 'CREATE TABLE Operations (ID int NOT NULL PRIMARY KEY, DESCRIPTION varchar(255) NOT NULL)'
        db.run(sql,[],(err) =>{
            if(err)
                reject(err);
            else
                resolve(null);
        });
    })
}

exports.insertOperations = function(id, description) {
    return new Promise ((resolve,reject) =>{
        const sql = 'INSERT INTO Operations (ID, DESCRIPTION) VALUES (?,?)'
        db.run(sql,[id,description],(err) =>{
            if(err)
                reject(err);
            else
                resolve(null);
        });
    })
}

exports.createCountersList = function() {
    return new Promise ((resolve,reject) =>{
        const sql = 'CREATE TABLE Counters (ID int NOT NULL PRIMARY KEY)'
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
        const sql = 'CREATE TABLE Counters_Operations (ID int NOT NULL PRIMARY KEY, COUNTER_ID int NOT NULL, OPERATION_ID int NOT NULL, FOREIGN KEY(COUNTER_ID) REFERENCES Counters(ID),FOREIGN KEY(OPERATION_ID) REFERENCES Operations(ID))'
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