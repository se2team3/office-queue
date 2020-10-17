const db = require('./index');

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