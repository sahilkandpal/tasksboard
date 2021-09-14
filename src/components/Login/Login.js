import React, { createRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Heading from "../common/Heading";
import Input from "../common/Input";
import Checkbox from "../common/Checkbox";
import Button from "../common/Button";
import InputError from "../common/InputError";
import { useSignupContext } from "../../context/signupContext";
import { useAuthContext } from "../../context/authContext";
const Login = () => {
  const history = useHistory();
  const { signupData } = useSignupContext();
  const { login } = useAuthContext();
  const errorsInitialValue = {
    email: "",
    password: "",
    isInvalid: "",
  };
  const [errors, setErrors] = useState(errorsInitialValue);
  const emailRef = createRef();
  const passwordRef = createRef();
  const checkboxRef = createRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const checkbox = checkboxRef.current.checked;
    const errors = handleValidation(email, password);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      const credentials = checkCredentials(email, password);
      if (credentials) {
        if (checkbox) login(credentials);
        else login();
        setErrors(errorsInitialValue);
        history.push("/");
      } else {
        setErrors({ isInvalid: true });
      }
    }
  };

  const handleValidation = (email, password) => {
    const errors = {};
    if (email.length === 0) {
      errors.email = true;
    }
    if (password.length === 0) {
      errors.password = true;
    }
    return errors;
  };

  const checkCredentials = (email, password) => {
    if (signupData.length > 0) {
      const [credentials] = signupData.map((objdata) => {
        if (objdata.email === email && objdata.password === password) {
          return objdata;
        }
        return null;
      });
      return credentials;
    }
  };

  return (
    <div className="login">
      <form className="login-form" onSubmit={handleSubmit}>
        <Heading className="login-form-heading">Log in!</Heading>
        <Input
          type="text"
          name="email"
          id="email"
          placeholder="Enter Email"
          label="Email Address"
          ref={emailRef}
        />
        {errors.email && <InputError error="* This field is required" />}
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="Enter Password"
          label="Password"
          ref={passwordRef}
        />
        {errors.password && <InputError error="* This field is required" />}
        <div className="login-form-options">
          <Checkbox label="Remember me" ref={checkboxRef} />
          <div className="forgot-password">
            <a href="##">Forgot Password?</a>
          </div>
        </div>
        <div className="make-account">
          <Link to="/signup">Don't have an account? Sign up</Link>
        </div>
        {errors.isInvalid && (
          <InputError error="Email address or password is invalid !" />
        )}
        <Button>Log in</Button>
      </form>
    </div>
  );
};

export default Login;
