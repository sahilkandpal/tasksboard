import React from "react";
const Checkbox = React.forwardRef(({ label, ...props }, ref) => (
  <div className="checkbox-group" {...props}>
    <input type="checkbox" id="remember" name="remember" ref={ref} />
    <label htmlFor="remember">{label}</label>
  </div>
));

export default Checkbox;
