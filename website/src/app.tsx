import {
  AppShell,
  useMantineTheme,
} from '@mantine/core';
import { appStore, authSlice } from './app-store';
import { CalendarPage, LoginPage, NotFoundPage } from './pages';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { fetchAuthToken } from './services';
import { showNotification } from '@mantine/notifications';
import { useEffect } from 'react';
import { useJwt } from 'react-jwt';
import { authRoutes } from './app-constants';

export default function App() {
  const navigate = useNavigate();

  useEffect(
    appStore.subscribe(() => {
      const { authToken } = appStore.getState().auth;
      authToken && localStorage.setItem('BALENDAR_AUTH_TOKEN', authToken);
    })
  , [])

  useEffect(() => {
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
  }, [])

  useEffect(() => {
    setInterval(async () => {
      const { authToken } = appStore.getState().auth;
      if (authRoutes.includes(window.location.href) && (!authToken || useJwt(authToken).isExpired)) {
        navigate("/login/")
        showNotification({ color: 'blue', title: 'Authentication', message: "Your authentication has ran out - returned to the login page" })
      }
    }, 1000 * 60);
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
      header={<div id="app-shell__header"></div>}
      asideOffsetBreakpoint="sm"
    >
      <Routes>
        <Route path="/" element={<CalendarPage />} />
        <Route path="/login/" element={<LoginPage />} />
        <Route path="/calendar/" element={<CalendarPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppShell>
  );
}