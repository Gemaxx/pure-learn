import { createContext, useState } from "react";

export const userCont = createContext("");

export default function UserProvideer({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));

  function logOut() {
    setToken(null);
    localStorage.removeItem("token");
  }

  return (
    <userCont.Provider value={{ token, setToken, logOut }}>
      {children}
    </userCont.Provider>
  );
}
