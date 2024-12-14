import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'react%123',
    database: process.env.DB_NAME || 'surat_penawaran_db',
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        process.exit(1);
    } else {
        console.log('Connected to MySQL database!');
    }
});

export default connection;