import React, { useState } from "react";
import supabase from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.title || !formData.method || !formData.rating) {
      setFormError("Please fill in all fields");
      return;
    }

    console.log("Submitting form data:", formData);

    let { data, error } = await supabase.from("supabase").insert([
      {
        title: formData.title,
        method: formData.method,
        rating: formData.rating,
      },
    ]);

    if (error) {
      console.log("Supabase error:", error);
      setFormError(error.message);
      return;
    }

    if (data) {
      console.log("Supabase data:", data);
      setFormError(null);
      console.log("Redirecting to home page...");
      navigate("/");
    }
  };

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          name="title"
          id="title"
          type="text"
          value={formData.title || ""}
          onChange={handleChange}
        />

        <label htmlFor="method">Method</label>
        <textarea
          name="method"
          id="method"
          value={formData.method || ""}
          onChange={handleChange}
        ></textarea>

        <label htmlFor="rating">Rating</label>
        <input
          type="number"
          id="rating"
          name="rating"
          value={formData.rating || ""}
          onChange={handleChange}
        />

        <button type="submit">Create smoothies</button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default Create;
