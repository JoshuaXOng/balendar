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
  Title,
  Paper,
  Input,
  Button,
  InputWrapper,
  PasswordInput,
  Switch
} from '@mantine/core';
import { useSelector, useDispatch } from 'react-redux'
import pinkGunther from '../../../assets/pink-gunther.svg';
import { AppContext } from '../../old/app-context';
import { appStore, stylesSlice } from '../../app-store';
import circleGunther from '../../../assets/circle-gunther.png';
import { useMediaQuery } from '@mantine/hooks';

export default function LoginForm() {
  const isViewportWide = useMediaQuery("(min-width: 900px)");  
  return (
    <Paper 
      sx={{ 
        display: 'flex', flexDirection: isViewportWide ? "row" : "column", width: isViewportWide ? "40vw" : "80vw", 
        height: isViewportWide ? "50vh" : "80vh", 
        padding: `0px ${isViewportWide ? "50px" : "0px"} 0px 0px`, 
        alignItems: "center", justifyContent: "center", gap: isViewportWide ? "10%" : "5%"
      }} shadow={'md'}
    >
      <img src={circleGunther} style={{ width: isViewportWide ? "auto" : "80%", maxWidth: isViewportWide ? "" : "15rem", height: isViewportWide ? "50%" : "auto" }} />
      <Group direction={"column"} grow={true}>
        <Title order={3}>Login / Sign-up</Title>
        <InputWrapper
          label="Username"
          required
        >
          <Input placeholder="Enter text" />
        </InputWrapper>
        <InputWrapper
          label="Password"
          required
        >
          <PasswordInput></PasswordInput>
        </InputWrapper>
        <Group position='apart'>
          <Switch label="Creating account?" />
        </Group>
        <Button>
          Proceed
        </Button>
      </Group>
    </Paper>
  );
}