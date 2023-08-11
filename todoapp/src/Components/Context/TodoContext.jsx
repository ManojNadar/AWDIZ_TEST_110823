import React, { createContext, useEffect, useReducer } from "react";

export const MyContext = createContext();

const initialState = { currentuser: null };

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        currentuser: action.payload,
      };
    case "LOGOUT":
      return {
        currentuser: null,
      };

    default:
      return state;
  }
};

const TodoContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = (userData) => {
    localStorage.setItem("currenttodouser", JSON.stringify(userData));
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };

  const logout = () => {
    localStorage.removeItem("currenttodouser");
    dispatch({
      type: "LOGOUT",
    });
  };

  useEffect(() => {
    const getCurrentUser = JSON.parse(localStorage.getItem("currenttodouser"));
    if (getCurrentUser) {
      dispatch({
        type: "LOGIN",
        payload: getCurrentUser,
      });
    }
  }, []);

  return (
    <>
      <MyContext.Provider value={{ state, login, logout }}>
        {children}
      </MyContext.Provider>
    </>
  );
};

export default TodoContext;
