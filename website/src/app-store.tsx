import { configureStore } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { Note } from './models/note'
import { getAllNotes } from './services/notes-api';

export const stylesSlice = createSlice({
  name: 'styles',
  initialState: {
    headerHeight: undefined
  },
  reducers: {
    setHeaderHeight(state, action) {
      state.headerHeight = action.payload.headerHeight;
    }
  }
})

export const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    allNotes: [] as Note[]
  },
  reducers: {
    addNote(state, action) {
      const { id, headerText, bodyText, begDatetime, endDatetime, backgroundColor } = action.payload;
      state.allNotes.push({
        id, headerText, bodyText, 
        begDatetime, endDatetime, 
        backgroundColor
      })
    },
    setAllNotes(state, action) {
      state.allNotes = action.payload.allNotes
    } 
  }
})

export const appStore = configureStore({
  reducer: {
    styles: stylesSlice.reducer,
    notes: notesSlice.reducer,
  }
})