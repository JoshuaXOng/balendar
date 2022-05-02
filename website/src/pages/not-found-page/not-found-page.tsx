import { useEffect } from 'react';
import {
  Box, Title
} from '@mantine/core';
import { useDispatch } from 'react-redux'
import orgalorg from '../../../assets/orgalorg.png';
import { appStore, uiSlice } from '../../app-store';

export function NotFoundPage() {
  const appDispatch = useDispatch();

  useEffect(() => {
    appDispatch(uiSlice.actions.setIsHeaderVisable({ isHeaderVisable: false }));
  }, []);

  return (
    <Box sx={{ display: "flex", width: "100%", height: `calc(100% - ${appStore.getState().ui.headerHeight!}px)`, alignItems: "center", justifyContent: "center" }}>
      <img src={orgalorg} style={{ width: "20vw", height: "auto" }}></img>
      <Title>404 - Gunther Not Found</Title>
      <img src={orgalorg} style={{ width: "20vw", height: "auto" }}></img>
    </Box>
  );
}