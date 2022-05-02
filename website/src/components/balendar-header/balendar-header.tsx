import {
  Header,
  Group,
  Title,
  Box,
} from '@mantine/core';
import { ReactElement, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import pinkGunther from '../../../assets/pink-gunther.svg';
import { appStore, uiSlice } from '../../app-store';
import { useAbstractedViewportArea } from '../../hooks';
import { AuthenticatedRightControls } from './balendar-header-entities/authenticated-right-controls';

type BalendarHeaderProps = {
  children: ReactElement;
}

export default function BalendarHeader(props: BalendarHeaderProps) {
  const { children } = props;

  const [height, setHeight] = useState(appStore.getState().ui.headerHeight);
  useEffect(() => {
    appStore.subscribe(() => setHeight(appStore.getState().ui.headerHeight));
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
          {children}
        </Box>
      </Group>
    </Header>
  );
}