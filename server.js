//import Express
const express = require('express');
const mysql = require('mysql2');

//PORT designation
const PORT = process.env.PORT || 3001;
const app = express();

//______________________MIDDLEWARE___________
//Express.js middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

//MySQL connect the application to MYSQL database
const db = mysql.createConnection(
    {
        host: 'localhost',
        //Your MYSQL username,
        user: 'root',
        //Your MYSQL password
        password: 'Andre111$',
        database: 'election'

    },
    console.log('Connected to the election database.')
);


//Database call that returns all rows in SELECTED * FROM
//db.query(`SELECT * FROM candidates`, (err, rows) => {
  //  console.log(rows);
  //});


// GET a single candidate 1 is a placeholder
//db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
   // if (err) {
   //   console.log(err);
   // }
   // console.log(row);
 // });

//Delete a candidate 1 is a placeholder
//db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
    //if (err) {
        //console.log(err);
   // }
   // console.log(result);
//});


//Create a new candidate
//const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected) 
              //VALUES (?,?,?,?)`;
//const params = [1, 'Ronald', 'Firbank', 1];

//db.query(sql, params, (err, result) => {
  //if (err) {
    //console.log(err);
  //}
  //console.log(result);
//});



//route to handle user requests that arent supported by my app !! Make sure this is the last route always
app.use((req, res) => {
    res.status(404).end();
  });

//add the fuction that will start the server and tell you in console log
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
 