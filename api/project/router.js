const express = require("express");
const router = express.Router();
const Project = require("./model");

router.get("/", (req, res) => {
  Project.getProjects()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

router.post("/", (req, res) => {
  Project.addProject(req.body)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

module.exports = router;
