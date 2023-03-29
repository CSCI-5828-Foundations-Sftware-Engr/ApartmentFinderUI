import React, { useState } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
// importing components from react-router-dom package
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Login component
import Login from "./components/Login";
// import Home component
import Home from "./components/Home";
import { Navigate } from "react-router-dom";

function App() {
  const [token, setToken] = useState();

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <>
      <div className="App">
        <h1>WIP - ApartmentFinder</h1>
      </div>
      <Router>
        <Routes>
          {/* <Route exact path="/Login" element={<Login />} />
        <Route exact path="/Home" element={<Home />} /> */}
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
