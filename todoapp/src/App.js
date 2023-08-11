import "./App.css";
import Register from "./Components/Register";
import Home from "./Components/Home";
import Login from "./Components/Login";
import { Routes, Route } from "react-router-dom";
import CreateTodo from "./TodoSections/CreateTodo";
import AllTodo from "./TodoSections/AllTodo";
import OwnTodo from "./TodoSections/OwnTodo";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/createtodo" element={<CreateTodo />} />
          <Route exact path="/alltodos" element={<AllTodo />} />
          <Route exact path="/owntodo" element={<OwnTodo />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
