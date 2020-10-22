// import modules
// import database
const db = require('./index');
const Counter = require('./Counter');

const createCounterWithOperations = function (row){
    operations = [ {code: row.code, name: row.name, description: row.description} ]
    return new Counter(row.counter_id, operations);
}

//it creates the counter table in the database
exports.createCountersList = function() {
    return new Promise ((resolve,reject) =>{
        const sql = 'CREATE TABLE Counters (id INTEGER NOT NULL PRIMARY KEY)'
        db.run(sql,[],(err) =>{
            if(err)
                reject(err);
            else
                resolve(null);
        });
    })
}
//function that inserts new counters to the list
exports.insertCounter = function({id}) {
    return new Promise ((resolve,reject) =>{
        const sql = 'INSERT INTO Counters(id) VALUES(?)'
        db.run(sql,[id],(err) =>{
            if(err)
                reject(err);
            else
                resolve(null);
        });
    })
}
//gets the counter with the selected is
exports.retrieveCounter = function({id}) {
    return new Promise ((resolve,reject) =>{
        const sql = 'SELECT id FROM Counters WHERE id = ?'
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
//creates a table that manages the operations for a specific counters
exports.createCountersOperationsList = function() {
    return new Promise ((resolve,reject) =>{
        const sql = 'CREATE TABLE Counters_Operations (id INTEGER NOT NULL PRIMARY KEY, counter_id int NOT NULL, operation_code varchar(5) NOT NULL, FOREIGN KEY(counter_id) REFERENCES Counters(id),FOREIGN KEY(operation_code) REFERENCES Operations(code))'
        db.run(sql,[],(err) =>{
            if(err)
                reject(err);
            else
                resolve(null);
        });
    })
}

//it assigns to a counter an operation
exports.assignOperation = function(id,counterId,operationId) {
    return new Promise ((resolve,reject) =>{
        const sql = 'INSERT INTO Counters_Operations (id,counter_id,operation_id) values(?,?,?)'
        db.run(sql,[id,counterId,operationId],(err) =>{
            if(err)
                reject(err);
            else
                resolve(null);
        });
    })
}

/**
 * Delete a counter with a given id
 */
exports.deleteCounter = function(id) {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM Counters WHERE id = ?';
        db.run(query, [id], (err) => {
            if(err)
                reject(err);
            else
                resolve(null);
        })
    });
}

/**
 * Get counters list
 */
exports.getCounters = function() {
    return new Promise((resolve, reject) => {
        let query = `SELECT id
                       FROM Counters`

        db.all(query, [], (err, rows) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                /* let boards = rows.map((row) => createCounter(row));
                console.log(boards); */
                resolve(rows);
            }
        });
    });
}

exports.hasCounter = function(counter_id) {
    return new Promise((resolve, reject) => {
        let query = `SELECT id
                     FROM Counters
                     WHERE id = ?`;
        db.get(query, [counter_id], (err, row) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            if (!row)
                resolve(false);
            else
                resolve(true);
        });
    });
}

/**
 * Get counter by id
 */
exports.getCounter = function(counter_id) {
    console.log(counter_id);
    return new Promise((resolve, reject) => {
        const query = ` SELECT counter_id, code, name, description
                        FROM Counters_Operations co, Operations o
                        WHERE counter_id = ? AND co.operation_code = o.code`;
        db.all(query, [counter_id], (err, rows) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                // put list of operations inside counter object
                let counters = rows.map((row) => createCounterWithOperations(row)).reduce((acc, cur)=>{
                    const counterInd = acc.findIndex(el => el.counter_id === cur.counter_id);
                    if(counterInd>=0)
                        acc[counterInd].operations = acc[counterInd].operations.concat(cur.operations);
                    else
                        acc.push(cur);
                    return acc;
                }, []);
                resolve(counters[0]);
            }
        });
    });
}