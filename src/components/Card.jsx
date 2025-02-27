import React from "react";
import supabase from "../config/supabaseClient";
import { Link } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const Card = ({ smoothie, onDelete }) => {
  const handleDelete = async () => {
    const { data, error } = await supabase
      .from("supabase")
      .delete()
      .eq("id", smoothie.id);

    if (error) {
      console.log(error);
    } else {
      onDelete(smoothie.id);
      console.log(data);
    }
  };

  return (
    <div className="smoothie-card">
      <h3>{smoothie.title}</h3>
      <p>{smoothie.method}</p>
      <div className="rating">{smoothie.rating}</div>
      <div className="buttons">
        <Link to={"/" + smoothie.id}>
          <MdModeEdit />
        </Link>
        <div onClick={handleDelete}>
          <MdDelete />
        </div>
      </div>
    </div>
  );
};

export default Card;
