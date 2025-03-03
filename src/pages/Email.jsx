import React, { use, useState } from "react";
import supabase from "../config/supabaseClient";
import { Navigate } from "react-router-dom";

const Email = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [inputError, setInputError] = useState("");

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

    if (!name || !email || !password) {
      setInputError("Please fill in all fields");
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        name: name,
        email: email,
        password: password,
        options: {
          emailRedirectTo: "http://localhost:5173/email",
        },
      });

      if (error) {
        console.log("Error during sign up: ", error);
      }

      if (data) {
        console.log("Sign-up successful. Data:", data);
        console.log("Confirmation email sent to:", email);
        setInputError(null);
      }
    } catch (err) {
      console.log("unexpected error: ", err);
    }
  };

  return (
    <div className="page email">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleChange}
        />
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
        <button type="submit">Sign Up</button>
      </form>

      {inputError && <p style={{ textAlign: "center" }}>{inputError}</p>}
    </div>
  );
};

export default Email;
