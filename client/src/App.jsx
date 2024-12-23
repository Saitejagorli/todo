import { ProjectProvider } from "./projectContext.jsx";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";

function App() {
  return (
    <ProjectProvider>
      <div className="flex">
        <Sidebar />
        <Content />
      </div>
    </ProjectProvider>
  );
}

export default App;
