import React from "react";
import Tasklist from "./Tasklist";
import AddListModal from "./AddListModal";
import { useTaskContext } from "../../context/taskContext";
const Taskslists = () => {
  const { taskData } = useTaskContext();
  const { tasklists } = taskData;
  return (
    <div className="tasklists">
      {tasklists.map((tasklist, index) => (
        <Tasklist key={index} tasklist={tasklist} />
      ))}
      <AddListModal />
    </div>
  );
};

export default Taskslists;
