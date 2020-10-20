// import modules
// import database
const db = require('./index');

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

exports.insertCounter = function({id}) {
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

exports.retrieveCounter = function({id}) {
    return new Promise ((resolve,reject) =>{
        const sql = 'SELECT ID FROM Counters WHERE ID = ?'
        db.get(sql, [id], (err, row) => {
            if(err)
                return reject(err);
            if (!row)
                resolve(null);
            else
                resolve(row["ID"]);
        });
    })
}

exports.createCountersOperationsList = function() {
    return new Promise ((resolve,reject) =>{
        const sql = 'CREATE TABLE Counters_Operations (ID INTEGER NOT NULL PRIMARY KEY, COUNTER_ID int NOT NULL, OPERATION_CODE varchar(5) NOT NULL, FOREIGN KEY(COUNTER_ID) REFERENCES Counters(ID),FOREIGN KEY(OPERATION_CODE) REFERENCES Operations(CODE))'
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