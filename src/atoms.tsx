import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export interface ITodo {
  id: number;
  text: string;
}

interface IToDoState {
  [key: string]: ITodo[];
}

//localStorage
const { persistAtom } = recoilPersist({
  key: "todoLocal",
  storage: localStorage,
});

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    Pitcher: [],
    Catcher: [],
    Outfielder: [],
    Infielder: [],
  },
  effects_UNSTABLE: [persistAtom],
});
