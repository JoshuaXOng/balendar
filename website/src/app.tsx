import {
  AppShell,
  useMantineTheme,
} from '@mantine/core';
import { appStore } from './app-store';
import { CalendarPage, LoginPage, NotFoundPage } from './pages';
import { Route, Routes } from 'react-router-dom';
import BalendarHeader from './components/balendar-header/balendar-header';
import { useEffect, useState } from 'react';

export default function App() {
  appStore.subscribe(() => {
    const { authToken } = appStore.getState().auth;
    authToken && localStorage.setItem('BALENDAR_AUTH_TOKEN', authToken);
  });

  const [isHeaderOpen, setIsHeaderOpen] = useState(appStore.getState().styles.isHeaderVisable);
  useEffect(() => {
    appStore.subscribe(() => setIsHeaderOpen(appStore.getState().styles.isHeaderVisable));
  }, [])

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
      header={isHeaderOpen ? <BalendarHeader /> : <></>}
      asideOffsetBreakpoint="sm"
    >
      <Routes>
        <Route path="/login/" element={<LoginPage />} />
        <Route path="/calendar/" element={<CalendarPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppShell>
  );
}