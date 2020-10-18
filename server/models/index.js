// import modules
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const filename = "database.db";
const db_name = path.join(__dirname, "db", filename);

const db = new sqlite3.Database(db_name, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log(`Connected to ${filename} database.`);
});

module.exports = db;