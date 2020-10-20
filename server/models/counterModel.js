// import modules
// import database
const db = require('./index');
const Counter = require('./Counter');

const createCounter = function (row){
    operations = []
    if(row.operations){
        operations = row.operations
    }
    return new Counter(row.ID, operations);
}

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
                let boards = rows.map((row) => createCounter(row));
                console.log(boards);
                resolve(boards);
            }
        });
    });
}


/**
 * Get a counter with a given id WIP
 */
exports.getCounter = function(counter_id){
    return new Promise((resolve, reject) => {
        let query = `SELECT id, .................................
                       FROM Counters as c, Counters_Operations as co, Operations as o
                       WHERE c.id = co.counter_id AND co.operation_code = o.code`

        db.all(query, [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                // put list of operations inside counter object
                let cards = rows.map((row) => createCardOptionalLink(row)).reduce((acc, cur)=>{
                    const cardInd = acc.findIndex(el => el.id === cur.id);
                    if(cardInd>=0)
                        acc[cardInd].interestingLinks = acc[cardInd].interestingLinks.concat(cur.interestingLinks);
                    else
                        acc.push(cur);
                    return acc;
                }, []);
                resolve(cards);
            }
        });
    });
}