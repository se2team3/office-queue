"use strict";

const db = require ('./db');

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

exports.createQueue = function() {
    return new Promise ((resolve,reject) =>{
        const sql = 'CREATE TABLE Queue (ID int NOT NULL PRIMARY KEY, REQUEST_TYPE int NOT NULL, COUNTER int, INITIAL_TIME TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, CALLED BOOLEAN NOT NULL CHECK (CALLED IN (0,1)),TIME_SERVED TIMESTAMP, FOREIGN KEY(REQUEST_TYPE) REFERENCES Operations(ID), FOREIGN KEY(COUNTER) REFERENCES Counters(ID))'
        db.run(sql,[],(err) =>{
            if(err)
                reject(err);
            else
                resolve(null);
        });
    })
}

exports.addCustomer = function(id,requestType,counter,initialTime,called,timeServed) {
    return new Promise ((resolve,reject) =>{
        const sql = 'INSERT INTO Queue (ID, REQUEST_TYPE, COUNTER, CALLED,TIME) VALUES(?,?,?,?,?,?)'
        db.run(sql,[id,requestType,counter,initialTime,called,timeServed],(err) =>{
            if(err)
                reject(err);
            else
                resolve(null);
        });
    })
}