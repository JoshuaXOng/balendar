import { Box } from '@mantine/core';
import { appStore } from '../../app-store';
import LoginForm from '../../components/login-form/login-form';

export function LoginPage() {
  return (
    <Box sx={{ display: "flex", width: "100%", height: `calc(100% - ${appStore.getState().styles.headerHeight!}px)`, alignItems: "center", justifyContent: "center" }}>
      <LoginForm></LoginForm>
    </Box>
  );
}