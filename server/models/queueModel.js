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
                   ORDER BY time_served
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