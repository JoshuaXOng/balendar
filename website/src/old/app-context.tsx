import React from 'react';
import { Note } from '../models/note';

type AppContextProps = {
  header: {
    height: number | undefined
  },
  allNotes: Note[];
  balendarCalendarSetAllNotes: React.Dispatch<React.SetStateAction<Note[]>>
}

export const AppContext = React.createContext<AppContextProps>({
  header: {
    height: undefined,
  },
  allNotes: [],
  balendarCalendarSetAllNotes: () => {}
});