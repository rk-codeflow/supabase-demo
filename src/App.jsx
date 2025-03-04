import { useState } from "react";
import { Route, BrowserRouter, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Update from "./pages/Update";
import Signup from "./pages/Signup";
import Login from "./pages/authComp/Login";
import Email from "./pages/authComp/Email";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <h1>Supa smoothies</h1>
        <Link to="/">Home</Link>
        <Link to="/create">Create New Smoothie</Link>
        <Link to="/signup">Github Signup</Link>
        <Link to="/email">Email Signup</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/:id" element={<Update />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/email" element={<Email />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
