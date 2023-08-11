import React, { useState } from "react";
import "../Styles/Register.css";
import { NavLink, useNavigate } from "react-router-dom";

const Register = () => {
  const [regUser, setRegUser] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
    ownTodo: [],
  });

  const route = useNavigate();

  const handleChangeregUser = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setRegUser({ ...regUser, [name]: value });
  };

  const handleRegForm = (e) => {
    e.preventDefault();

    const { name, email, password, cPassword } = regUser;

    if (name && email && password && cPassword) {
      if (password.length > 5) {
        if (password === cPassword) {
          const regTodoUser =
            JSON.parse(localStorage.getItem("todousers")) || [];

          let flag = false;
          for (let i = 0; i < regTodoUser.length; i++) {
            if (regTodoUser[i].email === email) {
              flag = true;
            }
          }

          if (!flag) {
            const todoUserObj = {
              ...regUser,
            };
            regTodoUser.push(todoUserObj);
            localStorage.setItem("todousers", JSON.stringify(regTodoUser));
            alert("Registered Successfully");
            setRegUser({
              name: "",
              email: "",
              password: "",
              cPassword: "",
            });

            route("/login");
          } else {
            alert("user already registered Please try Login");
            route("/login");
          }
        } else {
          alert("password doesnot match");
        }
      } else {
        alert("password must contain atleast 5 or more characters");
      }
    } else {
      alert("please fill all the fields");
    }
  };
  return (
    <>
      <div className="registerContainer">
        <div className="registerForm">
          <h3 className="headerForm">Register</h3>

          <form onSubmit={handleRegForm}>
            <div>
              <input
                onChange={handleChangeregUser}
                name="name"
                type="text"
                placeholder="Enter username"
                value={regUser.name}
              />
            </div>
            <div>
              <input
                onChange={handleChangeregUser}
                name="email"
                type="email"
                placeholder="Enter email"
                value={regUser.email}
              />
            </div>
            <div>
              <input
                name="password"
                type="password"
                placeholder="Enter password"
                onChange={handleChangeregUser}
                value={regUser.password}
              />
            </div>
            <div>
              <input
                name="cPassword"
                type="password"
                placeholder="Confirm password"
                onChange={handleChangeregUser}
                value={regUser.cPassword}
              />
            </div>
            <div>
              <input type="submit" value="Register" />
            </div>
          </form>

          <div className="alreadyUser">
            <NavLink to="/login">Already an User ? Login</NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
