import React, { useState } from "react";
import "./Login.css";
import PropTypes from "prop-types";

async function loginUser(credentials) {
  console.log("Inside login")
  // return fetch("https://apartmentfinder.herokuapp.com/api/v1/login", {
  return fetch("http://localhost:6999/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })
    .then((response) => {
      console.log(response.status)
      //TODO
      //If response status is 200, it means that user has been found in database
      //If response status is 201, it means that user has been found in database but password is incorrect
      //If response status is 202, it means that user is not present in databse and hence redirect to register
      if (response.status == 200) {
        return "error";
        // throw new Error(response.statusText);
      } else {
        return response.json();
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

async function registerUser(credentials) {
  // return fetch("https://apartmentfinder.herokuapp.com/api/v1/register", {
  return fetch("http://localhost:6999/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(credentials),
  })
    .then((response) => {
      //TODO
      //if the response status is 200, then the user has been registered.
      //if the response status is 404, then the user has not been registered.(Because username was already there)
      //can we add a functionality that all the fields in the register form are added by the user?
      console.log(response.status)
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
}

export default function Login({ setToken }) {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [isSignUp, setIsSignUp] = useState(false);
  const [contactNo, setContact] = useState();
  const [name, setName] = useState();
  const [emailId, setEmail] = useState();

  const handleToggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignUp) {
      // TODO: Handle sign-up submission here
      const token = await registerUser({
        name,
        password,
        userName,
        emailId,
        contactNo,
      });
      setToken(token);
    } else {
      const token = await loginUser({
        userName,
        password,
      });
      if (token == "error") {
        setIsSignUp(true);
      } else setToken(token);
    }
  };

  return (
    <div className="login-wrapper">
      <h1>{isSignUp ? "Sign up" : "Login"}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={(e) => setUserName(e.target.value)} />
        </label>
        <br />
        {isSignUp && (
          <label>
            Name:
            <input type="text" onChange={(e) => setName(e.target.value)} />
          </label>
        )}
        {isSignUp && (
          <label>
            Email:
            <input type="email" onChange={(e) => setEmail(e.target.value)} />
          </label>
        )}
        {isSignUp && (
          <label>
            Contact No:
            <input type="tel" onChange={(e) => setContact(e.target.value)} />
          </label>
        )}
        <br />
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">{isSignUp ? "Please Sign up" : "Login"}</button>
        </div>
        <button type="button" onClick={handleToggleSignUp}>
          {isSignUp ? "Back to Login Page" : "Not a user? Click to sign-up!"}
        </button>
      </form>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
