import React, { useState, createRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import { useTaskContext } from "../../context/taskContext";
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 450,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 1, 2),
    top: "50%!important",
    left: "50%!important",
    transform: "translate(-50%, -50%)!important",
    color: "#20447c",
    [theme.breakpoints.down("sm")]: {
      width: 290,
    },
  },
}));

export default function Editmodal({ task, taskListName }) {
  const { editTask, deleteTask } = useTaskContext();
  const { id, name, description, done } = task;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const taskNameRef = createRef();
  const descriptionRef = createRef();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    const taskName = taskNameRef.current.value.trim();
    const newdescription = descriptionRef.current.value.trim();
    if (taskName !== name || newdescription !== description) {
      const data = { id, name: taskName, description: newdescription, done };
      editTask(id, data, taskListName);
    }
  };

  const handleDelete = () => {
    deleteTask(id, taskListName);
    handleClose();
  };

  const body = (
    <div className={`${classes.paper} editmodal`}>
      <div className="top-options">
        <Button onClick={handleDelete}>
          <DeleteOutlineIcon />
        </Button>
        <Button onClick={handleClose}>
          <CloseIcon />
        </Button>
      </div>
      <div className="bottom-options">
        <input
          type="text"
          defaultValue={name}
          placeholder="Add name"
          ref={taskNameRef}
        />
        <textarea
          rows="5"
          placeholder="Add details"
          defaultValue={description}
          ref={descriptionRef}
        />
        <Button className="datepicker-toggle">
          <span className="datepicker-toggle-button">Add date</span>
          <input className="add-date" type="date" />
        </Button>
        <br />
        <Button className="move">Move to another list</Button>
      </div>
    </div>
  );

  return (
    <div className="editmodal">
      <Button className="edit-btn" onClick={handleOpen}>
        <CreateOutlinedIcon />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className="modal"
      >
        {body}
      </Modal>
    </div>
  );
}
