import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import "../Styles/TodoCss/CreateTodo.css";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { MyContext } from "../Components/Context/TodoContext";
const CreateTodo = () => {
  const [todo, setTodo] = useState({
    sub: "",
    desc: "",
  });
  const { state } = useContext(MyContext);
  const route = useNavigate();

  //   useEffect(() => {
  //     if (!state?.currentuser) {
  //       route("/login");
  //     }
  //   }, []);

  const handleCreateTodoForm = (e) => {
    const { name, value } = e.target;
    setTodo({ ...todo, [name]: value });
  };

  const handleSubmitCreateTodo = (e) => {
    e.preventDefault();

    const { sub, desc } = todo;
    
    if (sub && desc) {
      const getTodoList = JSON.parse(localStorage.getItem("todolists")) || [];
      const regTodoUser = JSON.parse(localStorage.getItem("todousers"));
      const currentuser = JSON.parse(localStorage.getItem("currenttodouser"));

      const todoObj = {
        ...todo,
        id: uuidv4(),
      };

      for (let i = 0; i < regTodoUser.length; i++) {
        if (regTodoUser[i].email === currentuser.email) {
          regTodoUser[i].ownTodo.push(todoObj);
          localStorage.setItem("todousers", JSON.stringify(regTodoUser));
        }
      }
      getTodoList.push(todoObj);
      localStorage.setItem("todolists", JSON.stringify(getTodoList));
      alert("todo added Success");
      setTodo({
        sub: "",
        desc: "",
      });
      route("/alltodos");
    } else {
      alert("all fileds are mandatory");
    }
  };

  return (
    <>
      <Navbar />

      <div className="createTodoContainer">
        <div className="createTodoFormSection">
          <h1 className="createTodoheader">Create Todo</h1>
          <form className="createTodoForm" onSubmit={handleSubmitCreateTodo}>
            <div>
              <input
                name="sub"
                value={todo.sub}
                type="text"
                placeholder="Enter Subject"
                onChange={handleCreateTodoForm}
              />
            </div>
            <div>
              <input
                name="desc"
                value={todo.desc}
                type="text"
                placeholder="Enter Description"
                onChange={handleCreateTodoForm}
              />
            </div>
            <div>
              <input type="submit" value="Create Todo" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateTodo;
