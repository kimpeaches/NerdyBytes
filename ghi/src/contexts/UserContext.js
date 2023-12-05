import React, { createContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const value = {
    user,
    login: (userData) => {
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    },
    logout: () => {
      localStorage.removeItem("user");
      setUser(null);
    },
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
