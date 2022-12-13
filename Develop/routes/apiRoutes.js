const express = require("path");
const router = require("express").Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

router.get("/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    res.send(data);
  });
});

router.post("/notes", (req, res) => {
  const { title, text, id } = req.body;

  if (req.body) {
    const newNotes = {
      title,
      text,
      id: uuidv4(),
    };

    const fileData = JSON.parse(fs.readFileSync("./db/db.json"));
    fileData.push(newNotes);
    fs.writeFileSync("./db/db.json", JSON.stringify(fileData, null));
    res.redirect(req.get("referer"));
  }
});

router.delete("/notes/:id", (req, res) => {
  const fileData = JSON.parse(fs.readFileSync("./db/db.json"));
  let index = fileData.findIndex((obj) => {
    return obj.id === req.params.id;
  });
  fileData.splice(index, 1);
  fs.writeFileSync("./db/db.json", JSON.stringify(fileData, null));
  res.redirect(req.get("referer"));
});

module.exports = router;
