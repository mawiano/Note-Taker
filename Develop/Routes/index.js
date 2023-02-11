// Route to the notes.js
const express = require("express");
const notesRouter = require(".notes");
const app = express();
app.use("./notes", notesRouter);

modeule.exports = app; 