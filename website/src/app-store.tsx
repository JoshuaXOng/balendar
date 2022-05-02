import { configureStore } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { Note } from './models/note'

export const stylesSlice = createSlice({
  name: 'styles',
  initialState: {
    headerHeight: undefined,
    isHeaderVisable: true,
  },
  reducers: {
    setHeaderHeight(state, action) {
      state.headerHeight = action.payload.headerHeight;
    },
    setIsHeaderVisable(state, action) {
      state.isHeaderVisable = action.payload.isHeaderVisable;
    },
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authToken: localStorage.getItem("BALENDAR_AUTH_TOKEN")
  },
  reducers: {
    setAuthToken(state, action) {
      state.authToken = action.payload.authToken;
    }
  }
})

export const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    allNotes: [] as Note[],
    allNotesIdIndexed: {} as { [key: string]: Note },
    allNotesBegDatetimeIndexed: {} as { [key: string]: Note[] },
    selectedNote: undefined,
    selectedDay: undefined,
    isNoteFormOpen: false,
  },
  reducers: {
    addNote(state, action) {
      const { id, headerText, bodyText, begDatetime, endDatetime, primaryColor } = action.payload;
      state.allNotes.push({
        id, headerText, bodyText, 
        begDatetime, endDatetime, 
        primaryColor
      })
    },
    setAllNotes(state, action) {
      state.allNotes = action.payload.allNotes;

      state.allNotesIdIndexed = {};
      (action.payload.allNotes as Note[]).forEach(n => state.allNotesIdIndexed[n.id] = n);
      
      const anbdi = state.allNotesBegDatetimeIndexed = {} as { [key: string]: Note[] };
      (action.payload.allNotes as Note[]).forEach(n => {
        anbdi[n.begDatetime] ? 
          anbdi[n.begDatetime] = [...anbdi[n.begDatetime], n] :
          anbdi[n.begDatetime] = [n]
      });
    },
    setSelectedNote(state, action) {
      state.selectedNote = action.payload.selectedNote;
    },
    clearSelectedNote(state) {
      state.selectedNote = undefined;
    },
    setSelectedDay(state, action) {
      state.selectedDay = action.payload.selectedDay;
    },
    setIsNoteFormOpen(state, action) {
      state.isNoteFormOpen = action.payload.isNoteFormOpen;
    }
  }
})

export const appStore = configureStore({
  reducer: {
    styles: stylesSlice.reducer,
    auth: authSlice.reducer,
    notes: notesSlice.reducer,
  }
})