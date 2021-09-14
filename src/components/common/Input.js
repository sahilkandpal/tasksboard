import React from "react";

const Input = React.forwardRef(({ label, ...props }, ref) => (
  <div className="custom-input">
    <input {...props} ref={ref}></input>
    <fieldset aria-hidden="true">
      <legend>
        <span>{label}</span>
      </legend>
    </fieldset>
  </div>
));

export default Input;
