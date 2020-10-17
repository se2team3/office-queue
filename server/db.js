'use strict';

const sqlite = require('sqlite3');

const DBSOURCE = './db/database.db';

const db = new sqlite.Database(DBSOURCE, (err) =>{
    if(err){
        console.error(err.message);
        throw err;
    }
});

module.exports = db;