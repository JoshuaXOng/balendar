import { useEffect, useRef, useState } from 'react';
import { Box, Modal } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { appStore, notesSlice } from '../../app-store';
import BalendarCalendar from '../../components/balendar-calendar/balendar-calendar';
import NoteForm from '../../components/note-form/note-form';

export function CalendarPage() {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!appStore.getState().auth.authToken)
      navigate("/login/");
  }, []);
  
  const [isNoteFormOpen, setIsNoteFormOpen] = useState(false);
  useEffect(() => {
    appStore.subscribe(() => {
      setIsNoteFormOpen(appStore.getState().notes.isNoteFormOpen);
    })
  }, [appStore.getState().notes.isNoteFormOpen])

  const handleOnModalExitClick = () => {
    appStore.dispatch(notesSlice.actions.setIsNoteFormOpen({ isNoteFormOpen: false }));
  }

  const [calendarPageHeight, setCalendarPageHeight] = useState(0);
  const handleWindowReize = () => {
    const offset = appStore.getState().styles.headerHeight !as number + 50;
    setCalendarPageHeight(window.innerHeight - offset);
  }
  useEffect(() => {
    const offset = appStore.getState().styles.headerHeight !as number + 50;
    setCalendarPageHeight(window.innerHeight - offset);
    window.addEventListener("resize", () => handleWindowReize(), false);
  }, []);

  return (
    <Box sx={{ width: "100%", height: calendarPageHeight, alignItems: "center", justifyContent: "center" }}>
      <BalendarCalendar />
      <Modal centered={true} opened={isNoteFormOpen} closeOnClickOutside={true} 
        onClose={() => handleOnModalExitClick()}
      >
        <NoteForm />
      </Modal>
    </Box>
  );
}