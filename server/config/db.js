import mysql from 'mysql';

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "resurrection"
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to the database.');
});

export default db;