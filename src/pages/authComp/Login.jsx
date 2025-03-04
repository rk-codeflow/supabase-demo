import React, { use, useState } from "react";
import supabase from "../../config/supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import Signup from "../Signup";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputError, setInputError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setInputError("Please fill in all fields");
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        // options: {
        //   emailRedirectTo: "http://localhost:5173/login",
        // },
      });

      if (error) {
        console.log("Error during sign up: ", error);
        setInputError(error.message);
        return;
      }

      if (data) {
        console.log("Log in successful. Data:", data);
        setIsLoggedIn(true);
        setInputError(null);
      }
    } catch (err) {
      console.log("unexpected error: ", err);
    }
  };

  return (
    <div className="page email">
      {isLoggedIn ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p>Congratulations! ${name} Logged in successfully!</p>
          <button>Log out</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
          />

          <button type="submit">Log in</button>
          <p>
            Don't have an account? <Link to="/email">Sign up</Link>
          </p>
        </form>
      )}

      {inputError && (
        <p style={{ textAlign: "center", color: "red" }}>{inputError}</p>
      )}
    </div>
  );
};

export default Login;
