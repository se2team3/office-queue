const db = require('./index');

//it creates a table in the database used to manage customers, it contains the operation that the customer wants to perform, the counter that will serve him
//two timestamps used to calculate the priority request and a boolean field if the customer is served or not
exports.createQueue = function() {
    return new Promise ((resolve,reject) =>{
        const sql = `CREATE TABLE Queue (id INTEGER NOT NULL PRIMARY KEY, request_type varchar(5) NOT NULL, ticket_number INTEGER NOT NULL, counter INTEGER, initial_time TIMESTAMP NOT NULL DEFAULT (datetime('now','localtime')) , called BOOLEAN NOT NULL CHECK (called IN (0,1)),time_served TIMESTAMP, FOREIGN KEY(request_type) REFERENCES Operations(CODE), FOREIGN KEY(counter) REFERENCES Counters(id))`;
        db.run(sql,[],(err) =>{
            if(err)
                reject(err);
            else
                resolve(null);
        });
    })
}
//query that deletes all queue data at a certain time of the day, it is necessary to do not allocate many data on database
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

//when a new customer arrives this function will fill the db 
exports.addCustomer = function(requestType, ticket_number, called = 0) {
    return new Promise (function (resolve,reject) {
        const sql = 'INSERT INTO Queue (request_type, ticket_number, called) VALUES(?,?,?)'
        db.run(sql, [requestType, ticket_number, called], function(err) {
            if(err)
                reject(err);
            else
                resolve();
        });
    })
}

exports.getNextTicket = function(requestType) {
    return new Promise (function (resolve,reject) {
        const sql = 'SELECT MAX(ticket_number) + 1 AS N FROM Queue WHERE request_type LIKE ?';
        db.get(sql, [requestType], function(err, res) {
            console.log(res);
            console.log(requestType);
            if(err)
                reject(err);
            else if (!res["N"])
                resolve(1);
            else
                resolve(res["N"]);
        });
    })
}

exports.getLastCustomers = function(){
    return new Promise (function (resolve,reject) {
        const sql=`SELECT id, counter, time_served, request_type
                   FROM Queue
                   WHERE called = 1
                   ORDER BY time_served DESC
                   LIMIT 14`;
        db.all(sql, [], (err, results) => {
            console.log(results);
            if(err)
                reject(err);
            else if(results===undefined || results.length===0){
                resolve([{}])
            } else {
                resolve(results);
            }
        })
    })
}

//this function will call the next customer in order of priority
exports.callNextCustomer= function(counterId){
    return new Promise( (resolve,reject)=>{
        const sql=
       `UPDATE Queue
        SET CALLED=1, COUNTER=?, TIME_SERVED= CURRENT_TIMESTAMP
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
                                    WHERE COUNTER_ID=?)
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
