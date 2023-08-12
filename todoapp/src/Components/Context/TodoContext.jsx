import React, { createContext, useEffect, useReducer } from "react";

export const MyContext = createContext();

const initialState = { currentuser: null, todoData: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        currentuser: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        currentuser: null,
      };
    case "TODO":
      return {
        ...state,
        todoData: action.payload,
      };

    default:
      return state;
  }
};

const TodoContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state.todoData);

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

  const todoList = (todoDataList) => {
    localStorage.setItem("todolists", JSON.stringify(todoDataList));

    dispatch({
      type: "TODO",
      payload: todoDataList,
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

    const allTodo = JSON.parse(localStorage.getItem("todolists"));
    dispatch({
      type: "TODO",
      payload: allTodo,
    });
  }, []);

  return (
    <>
      <MyContext.Provider value={{ state, login, logout, todoList }}>
        {children}
      </MyContext.Provider>
    </>
  );
};

export default TodoContext;
