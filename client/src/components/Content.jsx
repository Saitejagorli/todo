import { useState } from "react";

import { useProjectContext } from "../projectContext";
import { useEffect } from "react";

import Button from "./Button";
import Taskcard from "./Taskcard";
import DialogBox from "./Dialogbox";
import line from "../assets/line.svg";

const lanes = [
  {
    id: 1,
    text: "To Do",
    bgColor: "#EBEEFC",
    textColor: "#3659E2",
    onHover: "#D8E0FD",
  },
  {
    id: 2,
    text: "In Progress",
    bgColor: "#FDF2FA",
    textColor: "#EE46BC",
    onHover: "#FCE7F6",
  },
  {
    id: 3,
    text: "In Review",
    bgColor: "#ECF6FC",
    textColor: "#3FA1E3",
    onHover: "#D1E9FF",
  },
  {
    id: 4,
    text: "Completed",
    bgColor: "#E7F8E9",
    textColor: "#12BB23",
    onHover: "#B6EABB",
  },
];

// formatting the date into DD/MM/YYYY format
const format_Date = (isoDate) => {
  const date = new Date(isoDate);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate; // Output: "30/12/2024"
};

const Content = () => {
  const { projectId, isOpen, setIsOpen } = useProjectContext();
  const [openLane, setOpenLane] = useState(null);
  const [selectedTask, setSelectedTask] = useState({
    name: "",
    startDate: "",
    deadline: "",
    status: "",
  });
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    inReview: [],
    completed: [],
  });

  const handleOpen = (laneText, task = null) => {
    setIsOpen(true);
    setOpenLane(laneText);
    setSelectedTask(
      task
        ? {
            name: task.task_name,
            startDate: format_Date(task.start_date),
            deadline: format_Date(task.deadline),
            status: task.status,
            taskId: task.task_id,
          }
        : {
            name: "",
            startDate: "",
            deadline: "",
            status: laneText,
          }
    );
  };
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/tasks/${projectId}`
        );
        if (response.ok) {
          const res = await response.json();
          const data = res.data;
          const filteredTasks = {
            todo: data.filter((task) => task.status === "To Do"),
            inProgress: data.filter((task) => task.status === "In Progress"),
            inReview: data.filter((task) => task.status === "In Review"),
            completed: data.filter((task) => task.status === "Completed"),
          };
          setTasks(filteredTasks);
        } else {
          console.error("Failed to fetch projects");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchTasks();
  }, [projectId, isOpen]);
  return (
    <div className="flex flex-wrap">
      <div className="h-[61px] w-screen px-6 py-4 border-b  border-[#EBEEFC]">
        <h1 className="text-lg font-semibold">My Projects</h1>
      </div>
      <div className="flex flex-wrap">
        {lanes.map((lane, index) => {
          const laneKey =
            lane.text === "To Do"
              ? "todo"
              : lane.text === "In Progress"
              ? "inProgress"
              : lane.text === "In Review"
              ? "inReview"
              : "completed";
          const laneTasks = tasks[laneKey] || [];
          return (
            <div key={lane.id} className="max-sm:h-auto">
              <div
                className="h-8 flex  justify-center items-center mt-5 ml-6 gap-1 rounded-[20px] max-w-[85px]"
                style={{ backgroundColor: lane.bgColor }}
              >
                <div
                  className="h-[6.4px] w-[6.4px]  rounded-full"
                  style={{ backgroundColor: lane.textColor }}
                />
                <h4
                  className="text-[12px] leading-5"
                  style={{ color: lane.textColor }}
                >
                  {lane.text}
                </h4>
              </div>
              <div className="flex">
                <div className="flex min-h-screen h-auto">
                  <div className="px-6 mt-2">
                    {laneTasks.map((task) => (
                      <Taskcard
                        key={task.task_id}
                        name={task.task_name}
                        startDate={task.start_date}
                        deadline={task.deadline}
                        status={task.status}
                        textColor={lane.textColor}
                        bgColor={lane.bgColor}
                        onClick={() => handleOpen(lane.text, task)}
                      />
                    ))}
                    <Button
                      textColor={lane.textColor}
                      bgColor={lane.bgColor}
                      onHover={lane.onHover}
                      onClick={() => handleOpen(lane.text)}
                    />
                  </div>
                  {index != lanes.length - 1 && (
                    <img
                      className="mt-[20px] min-h-screen"
                      src={line}
                      alt="line"
                    />
                  )}
                </div>
              </div>
              {isOpen && openLane === lane.text && (
                <DialogBox
                  title={selectedTask.name ? "Edit task" : "Add new task"}
                  name={selectedTask.name}
                  startDate={selectedTask.startDate}
                  deadline={selectedTask.deadline}
                  status={lane.text}
                  id={selectedTask.taskId}
                  btnTxt={selectedTask.name ? "Save" : "Add"}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Content;
