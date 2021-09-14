import React from "react";
import Newtask from "./Newtask";
import Button from "@material-ui/core/Button";
import MoreVert from "@material-ui/icons/MoreVert";
import Task from "./Task";
const Tasklist = (data) => {
  const { name, Tasks } = data.tasklist;
  const count = Tasks.filter((task) => task.done === true).length;
  return (
    <div className="tasklist">
      <div className="tasklist-heading-group">
        <div className="tasklist-heading">{name}</div>
        <Button className="menu-btn">
          <MoreVert />
        </Button>
      </div>
      <Newtask data={data.tasklist} />
      {Tasks.map(
        (task, index) =>
          !task.done && <Task key={index} task={task} taskListName={name} />
      )}

      {count > 0 && (
        <div className="tasklist-heading completed">Completed ({count})</div>
      )}

      {Tasks.map(
        (task, index) =>
          task.done && <Task key={index} task={task} taskListName={name} />
      )}
    </div>
  );
};

export default Tasklist;
