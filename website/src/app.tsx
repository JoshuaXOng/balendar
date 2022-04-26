import React, { Profiler, useReducer, useState } from 'react';
import { Provider } from 'react-redux'
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
} from '@mantine/core';
import BalendarHeader from './components/balendar-header/balendar-header';
import BalendarCalendar from './components/balendar-calendar/balendar-calendar';
import NoteForm from './components/note-form/note-form';
import BalendarCalendarDay from './components/balendar-calendar/balendar-calendar-entities/balendar-calendar-day';
import { DragDropContext } from 'react-beautiful-dnd';
import { AppContext } from './old/app-context';
import { appStore } from './app-store';
import LoginForm from './components/login-form/login-form';
import LoginPage from './pages/login-page/login-page';
import CalendarPage from './pages/calendar-page/calendar-page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function App() {
  appStore.subscribe(() => {
    const { authToken } = appStore.getState().auth;
    authToken && localStorage.setItem('BALENDAR_AUTH_TOKEN', authToken);
  });
  
  const [isAsideOpen, setIsAsideOpen] = useState(appStore.getState().styles.isAsideOpen);
  appStore.subscribe(() => {
    setIsAsideOpen(appStore.getState().styles.isAsideOpen);
  });

  const theme = useMantineTheme();

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      fixed
      navbarOffsetBreakpoint="sm"
      header={<BalendarHeader />}
      asideOffsetBreakpoint="sm"
      aside={
        isAsideOpen ?
          <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
            <NoteForm></NoteForm>
          </Aside> :
          <></>
      }
    >
      <Routes>
        <Route path="/login/" element={<LoginPage />} />
        <Route path="/calendar/" element={<CalendarPage />} />
      </Routes>
    </AppShell>
  );
}