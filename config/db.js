const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'info_courses',
    port: 3308
});

/*db.connect((err) => {
    if (err) {
      console.error('Error connecting to database: ', err);
      return;
    }
    console.log('Connected to database');
});*/

module.exports = db;