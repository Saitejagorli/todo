const express = require("express");

const {
  getTasks,
  insertTask,
  updateTask,
} = require("../controllers/taskController");
const router = express.Router();

router.get("/:projectid", getTasks);
router.post("/", insertTask);
router.patch("/:id", updateTask);
module.exports = router;
