import {
  Header,
  Group,
  Title
} from '@mantine/core';
import { useDispatch } from 'react-redux'
import pinkGunther from '../../../assets/pink-gunther.svg';
import { appStore, stylesSlice } from '../../app-store';

export default function BalendarHeader() {
  const appDispatch = useDispatch();

  appDispatch(stylesSlice.actions.setHeaderHeight({ headerHeight: 70 }));

  return (
    <Header height={appStore.getState().styles.headerHeight!} p="md">
      <Group sx={{ width: "100%", height: "100%" }} align="center" position="center">
        <img style={{ width: "auto", height: "100%" }} src={pinkGunther} />
        <Title order={2}>Balendar</Title>
      </Group>
    </Header>
  );
}