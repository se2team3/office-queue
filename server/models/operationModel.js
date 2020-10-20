// import modules
// import database
const db = require('./index');

exports.createOperationsList = function() {
    return new Promise ((resolve,reject) =>{
        const sql = 'CREATE TABLE Operations (CODE varchar(5) NOT NULL PRIMARY KEY, NAME varchar(255) NOT NULL, DESCRIPTION varchar(255) NOT NULL)'
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
        const sql = 'INSERT INTO Operations (CODE, NAME, DESCRIPTION) VALUES (?, ?, ?)'
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
        const sql = 'SELECT CODE FROM Operations WHERE NAME LIKE ?'
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
