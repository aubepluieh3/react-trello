import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";
import React from "react";

const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
  input {
    font-size: 16px;
    border: 0;
    background-color: white;
    width: 80%;
    padding: 10px;
    border-radius: 5px;
    text-align: center;
    margin: 0 auto;
  }
`;

interface IForm {
  name: string;
}

function PlayerBoard() {
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const setBoard = useSetRecoilState(toDoState);

  const onValid = ({ name }: IForm) => {
    setBoard((currentBoards) => {
      return {
        ...currentBoards,
        [name]: [],
      };
    });

    setValue("name", "");
  };

  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <input
        {...register("name", { required: true })}
        type="text"
        placeholder="Add Board here!"
      />
    </Form>
  );
}

export default React.memo(PlayerBoard);
