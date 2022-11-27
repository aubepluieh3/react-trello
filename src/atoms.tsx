import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export interface IPlayer {
  id: number;
  text: string;
}

interface IPlayerState {
  [key: string]: IPlayer[];
}

//localStorage
const { persistAtom } = recoilPersist({
  key: "todoLocal",
  storage: localStorage,
});

export const playerState = atom<IPlayerState>({
  key: "toDo",
  default: {
    Pitcher: [],
    Catcher: [],
    Outfielder: [],
    Infielder: [],
  },
  effects_UNSTABLE: [persistAtom],
});
