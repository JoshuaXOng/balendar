import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Grid,
  Image,
  Group,
  TypographyStylesProvider,
  Title
} from '@mantine/core';
import { useSelector, useDispatch } from 'react-redux'
import pinkGunther from '../../../assets/pink-gunther.svg';
import { AppContext } from '../../old/app-context';
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