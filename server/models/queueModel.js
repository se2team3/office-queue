const db = require('./index');

// TODO - times are not localtime
exports.createQueue = function() {
    return new Promise ((resolve,reject) =>{
        const sql = `CREATE TABLE Queue (id INTEGER NOT NULL PRIMARY KEY, request_type varchar(5) NOT NULL, counter INTEGER, initial_time TIMESTAMP NOT NULL DEFAULT (datetime('now','localtime')) , called BOOLEAN NOT NULL CHECK (called IN (0,1)),time_served TIMESTAMP, FOREIGN KEY(request_type) REFERENCES Operations(CODE), FOREIGN KEY(counter) REFERENCES Counters(id))`;
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
        const sql = 'DELETE FROM Queue'
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
        const sql = 'INSERT INTO Queue (request_type, counter, called) VALUES(?,?,?)'
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
        const sql = 'SELECT MAX(counter) AS N FROM Queue WHERE request_type = ?'
        db.get(sql, [requestType], function(err, row) {
            if(err)
                reject(err);
            if (!row['N'])
                resolve(1);
            else{
                resolve(row["N"]);
            }
        });
    })
}


exports.getLastCustomers= function(){
    return new Promise ((resolve,reject)=>{
        const sql=`SELECT ID,counter,time_served
                   FROM Queue
                   WHERE called==1
                   ORDER BY time_served DESC
                   LIMIT 14`
        db.run(sql,(err,results)=>{
            if(err)
                reject(err);
            else if(results===undefined || results.length===0){
                resolve([{}])
            }else {
                resolve(results);
            }
        })
    })
}

exports.callNextCustomer= function(counterId){
    return new Promise( (resolve,reject)=>{
        const sql=
       `UPDATE Queue
        SET CALLED=1, COUNTER=1
        WHERE ID IN
           (SELECT ID 
           FROM (SELECT ID, INITIAL_TIME
                 FROM Queue
                 WHERE CALLED=0 AND REQUEST_TYPE IN
                      (SELECT REQUEST_TYPE
                       FROM (SELECT REQUEST_TYPE, COUNT(*) AS c
                             FROM Queue
                             WHERE CALLED=0 AND REQUEST_TYPE IN
                                   (SELECT DISTINCT OPERATION_CODE
                                    FROM Counters_Operations
                                    WHERE COUNTER_ID=1)
                             GROUP BY REQUEST_TYPE
                             ORDER BY c DESC
                             LIMIT 1
                            )
                       )
                 ORDER BY INITIAL_TIME 
                 LIMIT 1
                 )
           )`
        
            db.run(sql,[counterId,counterId],
            function(err){
                if(err){
                    reject(err);
                }
                else
                    resolve("OK");
         });
     
    });
 }
