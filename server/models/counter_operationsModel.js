// import modules
// import database
const db = require('./index');
const Operation = require('./Operation');


//delete an operation given the counter_id
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

//assigns an operation to a counter
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

//given a counter it removes an assigned operation 
exports.deleteCounterOperation = function (operation_code) {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM Counters_Operations WHERE operation_code = ?';
        db.run(query, [operation_code], (err) => {
            if(err)
                reject(err);
            else
                resolve(null);
        })
    });
}
