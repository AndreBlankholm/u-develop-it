//import Express
const express = require('express');

//PORT designation
const PORT = process.env.PORT || 3001;
const app = express();
//Express.js middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());






//route to handle user requests that arent supported by my app !! Make sure this is the last route always
app.use((req, res) => {
 res.status(404).end();
});

//add the fuction that will start the server and tell you in console log
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
