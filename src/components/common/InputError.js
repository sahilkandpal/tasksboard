import React from "react";

const InputError = ({ error, ...props }) => {
  return (
    <div className="input-error" {...props}>
      {error}
    </div>
  );
};

export default InputError;
