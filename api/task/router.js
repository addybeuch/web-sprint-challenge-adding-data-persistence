const express = require("express");
const router = express.Router();
const Task = require("./model");

router.get("/", (req, res) => {
  Task.getTasks()
    .then((tasks) => {
      res.status(200).json(tasks);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

router.post("/", (req, res) => {
  Task.addTask(req.body)
    .then((task) => {
      res.status(201).json(task);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

module.exports = router;
