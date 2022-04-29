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
import { AppContext } from './old/app-context';
import { appStore } from './app-store';
import LoginForm from './components/login-form/login-form';
import LoginPage from './pages/login-page/login-page';
import CalendarPage from './pages/calendar-page/calendar-page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CustomAside from './components/custom-aside/custom-aside';
import NotFoundPage from './pages/not-found-page/login-page';
import CustomHeader from './components/custom-header/custom-header';

export default function App() {
  appStore.subscribe(() => {
    const { authToken } = appStore.getState().auth;
    authToken && localStorage.setItem('BALENDAR_AUTH_TOKEN', authToken);
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
      header={<CustomHeader />}
      asideOffsetBreakpoint="sm"
      aside={<CustomAside />}
    >
      <Routes>
        <Route path="/login/" element={<LoginPage />} />
        <Route path="/calendar/" element={<CalendarPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppShell>
  );
}