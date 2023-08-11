import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import "../Styles/TodoCss/OwnTodo.css";
import { MyContext } from "../Components/Context/TodoContext";
import { useNavigate } from "react-router-dom";

const OwnTodo = () => {
  const [ownTodoList, setOwnTodoList] = useState([]);

  const { state } = useContext(MyContext);

  const route = useNavigate();

  console.log(ownTodoList);

  // useEffect(() => {
  //   if (!state?.currentuser) {
  //     route("/login");
  //   }
  // }, [state]);

  useEffect(() => {
    const curruser = JSON.parse(localStorage.getItem("currenttodouser"));
    const regUser = JSON.parse(localStorage.getItem("todousers"));

    if (curruser) {
      for (let i = 0; i < regUser[i].length; i++) {
        if (regUser[i].email === curruser.email) {
          // console.log(regUser[i]);
          setOwnTodoList(regUser[i].ownTodo);
        }
      }
    }
  }, [ownTodoList]);

  return (
    <>
      <Navbar />

      <div className="ownTodoHeader">OWN TODOS</div>

      {ownTodoList.length ? (
        <div className="ownTodoContainer">
          {ownTodoList.map((item) => (
            <div>
              <div className="ownData">
                <h2>{item.sub}</h2>
                <h2>{item.desc}</h2>
              </div>
              <div className="editDel">
                <button>Edit</button>
                <button>Delete</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h2 className="ownTodoHeader">No Own Todos</h2>
      )}
    </>
  );
};

export default OwnTodo;
