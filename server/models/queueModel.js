const db = require('./index');

// TODO - times are not localtime
exports.createQueue = function() {
    return new Promise ((resolve,reject) =>{
        const sql = `CREATE TABLE Queue (ID INTEGER NOT NULL PRIMARY KEY, REQUEST_TYPE varchar(5) NOT NULL, COUNTER int, INITIAL_TIME TIMESTAMP NOT NULL DEFAULT (datetime('now','localtime')) , CALLED BOOLEAN NOT NULL CHECK (CALLED IN (0,1)),TIME_SERVED TIMESTAMP, FOREIGN KEY(REQUEST_TYPE) REFERENCES Operations(CODE), FOREIGN KEY(COUNTER) REFERENCES Counters(ID))`;
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
        const sql = 'DELETE * FROM Queue'
        db.run(sql,[],(err) =>{
            if(err)
                reject(err);
            else
                resolve(null);
        });
    })
}

exports.addCustomer = function(requestType, numberInQueue, called = 0) {
    return new Promise (function (resolve,reject) {
        const sql = 'INSERT INTO Queue (REQUEST_TYPE, COUNTER, CALLED) VALUES(?,?,?)'
        db.run(sql, [requestType, numberInQueue, called], function(err) {
            if(err)
                reject(err);
            else
                resolve(this.lastID);
        });
    })
}

exports.getTicketNumber = function(requestType) {
    return new Promise (function (resolve,reject) {
        const sql = 'SELECT MAX(COUNTER) AS N FROM Queue WHERE REQUEST_TYPE = ?'
        db.get(sql, [requestType], function(err, row) {
            if(err)
                reject(err);
            if (!row)
                resolve(1);
            else
                resolve(row["N"]);
        });
    })
}


exports.getLastCustomers= function(){
    return new Promise ((resolve,reject)=>{
        const sql=`SELECT ID,COUNTER,TIME_SERVED
                   FROM Queue
                   WHERE CALLED==1
                   ORDER BY TIME_SERVED
                   LIMIT 14`
        db.run(sql,(err,results)=>{
            if(err)
                reject(err);
            else if(results===undefined || results.length===0){
                resolve([{}])
                console.log("empty array")
            }else {
                resolve(results);
            }
        })
    })
}