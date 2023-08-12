import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import "../Styles/TodoCss/AllTodo.css";
import { MyContext } from "../Components/Context/TodoContext";

const AllTodo = () => {
  const [allTodoData, setAllTodoData] = useState([]);
  const { state } = useContext(MyContext);

  useEffect(() => {
    if (state?.todoData?.length) {
      setAllTodoData(state?.todoData);
    } else {
      setAllTodoData([]);
    }
  }, [state]);
  return (
    <>
      <Navbar />
      <h2 className="allTodoheader">All Todos</h2>

      {allTodoData.length ? (
        <div className="todoContainer">
          <div className="singleTodo">
            {allTodoData.map((item) => (
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
