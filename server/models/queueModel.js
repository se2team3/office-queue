const db = require('./index');

// TODO - times are not localtime
exports.createQueue = function() {
    return new Promise ((resolve,reject) =>{
        const sql = 'CREATE TABLE Queue (ID INTEGER NOT NULL PRIMARY KEY, REQUEST_TYPE varchar(5) NOT NULL, COUNTER int, INITIAL_TIME TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, CALLED BOOLEAN NOT NULL CHECK (CALLED IN (0,1)),TIME_SERVED TIMESTAMP, FOREIGN KEY(REQUEST_TYPE) REFERENCES Operations(CODE), FOREIGN KEY(COUNTER) REFERENCES Counters(ID))'
        db.run(sql,[],(err) =>{
            if(err)
                reject(err);
            else
                resolve(null);
        });
    })
}
exports.deleteQueue = function() {
    return new Promise ((resolve,reject) =>{
        const sql = 'DELETE * FROM  Queue'
        db.run(sql,[],(err) =>{
            if(err)
                reject(err);
            else
                resolve(null);
        });
    })
}

exports.addCustomer = function(requestType, called = 0) {
    return new Promise (function (resolve,reject) {
        const sql = 'INSERT INTO Queue (REQUEST_TYPE, CALLED) VALUES(?,?)'
        db.run(sql, [requestType, called], function(err) {
            if(err)
                reject(err);
            else
                resolve(this.lastID);
        });
    })
}

exports.peopleWaiting = function(requestType) {
    return new Promise (function (resolve,reject) {
        const sql = 'SELECT COUNT (*) AS TOT FROM Queue WHERE REQUEST_TYPE = ? AND CALLED = 0'
        db.get(sql, [requestType], function(err, row) {
            if(err)
                reject(err);
            if (!row)
                resolve(null);
            else
                resolve(row["TOT"]);
        });
    })
}