import { ReactNode, useCallback, useEffect, useState } from "react";
import { Task } from "../models/Task";
import { TasksContext } from "./context";
import apiClient from "../clients";
import CreateTask from "../models/CreateTask";
import signalRService from "../services/signalrService";

const TasksContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const getList = useCallback(async () => {
    const savedTasks = await apiClient.getTasks();
    setTasks(savedTasks);
    console.log("savedTasks", savedTasks);
    return savedTasks as Task[];
  }, []);

  useEffect(() => {
    const initialize = async () => {
      await getList();
      signalRService.startConnection();
      signalRService.onTaskUpdated(async (updatedTask: Task) => {
        await getList();
      });
    };

    initialize();
  }, [getList]);

  const removeTask = async (id: string) => {
    const status = await apiClient.deleteTask(id);
    return status;
  };

  const handleComplete = (id: string) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      task.status = "Completed";
      task.isCompleted = true;
      updateTask(task);
    }
  };

  const addTask = (task: CreateTask) => {
    console.log("task", task);

    const status = apiClient.createTask(task);
    return status;
  };

  const updateTask = (task: Task) => {
    const status = apiClient.updateTask(task);
    return status;
  };

  const providerValue = {
    taskList: tasks,
    addTask,
    removeTask,
    updateTask,
    handleComplete,
  };

  return (
    <TasksContext.Provider value={providerValue}>
      {children}
    </TasksContext.Provider>
  );
};

export { TasksContextProvider, TasksContext };
