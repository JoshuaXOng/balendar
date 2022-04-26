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
  const theme = useMantineTheme();
  return (
    <Provider store={appStore}>
      <BrowserRouter>
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
          // aside={
          //   <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          //     <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
          //       <NoteForm></NoteForm>
          //     </Aside>
          //   </MediaQuery>
          // }
        >
          <Routes>
            <Route path="/login/" element={<LoginPage />} />
            <Route path="/calendar/" element={<CalendarPage />} />
          </Routes>
        </AppShell>
      </BrowserRouter>
    </Provider>
  );
}