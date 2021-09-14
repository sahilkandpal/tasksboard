import React, { createRef } from "react";
import AddBtn from "./AddBtn";
import { useTaskContext } from "../../context/taskContext";
import { v4 as uuidv4 } from "uuid";
const Newtask = (props) => {
  const taskListName = props.data.name;
  const { addTask } = useTaskContext();
  const taskNameRef = createRef();
  const handleSubmit = (event) => {
    event.preventDefault();
    const taskNameValue = taskNameRef.current.value;
    if (taskNameValue.trim() !== "") {
      const task = {
        id: uuidv4(),
        name: taskNameValue.trim(),
        description: "",
        done: false,
      };
      addTask(task, taskListName);
      taskNameRef.current.value = "";
    }
  };
  return (
    <form className="new-task" onSubmit={handleSubmit}>
      <input type="text" name="task" placeholder="New Task" ref={taskNameRef} />
      <AddBtn className="add-btn" type="submit" />
    </form>
  );
};

export default Newtask;
