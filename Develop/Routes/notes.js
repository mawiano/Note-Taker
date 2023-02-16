const notes = require("express").Router();
const fs = require("fs");
const util = require("util");
const readFileAsync = util.promisify(fs.readFile);
const uuid = require("uniqid");
const {response} = require(".");

// API get request 
notes.get("/", (req, res) => {
    console.log("here"); 
    console.info(`${req.method} request to get notes received`);
    readFileAsync(`db/sb.json`, "utf8").then((data) => {
        let noteArr = JSON.parse(data);
        console.log(noteArr);
        res.json(noteArr);
    });
});

// Post request for API
notes.post("/", (req, res) => {
    console.log("received");
    console.info(`${req.method} request to add notes received`);
    console.log(req.body);
    
    const {title, text} = req.body;
    
    if (title && text) {
        console.log("if statement");
         const newNote = {
            title,
            text,
            id: uuid(),
         };
         console.log(newNote);
    }
})