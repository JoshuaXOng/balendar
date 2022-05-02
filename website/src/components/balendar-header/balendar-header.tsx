import {
  Header,
  Group,
  Title,
  Box,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import pinkGunther from '../../../assets/pink-gunther.svg';
import { appStore, uiSlice } from '../../app-store';
import { useAbstractedViewportArea } from '../../hooks';
import { AuthenticatedRightControls } from './balendar-header-entities/authenticated-right-controls';

export default function BalendarHeader() {
  const appDispatch = useDispatch();

  const initialHeight = 70;
  useEffect(() => {
    appDispatch(uiSlice.actions.setHeaderHeight({ headerHeight: initialHeight }));
  }, [])
  const [height, setHeight] = useState(initialHeight);

  useEffect(() => {
    appStore.subscribe(() => setHeight(appStore.getState().ui.headerHeight ?? initialHeight));
  }, [])
  
  const abstractedViewportArea = useAbstractedViewportArea();

  return (
    <Header height={height} p="md">
      <Group sx={{ width: "100%", height: "100%" }} align="center" position="center" grow>
        <Box/>
        <Group sx={{ width: "100%", height: "100%" }} align="center" position="center">
          <img style={{ width: "auto", height: "100%" }} src={pinkGunther} />
          {["s", "sm"].includes(abstractedViewportArea) ? <></> : <Title order={2}>Balendar</Title>}
        </Group>
        <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
          <div id="balendar-header__right-controls"></div>
        </Box>
      </Group>
    </Header>
  );
}