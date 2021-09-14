import React from "react";
const Heading = ({ children, ...props }) => {
  return <h3 {...props}>{children}</h3>;
};

export default Heading;
