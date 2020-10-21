// import modules
// import database
const db = require('./index');
const Operation = require('./Operation');

exports.insertCounterOperation = function (counter_id, operation_code) {
    console.log(counter_id,operation_code);

    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO Counters_Operations (counter_id, operation_code) VALUES (?,?)';
        db.run(query, [counter_id,operation_code], (err) => {
            if(err)
                reject(err);
            else
                resolve(null);
        })
    });
}


exports.deleteCounterOperation = function (counter_id, operation_code) {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM Counters_Operations WHERE counter_id = ? AND operation_code = ?';
        db.run(query, [counter_id,operation_code], (err) => {
            if(err)
                reject(err);
            else
                resolve(null);
        })
    });
}
