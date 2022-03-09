import React from "react";
const Card = ({ children, title, description, image, link }) => {
  return (
    <div className="card">
        <h1>{title}</h1>
        <img alt={image} src={image}/>
        <p>{description}</p>
    </div>
  );
};

export default Card;