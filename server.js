//import Express
const express = require("express");
const res = require("express/lib/response");
const mysql = require("mysql2");
const inputCheck = require("./utils/inputCheck"); 

//PORT designation
const PORT = process.env.PORT || 3001;
const app = express();

//______________________MIDDLEWARE___________
//Express.js middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//MySQL connect the application to MYSQL database
const db = mysql.createConnection(
  {
    host: "localhost",
    //Your MYSQL username,
    user: "root",
    //Your MYSQL password
    password: "Andre111$",
    database: "election",
  },
  console.log("Connected to the election database.")
);

//Database call that returns all rows in SELECTED * FROM
app.get("/api/candidates", (req, res) => {
    const sql = `SELECT candidates.*, parties.name 
    AS party_name 
    FROM candidates 
    LEFT JOIN parties 
    ON candidates.party_id = parties.id`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

//GET a single candidate using an api route
app.get("/api/candidate/:id", (req, res) => {
    const sql = `SELECT candidates.*, parties.name 
    AS party_name 
    FROM candidates 
    LEFT JOIN parties 
    ON candidates.party_id = parties.id 
    WHERE candidates.id = ?`;

  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: row,
    });
  });
});

//MYSQL DATABASE // select 1 candidate (1) is a placeholder
//db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
// if (err) {
//  console.log(err);
// }
// console.log(row);
//});

// Delete a candidate
app.delete("/api/candidate/:id", (req, res) => {
  const sql = `DELETE FROM candidates WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: "Candidate not found",
      });
    } else {
      res.json({
        message: "deleted",
        changes: result.affectedRows,
        id: req.params.id,
      });
    }
  });
});

//  MYSQL DATABASE // Delete a candidate 1 is a placeholder
//db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
//if (err) {
//    console.log(err);
// }
// console.log(result);
//});

// Create a candidate
app.post('/api/candidate', ({ body }, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }
    const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
  VALUES (?,?,?)`;
const params = [body.first_name, body.last_name, body.industry_connected];

db.query(sql, params, (err, result) => {
  if (err) {
    res.status(400).json({ error: err.message });
    return;
  }
  res.json({
    message: 'success',
    data: body
  });
});
  });


//Create a new candidate
//const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
// VALUES (?,?,?,?)`;
//const params = [1, 'Ronald', 'Firbank', 1];

//db.query(sql, params, (err, result) => {
// if (err) {
// console.log(err);
// }
//console.log(result);
//});

//PUT OR UPDATE A CANDIDATES PARTY
app.put('/api/candidate/:id', (req, res) => {
    const errors = inputCheck(req.body, "party_id"); // inputChecker fuction made by module

    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }
    
    const sql = `UPDATE candidates SET party_id = ? 
                 WHERE id = ?`;
    const params = [req.body.party_id, req.params.id]; //FYI The affected row's id should always be part of the route/we should be extra sure that a party_id was provided before we attempt to update the database

    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        // check if a record was found
      } else if (!result.affectedRows) {
        res.json({
          message: 'Candidate not found'
        });
      } else {
        res.json({
          message: 'success',
          data: req.body,
          changes: result.affectedRows
        });
      }
    });
  });



// GET route for all parties:
app.get('/api/parties', (req, res) => {
    const sql = `SELECT * FROM parties`;
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
  });

// GET route for a single party:
app.get('/api/party/:id', (req, res) => {
    const sql = `SELECT * FROM parties WHERE id = ?`;
    const params = [req.params.id];
    db.query(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: row
      });
    });
  });

//DELETE PARTIES:
app.delete('/api/party/:id', (req, res) => {
    const sql = `DELETE FROM parties WHERE id = ?`;
    const params = [req.params.id];
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: res.message });
        // checks if anything was deleted
      } else if (!result.affectedRows) {
        res.json({
          message: 'Party not found'
        });
      } else {
        res.json({
          message: 'deleted',
          changes: result.affectedRows,
          id: req.params.id
        });
      }
    });
  });




//route to handle user requests that arent supported by my app !! Make sure this is the last route always
app.use((req, res) => {
  res.status(404).end();
});

//add the function that will start the server and tell you in console log
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
