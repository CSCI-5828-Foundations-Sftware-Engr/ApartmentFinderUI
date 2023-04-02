import React, { useState } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
// importing components from react-router-dom package
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Login component
import Login from "./components/Login";
// import Home component
import Home from "./components/Home";
import Property from "./components/Property";

function App() {
  const [token, setToken] = useState();

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div className="App">
      <h1>ApartmentFinder</h1>
      <Router>
        <Routes>
          <Route path="/" exact element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/property/:id" element={<Property />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
