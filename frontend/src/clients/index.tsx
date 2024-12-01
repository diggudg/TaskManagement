import axios from "axios";
import CreateTask from "../models/CreateTask";
import { Task } from "../models/Task";

const apiClient = {
  getTasks: async () => {
    const response = await axios.get("http://localhost:5001/usertasks");
    return response.data;
  },

  getTaskById: async (id: string) => {
    const response = await axios.get(`http://localhost:5001/usertasks/${id}`);
    return response.data;
  },

  createTask: async (data: CreateTask) => {
    const response = await axios.post("http://localhost:5001/usertasks", data);
    return response.data;
  },

  updateTask: async (data: Task) => {
    const response = await axios.put(`http://localhost:5001/usertasks`, data);
    return response.data;
  },

  deleteTask: async (id: string) => {
    const response = await axios.delete(
      `http://localhost:5001/usertasks/${id}`
    );
    return response.data;
  },
};

export default apiClient;
