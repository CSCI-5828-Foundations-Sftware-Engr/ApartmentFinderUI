import React, { useState } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
// importing components from react-router-dom package
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//import MaterialUI Roboto Font
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

//import LocalizationProvider and AdapterDayjs for the date and time
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';



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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
    </LocalizationProvider>
  );
}

export default App;
