import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import "../Styles/TodoCss/OwnTodo.css";
import { MyContext } from "../Components/Context/TodoContext";
import { useNavigate } from "react-router-dom";

const OwnTodo = () => {
  const [ownTodoList, setOwnTodoList] = useState([]);
  const [curUser, setCurUser] = useState({});

  const { state } = useContext(MyContext);

  const route = useNavigate();

  console.log(ownTodoList);

  useEffect(() => {
    if (state?.currentuser) {
      setCurUser(state?.currentuser);
    } else {
      setCurUser({});
    }
  }, [state]);

  useEffect(() => {
    const regUser = JSON.parse(localStorage.getItem("todousers")) || [];

    if (curUser) {
      for (let i = 0; i < regUser.length; i++) {
        if (
          regUser[i].email == curUser.email &&
          regUser[i].password == curUser.password
        ) {
          // console.log(regUser[i]);
          setOwnTodoList(regUser[i].ownTodo);
        }
      }
    }
  }, []);

  return (
    <>
      <Navbar />

      <div className="ownTodoHeader">OWN TODOS</div>

      {/* {ownTodoList.length ? ( */}
      <div className="ownTodoContainer">
        {ownTodoList.map((item) => (
          <div className="ownSingleTodo">
            <h2>{item.sub}</h2>
            <h2>{item.desc}</h2>
          </div>
        ))}
      </div>
      {/* ) : ( */}
      {/* <h2 className="ownTodoHeader">No Own Todos</h2> */}
      {/* )} */}
    </>
  );
};

export default OwnTodo;
