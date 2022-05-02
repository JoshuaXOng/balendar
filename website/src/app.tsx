import {
  AppShell,
  useMantineTheme,
} from '@mantine/core';
import { appStore, authSlice } from './app-store';
import { CalendarPage, LoginPage, NotFoundPage } from './pages';
import { Route, Routes } from 'react-router-dom';
import BalendarHeader from './components/balendar-header/balendar-header';
import { useEffect, useState } from 'react';
import { fetchAuthToken } from './services';
import { showNotification } from '@mantine/notifications';

export default function App() {
  appStore.subscribe(() => {
    const { authToken } = appStore.getState().auth;
    authToken && localStorage.setItem('BALENDAR_AUTH_TOKEN', authToken);
  });

  setInterval(async () => {
    const { authToken: oldAuthToken } = appStore.getState().auth;
    if (!oldAuthToken) return;

    const tokenResponse = await fetchAuthToken({ authToken: oldAuthToken })
    if (tokenResponse instanceof Error || (tokenResponse.status >= 400 && tokenResponse.status < 500)) 
      return showNotification({ color: "red", title: "Server down", message: "Can't re-authenticate login" });
  
    const { authToken } = await tokenResponse.json();
    if (!authToken)
      return showNotification({ color: "red", title: "Server down", message: "Can't re-authenticate login" });
    
    await appStore.dispatch(authSlice.actions.setAuthToken({ authToken }));
  }, 1000 * 60 * 9);

  const [isHeaderOpen, setIsHeaderOpen] = useState(appStore.getState().ui.isHeaderVisable);
  useEffect(() => {
    appStore.subscribe(() => setIsHeaderOpen(appStore.getState().ui.isHeaderVisable));
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