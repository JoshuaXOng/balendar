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
import pinkGunther from '../../../assets/pink-gunther.svg';
import { AppContext } from '../../app-context';

export default function BalendarHeader() {
  const appContext = useContext(AppContext);
  return (
    <Header height={appContext.header.height !as number} p="md">
      <Group sx={{ width: "100%", height: "100%" }} align="center" position="center">
        <img style={{ width: "auto", height: "100%" }} src={pinkGunther} />
        <Title order={2}>Balendar</Title>
      </Group>
    </Header>
  );
}