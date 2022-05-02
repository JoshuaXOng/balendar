import { useEffect, useRef, useState } from 'react';
import { Box, Modal, Portal } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { appStore, notesSlice } from '../../app-store';
import { BalendarCalendar } from '../../components/balendar-calendar/balendar-calendar';
import NoteForm from '../../components/note-form/note-form';
import { AuthenticatedRightControls } from '../../components/balendar-header/balendar-header-entities/authenticated-right-controls';
import { useAbstractedViewportArea } from '../../hooks';
import BalendarHeader from '../../components/balendar-header/balendar-header';

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
    const offset = appStore.getState().ui.headerHeight !as number + 50;
    setCalendarPageHeight(window.innerHeight - offset);
  }
  useEffect(() => {
    const offset = appStore.getState().ui.headerHeight !as number + 50;
    setCalendarPageHeight(window.innerHeight - offset);
    window.addEventListener("resize", () => handleWindowReize(), false);
  }, []);

  const abstractedViewportArea = useAbstractedViewportArea();

  const balendarCalendar = useRef<any>();
  const [isDataReady, setIsDataReady] = useState(false);
  useEffect(() => {
    recenterCalendar();
  }, [isDataReady])

  const recenterCalendar = () => balendarCalendar.current?.scrollTo({ top: (balendarCalendar.current.scrollHeight - window.innerHeight) / 2, behavior: 'instant' });
  
  return (
    <Box sx={{ width: "100%", height: calendarPageHeight, alignItems: "center", justifyContent: "center" }}>
      {abstractedViewportArea !== "s" && <Portal target="#app-shell__header"><BalendarHeader><AuthenticatedRightControls recenterCalendar={() => recenterCalendar()}/></BalendarHeader></Portal>}
      <BalendarCalendar ref={balendarCalendar} onIsDataReady={() => setIsDataReady(true)} />
      <Modal centered={true} opened={isNoteFormOpen} closeOnClickOutside={true} 
        onClose={() => handleOnModalExitClick()}
      >
        <NoteForm />
      </Modal>
    </Box>
  );
}