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
          <h1 onClick={() => route("/")}>Todo</h1>
        </div>

        <div className="navigations">
          <NavLink to="/createtodo">Create Todo</NavLink>
          <NavLink to="/alltodos">All Todo's</NavLink>
          <NavLink to="/owntodo">Own Todo's</NavLink>
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
