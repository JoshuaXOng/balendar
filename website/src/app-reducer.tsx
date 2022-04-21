import { useReducer } from "react";

type State = {
  isAsideOpen: boolean
};

type Action = {
  type: string
};

export function appReducer(state: State, action: Action) {
  switch (action.type) {
    case 'open-aside':
      return { isAsideOpen: true };
    case 'close-aside':
      return { isAsideOpen: false };
    default:
      throw new Error("No case could match the action.");
  }
}

export const initialAppState: State = {
  isAsideOpen: true
};