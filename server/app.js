const express = require("express");
const cors = require("cors");
require("dotenv").config();

const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);

app.listen(process.env.PORT || 8000, () => {
  console.log(`server running at port ${process.env.PORT}`);
});
