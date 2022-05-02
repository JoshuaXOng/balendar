import {
  Header,
  Group,
  Title
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import pinkGunther from '../../../assets/pink-gunther.svg';
import { appStore, stylesSlice } from '../../app-store';

export default function BalendarHeader() {
  const appDispatch = useDispatch();

  const initialHeight = 70;

  useEffect(() => {
    appDispatch(stylesSlice.actions.setHeaderHeight({ headerHeight: initialHeight }));
  }, [])
  
  const [height, setHeight] = useState(initialHeight);
  appStore.subscribe(() => setHeight(appStore.getState().styles.headerHeight ?? initialHeight));

  return (
    <Header height={height} p="md">
      <Group sx={{ width: "100%", height: "100%" }} align="center" position="center">
        <img style={{ width: "auto", height: "100%" }} src={pinkGunther} />
        <Title order={2}>Balendar</Title>
      </Group>
    </Header>
  );
}