import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser } from "@fortawesome/free-solid-svg-icons";

const Card = styled.div<{ isDragging: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px;
  font-family: "Jua", sans-serif;
  background-color: ${(props) =>
    props.isDragging ? "#e8d29c" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.05)" : "none"};
`;

const DelBtn = styled.button<{ isDragging: boolean }>`
  background-color: ${(props) =>
    props.isDragging ? "#e8d29c" : props.theme.cardColor};
  border: none;
  font-size: 15px;
  color: black;
  &:hover {
    cursor: pointer;
    color: coral;
  }
`;

interface IDragabbleCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
  boardId: string;
}

function DragabbleCard({
  toDoId,
  toDoText,
  index,
  boardId,
}: IDragabbleCardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = () => {
    console.log(index);
    setToDos((allBoards) => {
      const sourceBoard = [...allBoards[boardId]];
      sourceBoard.splice(index, 1);
      return { ...allBoards, [boardId]: sourceBoard };
    });
  };
  return (
    <Draggable draggableId={toDoId + ""} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          <span>⚾</span>
          <span>{toDoText}</span>
          <DelBtn onClick={onClick} isDragging={snapshot.isDragging}>
            <FontAwesomeIcon icon={faEraser} />
          </DelBtn>
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DragabbleCard);
