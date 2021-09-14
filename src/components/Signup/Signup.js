import React, { useState, createRef } from "react";
import { Link, useHistory } from "react-router-dom";
import Heading from "../common/Heading";
import Input from "../common/Input";
import Checkbox from "../common/Checkbox";
import Button from "../common/Button";
import InputError from "../common/InputError";
import { useSignupContext } from "../../context/signupContext";
const Signup = () => {
  const { signupData, changeSignupData } = useSignupContext();
  const history = useHistory();
  const errorsInitialValue = {
    username: "",
    email: "",
    password: "",
    checkbox: "",
    signedup: "",
  };
  const [errors, setErrors] = useState(errorsInitialValue);
  const usernameRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
  const checkboxRef = createRef();
  const regexFormat = {
    emailformat: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  };

  const handleValidation = (username, email, password, checkbox) => {
    const errors = {};
    const { emailformat } = regexFormat;
    if (username.length < 3) {
      errors.username = true;
    }
    if (!email.match(emailformat)) {
      errors.email = true;
    }
    if (password.length < 3) {
      errors.password = true;
    }
    if (!checkbox) {
      errors.checkbox = true;
    }
    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const checkbox = checkboxRef.current.checked;
    const errors = handleValidation(username, email, password, checkbox);

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      const data = { username, email, password };
      if (signupData.length > 0) {
        let signedup = false;
        signupData.map((objdata) => {
          if (objdata.email === data.email) {
            signedup = true;
          }
          return null;
        });
        if (!signedup) {
          handleSignupData(data);
          history.push("/login");
        } else {
          setErrors({ signedup: true });
        }
      } else {
        handleSignupData(data);
        history.push("/login");
      }
    }
  };

  const handleSignupData = (data) => {
    changeSignupData([...signupData, data]);
    setErrors(errorsInitialValue);
  };

  return (
    <div className="signup" onSubmit={handleSubmit}>
      <form className="signup-form">
        <Heading className="signup-form-heading">Sign up</Heading>
        <Input
          type="text"
          name="username"
          id="username"
          placeholder="Enter Name"
          label="Username"
          ref={usernameRef}
        />
        {errors.username && (
          <InputError error="* username must be more than 2 characters" />
        )}
        <Input
          type="text"
          name="email"
          id="email"
          placeholder="Enter Email"
          label="Email Address"
          ref={emailRef}
        />
        {errors.email && <InputError error="* email is invalid" />}
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="Enter Password"
          label="Password"
          ref={passwordRef}
        />
        {errors.password && (
          <InputError error="* password must be more than 2 characters" />
        )}
        <div className="signup-form-options">
          <Checkbox label="I accept the terms & conditions" ref={checkboxRef} />
          <div className="have-account">
            <Link to="/login">Have an account? Log in</Link>
          </div>
        </div>
        {errors.checkbox && (
          <InputError error="* Accept the terms & conditions" />
        )}
        {errors.signedup && <InputError error="Account already exist !" />}
        <Button>Sign up</Button>
      </form>
    </div>
  );
};

export default Signup;
