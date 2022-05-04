import ReactGA from 'react-ga';
import { Box, Portal } from '@mantine/core';
import BalendarHeader from '../../components/balendar-header/balendar-header';
import LoginForm from '../../components/login-form/login-form';
import { useAbstractedViewportArea } from '../../hooks/use-abstracted-viewport-area';

export function LoginPage() {
  ReactGA.pageview(window.location.pathname);

  const abstractedViewportArea = useAbstractedViewportArea();

  return (
    <Box sx={{ display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>
      {abstractedViewportArea !== "s" && <Portal target="#app-shell__header"><BalendarHeader><></></BalendarHeader></Portal>}
      <LoginForm></LoginForm>
    </Box>
  );
}