import React from "react";
import "./index.scss";

const Card = ({ data: { title, info, number } }) => {
  return (
    <div className="card">
      <div className="card__title">{title}</div>
      <div className="card__content">
        <div className="card__content__left">{number}</div>
        <div className="card__content__right">{info}</div>
      </div>
    </div>
  );
};

export default Card;
