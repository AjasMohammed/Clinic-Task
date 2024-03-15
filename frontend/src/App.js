import "./App.css";
import { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Routes, redirect } from "react-router-dom";
import Auth from "./Pages/Auth/Auth";
import Home from './Pages/Home/Home'
import Appointment from './Pages/Appointment/Appointment'

import { userContext } from "./Store/Context";

function App() {
  const { islogged } = useContext(userContext);
  useEffect(() => {
    if (islogged === false) {
      return redirect("/login");
    }
  }, []);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route path="/login" Component={Auth} />
          <Route path="/appointment/:id" Component={Appointment} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
