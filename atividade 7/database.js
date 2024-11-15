
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run(`
        create table users (
            id integer primary key autoincrement,
            username text unique not null,
            password text not null
        )
    `);

    db.run(`
        create table messages (
            id integer primary key autoincrement,
            title text not null,
            content text not null,
            user_id integer not null,
            foreign key (user_id) references users(id)
        )
    `);
});

module.exports = db;
