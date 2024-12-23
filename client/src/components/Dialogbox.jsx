import Cross from "../assets/cross.svg";
import React, { useState } from "react";
import { useProjectContext } from "../projectContext";
import axios from "axios";

const DialogBox = ({
  title,
  name,
  startDate,
  deadline,
  status,
  id,
  btnTxt,
}) => {
  const { isOpen, setIsOpen, projectId } = useProjectContext();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [task, setTask] = useState({
    projectId: projectId,
    name: name,
    startDate: startDate,
    deadline: deadline,
    status: status,
  });

  const statuses = [
    { value: "To Do", color: "#3659E2" },
    { value: "In Progress", color: "#EE46BC" },
    { value: "In Review", color: "#3FA1E3" },
    { value: "Completed", color: "#12BB23" },
  ];

  const [errors, setErrors] = useState({
    name: "",
    startDate: "",
    deadline: "",
  });

  const handleClose = () => setIsOpen(false);

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
  const selectStatus = (status) => {
    setTask((prev) => ({ ...prev, status: status.value }));
    setDropdownOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear the error for the specific field
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (task.name === "") newErrors.name = "Please fill the task name";
    if (task.startDate === "")
      newErrors.startDate = "Please fill the start date";
    if (task.deadline === "")
      newErrors.deadline = "Please fill the deadline date";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const method = title === "Edit task" ? "PATCH" : "POST";
      const url =
        title === "Edit task"
          ? `${import.meta.env.VITE_BACKEND_URL}/tasks/${id}`
          : `${import.meta.env.VITE_BACKEND_URL}/tasks`;

      const updatedTask = {};
      if (task.name !== name) updatedTask.name = task.name;
      if (task.startDate !== startDate) updatedTask.startDate = task.startDate;
      if (task.deadline !== deadline) updatedTask.deadline = task.deadline;
      if (task.status !== status) updatedTask.status = task.status;
      const response = await axios({
        method,
        url,
        data: method == "POST" ? task : updatedTask,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200 || response.status === 201) {
        handleClose();
      } else {
        console.error("Error: " + response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white w-[670px]  h-[388px]  rounded-lg shadow-lg">
          <div className="h-[52px] px-6 py-2.5  flex justify-between items-center border-b border-[#D8E0FD]">
            <h4 className="text-base leading-6  text-[#263FA0]">{title}</h4>
            <img src={Cross} alt="cancel" onClick={handleClose} />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="px-6 py-4 border-b flex flex-col gap-1 border-[#D8E0FD]">
              <div className="h-[80px] w-[622px] flex flex-col mb-2">
                <label className="text-sm  text-gray-600 ml-1" htmlFor="name">
                  Name of the Task
                </label>
                <input
                  className="h-12 w-[622px] py-1 px-3 rounded-lg border focus:outline-none text-base font-normal leading-6 text-left underline-offset-4 decoration-none"
                  name="name"
                  value={task.name}
                  onChange={handleChange}
                  placeholder="Text"
                />
                <p className="h-4 text-[12px]  leading-5 text-[#E92B2B] mt-1 ml-1">
                  {errors.name}
                </p>
              </div>

              <div className="mb-2 grid grid-cols-2 gap-4">
                <div>
                  <label
                    className="block  text-sm font-medium text-gray-600 mb-1 ml-1"
                    htmlFor="startDate"
                  >
                    Start date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={task.startDate}
                    onChange={handleChange}
                    className="w-[306px] h-[44px] px-3 py-1 border  rounded-lg  focus:outline-none"
                  />
                  <p className="text-[12px] h-4 leading-5 text-[#E92B2B] mt-1 ml-1">
                    {errors.startDate}
                  </p>
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-gray-600 mb-1 ml-1"
                    htmlFor="deadline"
                  >
                    Deadline
                  </label>
                  <input
                    type="date"
                    name="deadline"
                    value={task.deadline}
                    onChange={handleChange}
                    className="w-[306px] h-[44px] px-3 py-2 border rounded-lg  focus:outline-none "
                  />
                  <p className="h-4 text-[12px] leading-5 text-[#E92B2B] mt-1 ml-1">
                    {errors.deadline}
                  </p>
                </div>
              </div>
              <div className="relative">
                {/* Selected Status (Clickable Button) */}
                <label className="block text-sm font-sm text-gray-600 mb-1 ml-1">
                  Status
                </label>
                <button
                  type="button"
                  onClick={toggleDropdown}
                  className="w-full px-3 py-1 bg-white border rounded-lg shadow-sm flex items-center justify-between focus:outline-none"
                >
                  <div className="flex items-center">
                    <span className="h-8 pt-1 leading-6 text-base text-gray-700">
                      {task.status}
                    </span>
                  </div>
                  {/* Dropdown Arrow */}
                  <svg
                    className={`w-4 h-4 text-gray-500 transform transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>

                {/* Dropdown List */}
                {isDropdownOpen && (
                  <div className="absolute mt-2 w-full bg-white border rounded-lg shadow-lg z-10">
                    {statuses.map((status) => (
                      <div
                        key={status.value}
                        className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => selectStatus(status)}
                      >
                        {/* Circle in front of the status */}
                        <span
                          className={`w-[12.8px] h-[12.8px] rounded-full`}
                          style={{ backgroundColor: status.color }}
                        ></span>
                        <span className=" ml-2 text-base leading-6 text-gray-700">
                          {status.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="px-6 py-2  flex justify-end gap-1">
              <button
                onClick={handleClose}
                className="h-8 w-[69px] rounded-lg px-2 py-2 bg-[#EBEEFC] hover:bg-[#dbe1ff] leading-5 text-[12px] text-[#1B72C2]  mr-2"
              >
                Cancel
              </button>
              <button
                className="h-8 w-[55px] bg-[#3659E2] text-white px-2 py-2 rounded-lg leading-5 text-[12px]"
                type="submit"
              >
                {btnTxt}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DialogBox;
