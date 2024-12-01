import { Task } from "./Task";

type CreateTask = Omit<Task, "id">;

export default CreateTask;
