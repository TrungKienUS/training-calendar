import React from "react";
import { Droppable } from "react-beautiful-dnd";
import "./index.scss";

const List = ({ children, title, name, index }) => {
  const getAllDayOfWeek = () => {
    return Array(7)
      .fill(new Date())
      .map((el, idx) =>
        getDayOfWeek(new Date(el.setDate(el.getDate() - el.getDay() + idx + 1)))
      );
  };

  const getDayOfWeek = (date) => {
    return Number(new Date(date).toLocaleString("en", { day: "numeric" }));
  };

  return (
    <div className="calendar-list">
      <p className="calendar-list__title">{title}</p>
      <div className="calendar-list__content">
        <p
          className={`calendar-list__content__title ${
            getDayOfWeek(new Date()) === getAllDayOfWeek()[index] &&
            "calendar-list__content__title--purple"
          }`}
        >
          {getAllDayOfWeek()[index]}
        </p>
        <Droppable droppableId={name}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              className="calendar-list__content__body"
            >
              {children}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default List;
