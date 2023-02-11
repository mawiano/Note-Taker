const express = require("express");
// using this path to send to notes.html
const path = require("path");
// requiring the index.js file 
const api = require("./routes/index.js")

const PORT = process.env.PORT || 3001;
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: true }));
app.use("api", api);