import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import "../Styles/TodoCss/AllTodo.css";

const AllTodo = () => {
  const [allTodo, setAllTodo] = useState([]);

  useEffect(() => {
    const getTodo = JSON.parse(localStorage.getItem("todolists")) || [];

    if (getTodo?.length) {
      setAllTodo(getTodo);
    } else {
      setAllTodo([]);
    }
  }, []);
  return (
    <>
      <Navbar />
      <h2 className="allTodoheader">All Todos</h2>

      {allTodo.length ? (
        <div className="todoContainer">
          <div className="singleTodo">
            {allTodo.map((item) => (
              <div className="subDesc" key={item.id}>
                <h3>Subject : {item.sub}</h3>
                <h3>Description : {item.desc}</h3>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h1 className="allTodoheader">Empty Todo List</h1>
        </div>
      )}
    </>
  );
};

export default AllTodo;
