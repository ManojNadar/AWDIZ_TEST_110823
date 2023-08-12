import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import "../Styles/TodoCss/OwnTodo.css";
import { MyContext } from "../Components/Context/TodoContext";
import { useNavigate } from "react-router-dom";

const OwnTodo = () => {
  const [ownTodoList, setOwnTodoList] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [updateTodo, setUpdateTodo] = useState({});
  const route = useNavigate();

  console.log(updateTodo);

  const { state } = useContext(MyContext);

  // console.log(ownTodoList);

  useEffect(() => {
    if (!state?.currentuser) {
      route("/");
    }
  }, [state, route]);

  useEffect(() => {
    const regUser = JSON.parse(localStorage.getItem("todousers"));

    if (state?.currentuser) {
      for (let i = 0; i < regUser.length; i++) {
        if (
          regUser[i].email === state?.currentuser?.email &&
          regUser[i].password === state?.currentuser?.password
        ) {
          setOwnTodoList(regUser[i].ownTodo);
        }
      }
    }
  }, [state]);

  const deleteSingleTodo = (id) => {
    const currentuser = JSON.parse(localStorage.getItem("currenttodouser"));
    const regUser = JSON.parse(localStorage.getItem("todousers"));

    const allTodoData = JSON.parse(localStorage.getItem("todolists"));

    if (currentuser) {
      const filterData = ownTodoList.filter((e) => e.id !== id);
      for (let i = 0; i < regUser.length; i++) {
        if (regUser[i].email === currentuser.email) {
          regUser[i].ownTodo = filterData;
          setOwnTodoList(filterData);
          localStorage.setItem("todousers", JSON.stringify(regUser));
          alert("todo removed");
        }
      }
    }
  };

  const openEditModal = (id) => {
    setEditModal(true);

    const myTodoList = ownTodoList.find((e) => e.id === id);

    if (myTodoList) {
      setUpdateTodo(myTodoList);
    }
  };

  const closeEditModal = () => {
    setEditModal(false);
  };

  const handleUpdateTodo = (e) => {
    const { name, value } = e.target;
    setUpdateTodo({ ...updateTodo, [name]: value });
  };

  const handleUpdateTodoForm = (e) => {
    e.preventDefault();

    const { sub, desc } = updateTodo;

    const regUser = JSON.parse(localStorage.getItem("todousers"));
    const curuser = JSON.parse(localStorage.getItem("currenttodouser"));

    if (sub && desc) {
      for (let i = 0; i < regUser.length; i++) {
        if (regUser[i].email === curuser.email) {
          regUser[i].ownTodo.sub = updateTodo.sub;
          regUser[i].ownTodo.desc = updateTodo.desc;

          localStorage.setItem("todousers", JSON.stringify(regUser));
          alert("update success");
          setEditModal(false);
        }
      }
    }
  };
  return (
    <>
      <Navbar />
      <div className="ownTodoHeader">OWN TODOS</div>

      {editModal ? (
        <form onSubmit={handleUpdateTodoForm} className="editTodoSection">
          <p onClick={closeEditModal}>X</p>

          <div>
            <input
              type="text"
              placeholder="UPDATE SUBJECT"
              onChange={handleUpdateTodo}
              name="sub"
              value={updateTodo.sub}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="UPDATE DESCRIPTION"
              onChange={handleUpdateTodo}
              name="desc"
              value={updateTodo.desc}
            />
          </div>
          <div>
            <input type="submit" value="UPDATE TODO" />
          </div>
        </form>
      ) : null}

      {ownTodoList?.length ? (
        <div>
          {ownTodoList.map((item) => (
            <div className="ownSingleTodo" key={item.id}>
              <h2>SUBJECT : {item.sub}</h2>
              <h2>DESCRIPTION : {item.desc}</h2>
              <button className="edit" onClick={() => openEditModal(item.id)}>
                Edit
              </button>
              <button
                onClick={() => deleteSingleTodo(item.id)}
                className="delete"
              >
                Delete
              </button>
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
