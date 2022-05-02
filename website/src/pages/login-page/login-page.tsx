import { Box } from '@mantine/core';
import { useEffect } from 'react';
import { appStore, uiSlice } from '../../app-store';
import LoginForm from '../../components/login-form/login-form';
import { useAbstractedViewportArea } from '../../hooks/use-abstracted-viewport-area';

export function LoginPage() {
  const abstractedViewportArea = useAbstractedViewportArea();

  useEffect(() => {
    let isHeaderVisable: boolean; 
    if (abstractedViewportArea === "s") isHeaderVisable = false
    else isHeaderVisable = true
    appStore.dispatch(uiSlice.actions.setIsHeaderVisable({ isHeaderVisable }));
  }, [abstractedViewportArea]);

  return (
    <Box sx={{ display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>
      <LoginForm></LoginForm>
    </Box>
  );
}