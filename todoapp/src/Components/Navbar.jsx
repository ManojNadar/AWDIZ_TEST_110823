import React, { useContext } from "react";
import "../Styles/Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { MyContext } from "./Context/TodoContext";

const Navbar = () => {
  const { state, logout } = useContext(MyContext);
  const route = useNavigate();
  return (
    <>
      <div className="nav">
        <div className="logo">
          <h1 onClick={() => route("/")}>My Todo</h1>
        </div>

        <div className="navigations">
          <NavLink to="/createtodo">Create Todo</NavLink>
          <NavLink to="/alltodos">All Todos</NavLink>
          <NavLink to="/owntodo">Own Todos</NavLink>
          {state?.currentuser ? (
            <NavLink onClick={() => logout()}>LOGOUT</NavLink>
          ) : (
            <NavLink to="/login">Login/Register</NavLink>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
