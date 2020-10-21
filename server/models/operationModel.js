// import modules
// import database
const db = require('./index');
const Operation = require('./Operation');

exports.createOperationsList = function() {
    return new Promise ((resolve,reject) =>{
        const sql = 'CREATE TABLE Operations (code varchar(5) NOT NULL PRIMARY KEY, name varchar(255) NOT NULL, description varchar(255) NOT NULL)'
        db.run(sql,[],(err) =>{
            if(err)
                reject(err);
            else
                resolve(null);
        });
    })
}

exports.insertOperation = function({code, name, description = ""}) {
    return new Promise ((resolve,reject) =>{
        const sql = 'INSERT INTO Operations (code, name, description) VALUES (?, ?, ?)'
        db.run(sql, [code, name, description], (err) => {
            if(err)
                reject(err);
            else
                resolve(null);
        });
    })
}

exports.retrieveOperation = function({name}) {
    return new Promise ((resolve,reject) =>{
        const sql = 'SELECT code FROM Operations WHERE name LIKE ?'
        db.get(sql, [name], (err, row) => {
            if(err)
                return reject(err);
            if (!row)
                resolve(null);
            else
                resolve(row["CODE"]);
        });
    })
}

exports.hasOperation = function(code) {
    return new Promise ((resolve,reject) =>{
        const sql = 'SELECT code FROM Operations WHERE code LIKE ?'
        db.get(sql, [code], (err, row) => {
            if(err)
                return reject(err);
            if (!row)
                resolve(false);
            else
                resolve(true);
        });
    })
}

exports.deleteOperationsByCounter = function (counter_id) {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM Counters_Operations WHERE counter_id = ?';
        db.run(query, [counter_id], (err) => {
            if(err)
                reject(err);
            else
                resolve(null);
        })
    });
}


const createOperation = function (row){
    console.log(row)
    counters = []
    if(row.ID){
        counters = [ row.id ]
    }
    return new Operation(row.code, row.name, row.description, counters);
}

/**
 * Get operations list
 */
exports.getOperations = function() {
    return new Promise((resolve, reject) => {
        let query = `SELECT o.code, o.name, o.description, c.id
                       FROM Operations as o LEFT JOIN Counters_Operations as co LEFT JOIN Counters as c ON o.code = co.operation_code AND co.counter_id = c.id
                       `

        db.all(query, [], (err, rows) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                // put list of counters inside counter object
                let operations = rows.map((row) => createOperation(row)).reduce((acc, cur)=>{
                    const counterInd = acc.findIndex(el => el.code === cur.code);
                    if(counterInd>=0)
                        acc[counterInd].counters = acc[counterInd].counters.concat(cur.counters);
                    else
                        acc.push(cur);
                    return acc;
                }, []);
                console.log(operations);
                resolve(operations);
            }
        });
    });
}

/**
 * Update existing operation
 */
exports.updateOperation = function(code, operation) {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE Operations SET code = ?, name = ?, description = ? WHERE code = ?';

        db.run(sql, [operation.code, operation.name, operation.description, code], (err) => {
            if(err){
                console.log(err);
                reject(err);
            }
            else
                resolve(null);
        })
    });
}