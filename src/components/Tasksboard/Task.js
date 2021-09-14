import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import CircleChecked from "@material-ui/icons/CheckCircleOutline";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import { useTaskContext } from "../../context/taskContext";
import Editmodal from "./Editmodal";
const Task = ({ task, taskListName }) => {
  const { changeStatus } = useTaskContext();
  const { id, done } = task;
  const handleStatus = () => {
    changeStatus(taskListName, id);
  };
  return (
    <div className="task">
      <Checkbox
        className="task-checkbox"
        icon={<CircleUnchecked className="unchecked-circle" />}
        checkedIcon={<CircleChecked className="checked-circle" />}
        color="primary"
        onChange={handleStatus}
        checked={task.done}
      />
      <div className="task-text">
        <div className="task-text-name">{task.name}</div>
        <div className="task-text-description">{task.description}</div>
      </div>
      {!done && <Editmodal task={task} taskListName={taskListName} />}
    </div>
  );
};

export default Task;
