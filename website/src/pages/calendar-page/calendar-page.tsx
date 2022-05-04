import ReactGA from 'react-ga';
import { useEffect, useRef, useState } from 'react';
import { Box, Modal, Portal } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { appStore, notesSlice } from '../../app-store';
import { BalendarCalendar } from '../../components/balendar-calendar/balendar-calendar';
import NoteForm from '../../components/note-form/note-form';
import { AuthenticatedRightControls } from '../../components/balendar-header/balendar-header-entities/authenticated-right-controls';
import BalendarHeader from '../../components/balendar-header/balendar-header';
import { useJwt } from 'react-jwt';

export function CalendarPage() {
  ReactGA.pageview(window.location.pathname);

  const navigate = useNavigate();
  
  const { authToken } = appStore.getState().auth;
  const isAuthTokenBad = !authToken || useJwt(authToken).isExpired;
  useEffect(() => {
    if (isAuthTokenBad)
      navigate("/login/");
  }, []);

  const [isNoteFormOpen, setIsNoteFormOpen] = useState(false);
  useEffect(() =>
    appStore.subscribe(() => {
      setIsNoteFormOpen(appStore.getState().notes.isNoteFormOpen);
    })
  , [])

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

  const balendarCalendar = useRef<any>();
  const [isDataReady, setIsDataReady] = useState(false);
  useEffect(() => {
    recenterCalendar();
  }, [isDataReady])

  const recenterCalendar = () => balendarCalendar.current?.scrollTo({ top: (balendarCalendar.current.scrollHeight - window.innerHeight) / 2, behavior: 'instant' });
  
  return (
    <Box sx={{ width: "100%", height: calendarPageHeight, alignItems: "center", justifyContent: "center" }}>
      <Portal target="#app-shell__header"><BalendarHeader><AuthenticatedRightControls recenterCalendar={() => recenterCalendar()}/></BalendarHeader></Portal>
      {!isAuthTokenBad && <BalendarCalendar ref={balendarCalendar} onIsDataReady={() => setIsDataReady(true)} />}
      <Modal centered={true} opened={isNoteFormOpen} closeOnClickOutside={true} 
        onClose={() => handleOnModalExitClick()}
      >
        <NoteForm />
      </Modal>
    </Box>
  );
}