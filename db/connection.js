const mysql = require("mysql2");



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




  module.exports = db;