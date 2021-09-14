import React, { useState, createRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { useTaskContext } from "../../context/taskContext";
import AddBtn from "./AddBtn";
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 450,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4, 3, 3),
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
  const { addTaskList } = useTaskContext();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const listNameRef = createRef();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addList = () => {
    const listName = listNameRef.current.value.trim();
    if (listName !== "") {
      addTaskList(listName);
      handleClose();
    }
  };

  const body = (
    <div className={`${classes.paper} addlistmodal`}>
      <div className="options">
        <input type="text" placeholder="New List" ref={listNameRef} />
        <AddBtn className="real-add-btn" onClick={addList} />
      </div>
    </div>
  );

  return (
    <div className="addlistmodal">
      <AddBtn className="add-tasklist-btn" onClick={handleOpen} />
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
