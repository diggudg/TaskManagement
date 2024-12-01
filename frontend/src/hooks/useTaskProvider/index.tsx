import { useContext } from "react";
import { TasksContext } from "../../contexts";
const useTaskProvider = () => {
  const context = useContext(TasksContext);

  /* istanbul ignore if  */
  if (context === undefined) {
    throw new Error("Task context is not defined");
  }

  return context;
};

export default useTaskProvider;
