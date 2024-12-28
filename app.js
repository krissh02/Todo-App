const express = require("express");
const bodyParser = require('body-parser');
const todos = require("./routes/todos.js");
const dotenv = require('dotenv');

// dot env config
dotenv.config()

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/todos', todos);


app.listen(PORT, ()=> { console.log(`Server running on http://localhost:${PORT}`)})