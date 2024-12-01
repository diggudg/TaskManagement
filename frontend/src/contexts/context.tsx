import { createContext } from "react";
import { Task } from "../models/Task";
import CreateTask from "../models/CreateTask";

type TaskContextType = {
  taskList: Task[];
  addTask: (task: CreateTask) => void;
  removeTask: (id: string) => void;
  updateTask: (task: Task) => void;
  handleComplete: (id: string) => void;
};

export const TasksContext = createContext<TaskContextType | undefined>(
  undefined
);
