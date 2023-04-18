import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import App from "../App";

test("renders Username", () => {
  const { getByText } = render(<App />);
  const component = getByText("Username");
  expect(component).toBeInTheDocument();
});

test("renders Password", () => {
  const { getByText } = render(<App />);
  const component = getByText("Password");
  expect(component).toBeInTheDocument();
});

test("renders Login button", () => {
  const { getByRole } = render(<App />);
  const component = getByRole("button", { name: "Login" });
  expect(component).toBeInTheDocument();
});

test("renders Signup option on login page", () => {
  const { getByRole } = render(<App />);
  const component = getByRole("button", {
    name: "Not a user? Click to sign-up!",
  });
  expect(component).toBeInTheDocument();
});

test("render Signup page", () => {
  render(<App />);
  const signupbutton = screen.getByRole("button", {
    name: "Not a user? Click to sign-up!",
  });
  fireEvent.click(signupbutton);
  const username = screen.getByText("Username");
  expect(username).toBeInTheDocument();

  const name = screen.getByText("Name:");
  expect(name).toBeInTheDocument();

  const email = screen.getByText("Email:");
  expect(email).toBeInTheDocument();

  const contact = screen.getByText("Contact No:");
  expect(contact).toBeInTheDocument();

  const pass = screen.getByText("Password");
  expect(pass).toBeInTheDocument();

  const signup = screen.getByRole("button", {
    name: "Please Sign up",
  });
  expect(signup).toBeInTheDocument();

  const login = screen.getByRole("button", {
    name: "Back to Login Page",
  });
  expect(login).toBeInTheDocument();
});
