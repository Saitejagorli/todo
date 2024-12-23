const pool = require("../config/db");

const getProjects = async (req, res) => {
  try {
    const [rows, fields] = await pool.query("SELECT * FROM projects");
    res.status(200).json({ message: "successfull", data: rows });
  } catch (err) {
    console.log(err);
  }
};

const insertProject = async (req, res) => {
  const { projectName } = req.body; // Access data from req.body
  if (!projectName) {
    return res.status(400).json({ error: "Project name is required" });
  }

  try {
    const query = "INSERT INTO projects (project_name) VALUES (?)";
    const [rows, fields] = await pool.query(query, [projectName]);
    res
      .status(201)
      .json({ message: "Project created successfully", data: [rows] });
  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).json({ error: "Unexpected Error" });
  }
};

module.exports = { getProjects, insertProject };
