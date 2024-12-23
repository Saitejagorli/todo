const express = require("express");

const {
  getProjects,
  insertProject,
} = require("../controllers/projectController");

const router = express.Router();

router.get("/", getProjects);
router.post("/", insertProject);

module.exports = router;
