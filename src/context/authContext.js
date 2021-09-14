import { createContext, useState, useContext } from "react";
export const authContext = createContext({
  isLogin: "",
  login: () => {},
  logout: () => {},
});

const localdata = JSON.parse(localStorage.getItem("logindata"));

const initialValue = localdata ? true : false;

export const AuthContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(initialValue);
  const login = (data) => {
    setIsLogin(true);
    if (data) localStorage.setItem("logindata", JSON.stringify(data));
  };
  const logout = (data) => {
    setIsLogin(false);
    localStorage.removeItem("logindata", JSON.stringify(data));
  };
  return (
    <authContext.Provider value={{ isLogin, login, logout }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuthContext = () => {
  const { isLogin, login, logout } = useContext(authContext);
  return { isLogin, login, logout };
};
