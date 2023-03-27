import React from "react";
import { BiDotsHorizontal } from "react-icons/bi";
import { BsPlusCircleFill } from "react-icons/bs";
import Card from "../Card";
import "./index.scss";

const TrainingSeason = ({ title, data, handleAddExercise, parent }) => {
  const generateAlphabet = () => {
    return [...Array(26)].reduce(
      (prev, cur, i, arr) => ({
        ...prev,
        [String.fromCharCode(i + 97).toUpperCase()]: String.fromCharCode(
          i === arr.length - 1 ? 97 : i + 98
        ).toUpperCase(),
      }),
      {}
    );
  };

  return (
    <div className="training-season">
      <div className="training-season__header">
        <p className="training-season__header__title">{title}</p>
        <div className="training-season__header__icon">
          <BiDotsHorizontal />
        </div>
      </div>
      <div className="training-season__content">
        {data.map((item) => (
          <Card key={item.id} data={item} />
        ))}
      </div>
      <div className="training-season__footer">
        <button
          className="training-season__footer__icon"
          onClick={() =>
            handleAddExercise(
              parent,
              generateAlphabet()[data[data.length - 1]?.title.slice(-1) || ""]
            )
          }
        >
          <BsPlusCircleFill />
        </button>
      </div>
    </div>
  );
};

export default TrainingSeason;
