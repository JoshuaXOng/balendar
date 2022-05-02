import React, { useContext, useEffect, useRef, useState } from 'react';
import { Box, Modal } from '@mantine/core';
import { useSelector, useDispatch } from 'react-redux'
import pinkGunther from '../../../assets/pink-gunther.svg';
import { AppContext } from '../../old/app-context';
import { appStore, notesSlice, stylesSlice } from '../../app-store';
import circleGunther from '../../../assets/circle-gunther.png';
import LoginForm from '../../components/login-form/login-form';
import BalendarCalendar from '../../components/balendar-calendar/balendar-calendar';
import { useNavigate } from 'react-router-dom';
import NoteForm from '../../components/note-form/note-form';

export default function CalendarPage() {
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

  return (
    <Box sx={{ width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>
      <BalendarCalendar></BalendarCalendar>
      <Modal centered={true} opened={isNoteFormOpen} closeOnClickOutside={true} 
        onClose={() => handleOnModalExitClick()}
      >
        <NoteForm />
      </Modal>
    </Box>
  );
}