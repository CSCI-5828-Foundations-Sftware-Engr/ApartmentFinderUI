import React, { useState } from "react";

const OldLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleToggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isSignUp) {
      // TODO: Handle sign-up submission here
    } else {
      // TODO: Handle login submission here
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>{isSignUp ? "Sign up" : "Login"}</h1>
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        {isSignUp && (
          <label>
            Email:
            <input type="email" value={email} onChange={handleEmailChange} />
          </label>
        )}
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <br />
        <button type="submit">{isSignUp ? "Sign up" : "Login"}</button>
        <br />
        <button type="button" onClick={handleToggleSignUp}>
          {isSignUp ? "Back to Login Page" : "Not a user? Click to sign-up!"}
        </button>
      </form>
    </div>
  );
};

export default OldLogin;
