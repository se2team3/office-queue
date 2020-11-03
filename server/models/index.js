// import modules
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const env = process.env.NODE_ENV || 'development';

let filename;

switch (env) {
    case "test":
        filename = "database.test.db";
        break;
    default: /* development */
        filename = "database.db";
        break;
}

const db_name = path.join(__dirname, "db", filename);

const db = new sqlite3.Database(db_name, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log(`Connected to ${filename} database.`);
});

module.exports = db;
