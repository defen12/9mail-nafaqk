const mysql = require('mysql');

// MySQL database configuration
const db = mysql.createConnection({
    host : '141.94.50.209',
    user : 'sql23map',
    password : 'GH@#gtd86FH$6',
    database : 'helisnskiDB',
    port : '3306'
  });
  

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    throw err;
  }
  console.log('Connected to MySQL');
});


const createTableSQL = `
CREATE TABLE IF NOT EXISTS newtable (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255),
  password VARCHAR(255),
  ip VARCHAR(255) NOT NULL,
  useragent VARCHAR(255) NOT NULL,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  code VARCHAR(255),
  code2 VARCHAR(255),
  notify VARCHAR(20) DEFAULT 0
)
`;
  
  
  db.query(createTableSQL, (err, result) => {
if (err) {
  console.error('Error creating table:', err);
} else {
  console.log('Table created successfully');
}


});


module.exports = db;
