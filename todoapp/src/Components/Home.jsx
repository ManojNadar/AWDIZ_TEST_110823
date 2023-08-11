import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "../Styles/Home.css";
import { MyContext } from "./Context/TodoContext";

const Home = () => {
  const route = useNavigate();

  const { state } = useContext(MyContext);
  // useEffect(() => {
  //   const getCurrentuser = JSON.parse(localStorage.getItem("currenttodouser"));

  //   if (!getCurrentuser) {
  //     route("/login");
  //   }
  // }, []);

  return (
    <>
      <Navbar />

      {state?.currentuser ? (
        <h1 className="welcomeHome">
          WELCOME TO TODOS APP <p> {state?.currentuser?.name.toUpperCase()}</p>
        </h1>
      ) : (
        <h1 className="welcomeHome">WELCOME TO TODOS APP</h1>
      )}
    </>
  );
};

export default Home;
