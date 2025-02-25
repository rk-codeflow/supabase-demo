import React, { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("supabase")
        .select()
        .eq("id", id)
        .single();

      console.log(data);

      if (error) {
        console.log(error);
      } else {
        setFormData(data);
        console.log("Data in else block:", data);
      }
    };

    fetchData();
  }, []);

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

    try {
      let { data, error } = await supabase
        .from("supabase")
        .update([
          {
            title: formData.title,
            method: formData.method,
            rating: formData.rating,
          },
        ])
        .eq("id", id);

      if (error) {
        setFormError("Please fill in all fields");
      } else {
        setFormError(null);
        console.log(data);
        navigate("/");
      }
    } catch (error) {
      setFormError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="page update">
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

        <button type="submit">Update smoothies table</button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default Update;
