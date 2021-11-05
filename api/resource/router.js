const express = require("express");
const router = express.Router();
const Project = require("./model");

router.get("/", (req, res) => {
  Project.getResources()
    .then((resources) => {
      res.status(200).json(resources);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

router.post("/", (req, res) => {
  Project.addResource(req.body)
    .then((resource) => {
      res.status(201).json(resource);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

module.exports = router;
