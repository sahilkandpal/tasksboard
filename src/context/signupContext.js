import { createContext, useState, useContext } from "react";
export const signupContext = createContext({
  signupData: [],
  changeSignupData: () => {},
});

const localdata = JSON.parse(localStorage.getItem("signupdata"));

const initialValue = localdata ? localdata : [];

export const SignupContextProvider = ({ children }) => {
  const [signupData, setSignupData] = useState(initialValue);
  const changeSignupData = (data) => {
    setSignupData(data);
    localStorage.setItem("signupdata", JSON.stringify(data));
  };
  return (
    <signupContext.Provider value={{ signupData, changeSignupData }}>
      {children}
    </signupContext.Provider>
  );
};

export const useSignupContext = () => {
  const { signupData, changeSignupData } = useContext(signupContext);
  return { signupData, changeSignupData };
};
