import React, { useContext, useState } from "react";
import "../Styles/Login.css";
import { NavLink, useNavigate } from "react-router-dom";
import { MyContext } from "./Context/TodoContext";

const Login = () => {
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });
  const { login } = useContext(MyContext);
  const route = useNavigate();

  const handleLoginuser = (e) => {
    const { name, value } = e.target;
    setLoginUser({ ...loginUser, [name]: value });
  };

  const handleLoginForm = (e) => {
    e.preventDefault();

    const { email, password } = loginUser;

    if (email && password) {
      const regTodoUser = JSON.parse(localStorage.getItem("todousers"));

      let currenttodouser;
      let flag = false;
      for (let i = 0; i < regTodoUser.length; i++) {
        if (
          regTodoUser[i].email === email &&
          regTodoUser[i].password === password
        ) {
          flag = true;
          currenttodouser = regTodoUser[i];
        }
      }

      if (flag) {
        login(currenttodouser);
        alert("Loggedin Success");
        route("/");
        setLoginUser({
          email: "",
          password: "",
        });
      } else {
        alert("invalid credentials");
        setLoginUser({
          email: "",
          password: "",
        });
      }
    } else {
      alert("all fields are mandatory");
    }
  };

  return (
    <>
      <div className="registerContainer">
        <div className="loginForm">
          <h3 className="headerForm">Login</h3>
          <form onSubmit={handleLoginForm}>
            <div>
              <input
                value={loginUser.email}
                name="email"
                type="email"
                placeholder="Enter email"
                onChange={handleLoginuser}
              />
            </div>
            <div>
              <input
                name="password"
                type="password"
                placeholder="Enter password"
                value={loginUser.password}
                onChange={handleLoginuser}
              />
            </div>

            <div>
              <input type="submit" value="Register" />
            </div>
          </form>

          <div className="alreadyUser">
            <NavLink to="/register">New User ? register here</NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
