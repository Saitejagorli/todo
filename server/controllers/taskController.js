const pool = require("../config/db");

const getTasks = async (req, res) => {
  const { projectid } = req.params;
  try {
    const [rows, fields] = await pool.query(
      `SELECT * FROM tasks WHERE project_id = ${projectid}`
    );
    res.status(200).json({ message: "successfull", data: rows });
  } catch (err) {
    console.log(err);
  }
};

const insertTask = async (req, res) => {
  const { projectId, name, startDate, deadline, status } = req.body;
  try {
    const query = `
    INSERT INTO tasks (project_id, task_name, start_date, deadline, status)
    VALUES (?, ?, ?, ?, ?)
  `;
    const values = [projectId, name, startDate, deadline, status];

    const [rows, fields] = await pool.query(query, values);

    res.status(201).json({ message: "Task successfully added", data: rows });
  } catch (err) {
    console.log(err);
  }
};

const updateTask = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  let query = "UPDATE tasks SET ";
  let values = [];
  let fieldsToUpdate = [];
  if (data.name) {
    fieldsToUpdate.push("task_name = ?");
    values.push(data.name);
  }
  if (data.startDate) {
    fieldsToUpdate.push("start_date = ?");
    values.push(data.startDate);
  }
  if (data.deadline) {
    fieldsToUpdate.push("deadline = ?");
    values.push(data.deadline);
  }
  if (data.status) {
    fieldsToUpdate.push("status = ?");
    values.push(data.status);
  }
  if (fieldsToUpdate.length === 0) {
    return res.status(400).json({ message: "No fields to update" });
  }
  query += fieldsToUpdate.join(", ") + " WHERE task_id = ?";
  values.push(id);
  try {
    const [rows] = await pool.query(query, values);

    if (rows.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({
      message: "Task updated successfully",
      data: rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { getTasks, insertTask, updateTask };
