import React from "react";

const Card = ({ smoothie }) => {
  console.log("Card details =>>>", smoothie);
  return (
    <div className="smoothie-card">
      <h3>{smoothie.title}</h3>
      <p>{smoothie.method}</p>
      <div className="rating">{smoothie.rating}</div>
    </div>
  );
};

export default Card;
