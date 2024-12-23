import { useEffect, useState } from "react";
import { useProjectContext } from "../projectContext";
import axios from "axios";

import Cross from "../assets/cross.svg";


const Projectscomponent = () => {
  const { projectId, setProjectId } = useProjectContext();
  const [projects, setProjects] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [error, setError] = useState("");
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const handleChange = (e) => {
    setProjectName(e.target.value);
    setError("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (projectName == "") {
      setError("Please enter project name");
      return;
    }
    try {
      const response = await axios({
        method: "POST",
        url: `${import.meta.env.VITE_BACKEND_URL}/projects`,
        data: { projectName: projectName },
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
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/projects`
        );
        if (response.ok) {
          const res = await response.json();
          setProjects(res.data);
          if (res.data.length > 0) {
            setProjectId(res.data[0].project_id);
          }
        } else {
          console.error("Failed to fetch projects");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchProjects();
  }, [isOpen]);

  return (
    <>
      <div className="flex flex-col px-2.5 py-6 gap-2.5 border-b border-[#EBEEFC]">
        {projects.map((project) => (
          <div
            key={project.project_id}
            className={`h-11 w-[220px] ${
              projectId == project.project_id ? "bg-[#EBEEFC]" : ""
            } hover:bg-[#EBEEFC] rounded-lg px-6 py-2.5`}
            onClick={() => setProjectId(project.project_id)}
          >
            <h4 className="text-base">{project.project_name}</h4>
          </div>
        ))}
      </div>
      <button
        className="text-xs font-medium leading-5 text-[#3659E2] px-6 py-2 ml-3 mt-1 outline-none focus:outline-none"
        onClick={handleOpen}
      >
        <span className=" h-[9.6px] w-[9.6px]">+</span> Add new Project
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-[670px]  h-[210px]  rounded-lg shadow-lg">
            <div className="h-[52px] px-6 py-2.5  flex justify-between items-center border-b border-[#D8E0FD]">
              <h4 className="text-base leading-6  text-[#263FA0]">
                Add the project
              </h4>
              <img src={Cross} alt="cancel" onClick={handleClose} />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="px-6 py-4 border-b flex flex-col gap-1 border-[#D8E0FD]">
                <div className="h-[70px] w-[622px] flex flex-col mb-2">
                  <label
                    className="text-sm  text-gray-600 ml-1 mb-1"
                    htmlFor="name"
                  >
                    Name of the project
                  </label>
                  <input
                    className="h-12 w-[622px] py-1 px-3 rounded-lg border focus:outline-none text-base font-normal leading-6 text-left underline-offset-4 decoration-none"
                    name="projectName"
                    onChange={handleChange}
                    placeholder="New project"
                  />
                  <p className="h-4 text-[12px]  leading-5 text-[#E92B2B] mt-1 ml-1">
                    {error}
                  </p>
                </div>
              </div>
              <div className="px-6 py-2  flex justify-end gap-1">
                <button
                  onClick={handleClose}
                  className="h-8 w-[69px] rounded-lg px-2 py-2 bg-[#EBEEFC] hover:bg-[#dbe1ff] leading-5 text-[12px] text-[#1B72C2]  mr-2 outline-none focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  className="h-8 w-[55px] bg-[#3659E2] text-white px-2 py-2 rounded-lg leading-5 text-[12px] outline-none focus:outline-none"
                  type="submit"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Projectscomponent;
