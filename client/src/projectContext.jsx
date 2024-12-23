import { createContext, useState, useContext } from "react";

// Create the context
const ProjectContext = createContext();

// Create a provider component
export const ProjectProvider = ({ children }) => {
  const [projectId, setProjectId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ProjectContext.Provider
      value={{
        projectId,
        setProjectId,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

// Custom hook to use the context
export const useProjectContext = () => {
  return useContext(ProjectContext);
};
