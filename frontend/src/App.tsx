import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MainNavbar from "./components/MainNavbar";
import TaskList from "./components/TaskList";
import { TasksContextProvider } from "./contexts";

function App() {
  return (
    <div className="App">
      <TasksContextProvider>
        <MainNavbar />
        <TaskList />
      </TasksContextProvider>
    </div>
  );
}

export default App;
