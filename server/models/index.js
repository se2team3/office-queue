// import modules
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// TODO - change db filename
const filename = "xxx.db";
const db_name = path.join(__dirname, "data", filename);

const db = new sqlite3.Database(db_name, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log(`Connected to ${filename} database.`);
});

module.exports = db;