import React from "react";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
const AddBtn = ({ ...props }) => {
  return (
    <Button {...props}>
      <AddIcon />
    </Button>
  );
};

export default AddBtn;
