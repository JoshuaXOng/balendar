import {
  AppShell,
  useMantineTheme,
} from '@mantine/core';
import { appStore } from './app-store';
import { CalendarPage, LoginPage, NotFoundPage } from './pages';
import { Route, Routes } from 'react-router-dom';
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
    >
      <Routes>
        <Route path="/login/" element={<LoginPage />} />
        <Route path="/calendar/" element={<CalendarPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppShell>
  );
}