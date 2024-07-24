import { createContext, useContext, useEffect, useState } from "react";
// import {toast} from 'react-toastify'
// 1)  Context

export const AuthContext = createContext();

// 2) Provider

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const [user, setUser] = useState("");

  const authorizationToken = `Bearer ${token}`;

  const storeTokenInloclStr = (servertoken) => {
    setToken(servertoken);
    return localStorage.setItem("token", servertoken);
  };

  let isLoggedIn = !!token;

  const LogoutUser = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/logout-user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser("");
        setToken("");
        alert("User Logout Success")
        return localStorage.removeItem("token");
      }
    } catch (error) {
      console.log("Error Fetching User data", error);
    }
  };

  const getCurrentUser = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/user-me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
      });
      console.log("AUTH user data", response);

      if (response.ok) {
        const data = await response.json();
        console.log("Current User Data", data);
        setUser(data);
      }
    } catch (error) {
      console.log("Error Fetching User data", error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, [token]);
  console.log(user, "Aedbasdvasdvasdf");
  return (
    <AuthContext.Provider
      value={{
        storeTokenInloclStr,
        isLoggedIn,
        LogoutUser,
        user,
        token,
        authorizationToken,
        getCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);

  if (!authContextValue) {
    throw new Error("useAuth used Outside of Provider");
  }
  return authContextValue;
};
