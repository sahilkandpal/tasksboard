import React from "react";

const Button = ({ children, ...props }) => {
  return (
    <button className="btn-light" {...props}>
      {children}
    </button>
  );
};

export default Button;
