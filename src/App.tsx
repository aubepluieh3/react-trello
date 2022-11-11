import React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./Components/Board";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHatWizard } from "@fortawesome/free-solid-svg-icons";
import NewBoard from "./Components/NewBoard";
import { BrowserRouter } from "react-router-dom";

const Title = styled.div`
  font-family: "Paytone One", sans-serif;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  svg {
    font-size: 64px;
    margin: 10px 0px 3px 0px;
  }
  svg + span {
    font-size: 30px;
    margin-bottom: 17px;
  }

  span:last-child {
    transition: transform 2s ease-in;
    &:hover {
      transform: rotateX(90deg) scale(5);
    }
  }
`;

const NewBoardBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  max-width: 980px;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: auto;
  flex-direction: column;
`;

const Boards = styled.div`
  margin: 13px 0px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      //same board movement.
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }
    if (destination.droppableId !== source.droppableId) {
      // cross board movement
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        const destinationBoard = [...allBoards[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Title>
            <FontAwesomeIcon icon={faHatWizard} />
            <span>kt wiz</span>
            <span>✨SHOW MAGIC TEAM KT✨</span>
          </Title>
          <NewBoardBox>
            <NewBoard />
          </NewBoardBox>
          <Boards>
            {Object.keys(toDos).map((boardId) => (
              <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
            ))}
          </Boards>
        </Wrapper>
      </DragDropContext>
    </BrowserRouter>
  );
}

export default App;
