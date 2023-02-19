const notes = require("express").Router();
const fs = require("fs");
const util = require("util");
const readFileAsync = util.promisify(fs.readFile);
const uuid = require("uniqid");
const { response } = require(".");

notes.get("/", (req, res) => {
  console.info(`${req.method} request received to get notes`);

  readFileAsync(`db/db.json`, "utf8").then((data) => {
    let noteArr = JSON.parse(data);

    res.json(noteArr);
  });
});

notes.post("/", (req, res) => {
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuid(), // ~ installed npm uuid package
    };

    fs.readFile("db/db.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
      } else {
        console.log("data:", data);

        let noteArr = JSON.parse(data);

        noteArr.push(newNote);
        console.log("note array:", noteArr);

        fs.writeFile(`db/db.json`, JSON.stringify(noteArr, null, "\t"), (err) =>
          err
            ? console.error(err)
            : console.log(
                `Note for ${newNote.noteTitle} has been written to JSON file`
              )
        );
      }
    });

    const response = {
      status: "success",
      body: newNote,
    };

    res.status(201).json(response);
  } else {
    res.status(500).json("Error in posting note");
  }
});

// *BONUS*
// delete clicked note
notes.delete(`/:id`, (req, res) => {
  fs.readFile("db/db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      let noteArr = JSON.parse(data);

      const deletedArr = noteArr.filter(function (note) {
        if (note.id != req.params.id) {
          return note;
        }
      });

      fs.writeFile(
        `db/db.json`,
        JSON.stringify(deletedArr, null, "\t"),
        (err) => (err ? console.error(err) : res.json(deletedArr))
      );
    }
  });
});

module.exports = notes;
