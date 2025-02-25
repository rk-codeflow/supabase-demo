import React from "react";
import { Link } from "react-router-dom";

const Card = ({ smoothie }) => {
  return (
    <div className="smoothie-card">
      <h3>{smoothie.title}</h3>
      <p>{smoothie.method}</p>
      <div className="rating">{smoothie.rating}</div>
      <div className="buttons">
        <Link to={"/" + smoothie.id}>
          <span class="material-symbols-outlined">edit</span>
        </Link>
      </div>
    </div>
  );
};

export default Card;
