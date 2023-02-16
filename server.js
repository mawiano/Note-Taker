const express = require("express");
// using this path to send to notes.html
const path = require("path");
// requiring the index.js file 
const api = require("./Routes/index.js")

const PORT = process.env.PORT || 3001;
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: true }));
app.use("api", api);

// using HTML and CSS from the public older
app.use(express.static("public"));

// get route to return notes.html 
app.get("/notes", (req, res) => {
res.sendFile(path.join(__dirname, "/public/index.html"));
console.info(`${req.method} request was received for notes html file`);
});

// get route to return index.html, GET * should return the index.html file.
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
    console.info(`${req.method} request received to get index.html file`);
});

// function to listen for the PORT
app.listen(PORT, () =>
console.log(`App is listening on http://localhost:${PORT}`)
);
