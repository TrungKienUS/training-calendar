import { useState } from "react";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { mockupData } from "./data/trainingSeason";
import "./index.scss";
import List from "./List/index";
import TrainingSeason from "./TrainingSeason";

const TrainingCalendarManagement = () => {
  const [items, setItems] = useState(mockupData);

  const removeFromList = (list, index) => {
    const result = Array.from(list);
    const [removed] = result.splice(index, 1);
    return [removed, result];
  };

  const addToList = (list, index, element) => {
    const result = Array.from(list);
    result.splice(index, 0, element);
    return result;
  };

  const handleAddExercise = (parent, name) => {
    const newExercise = {
      id: `${parent.parentId}_${name}`,
      title: `Exercise ${name}`,
      number: "3x",
      info: "60 lb x 6",
    };

    const listCopy = { ...items };
    listCopy[parent.itemKey][parent.childIndex]["exercises"][
      parent.exerciseKey
    ]?.push(newExercise);

    setItems(listCopy);
  };

  const onDragEnd = (result, provider) => {
    if (!result.destination) {
      return;
    }
    const listCopy = { ...items };

    const sourceList = listCopy[result.source.droppableId];
    const [removedElement, newSourceList] = removeFromList(
      sourceList,
      result.source.index
    );
    listCopy[result.source.droppableId] = newSourceList;

    const destinationList = listCopy[result.destination.droppableId];
    listCopy[result.destination.droppableId] = addToList(
      destinationList,
      result.destination.index,
      removedElement
    );

    setItems(listCopy);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="training-calendar">
          {Object.keys(items).map((itemKey, itemIndex) => (
            <List title={itemKey} name={itemKey} index={itemIndex}>
              {items[itemKey].map((item, index) => (
                <Draggable
                  key={item.id}
                  draggableId={item.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div>
                      <div
                        ref={provided.innerRef}
                        {...provided?.draggableProps}
                        {...provided?.dragHandleProps}
                      >
                        {Object.keys(item.exercises).map(
                          (exerciseKey, exerciseIndex) => (
                            <TrainingSeason
                              title={exerciseKey}
                              parent={{
                                itemKey: itemKey,
                                parentId: item.id,
                                childIndex: index,
                                itemIndex: itemIndex,
                                exerciseKey: exerciseKey,
                              }}
                              data={item.exercises[exerciseKey]}
                              handleAddExercise={handleAddExercise}
                            />
                          )
                        )}
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
            </List>
          ))}
        </div>
      </DragDropContext>
    </>
  );
};

export default TrainingCalendarManagement;
