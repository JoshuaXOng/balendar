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
  Switch,
  TextInput
} from '@mantine/core';
import { useSelector, useDispatch } from 'react-redux'
import pinkGunther from '../../../assets/pink-gunther.svg';
import { AppContext } from '../../old/app-context';
import { appStore, authSlice, stylesSlice } from '../../app-store';
import circleGunther from '../../../assets/circle-gunther.png';
import { useMediaQuery } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { createUser } from '../../services/users-api';
import { fetchAuthToken } from '../../services/auth-tokens-api';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const appDispatch = useDispatch();
  
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
      isCreatingAccount: false
    },
    validate: {
      username: (username) => username.replace(" ", "").length >= 1 ? null : "C'mon, make it non-empty",
      password: (password) => password.replace(" ", "").length >= 1 ? null : "C'mon, make it non-empty"
    },
  });

  const handleOnSubmit = (value: typeof form.values) => {
    const { isCreatingAccount, username, password } = value;
    if (isCreatingAccount) {
      createUser({ username, password })
        .then(() => fetchAuthToken({ username, password }))
        .then(response => response.json())
        .then(payload => payload.authToken)
        .then(authToken => appDispatch(authSlice.actions.setAuthToken({ authToken })))
        .then(_ => navigate("/calendar/"))
    }
    else {
      fetchAuthToken({ username, password })
        .then(response => response.json())
        .then(payload => payload.authToken)
        .then(authToken => appDispatch(authSlice.actions.setAuthToken({ authToken })))
        .then(_ => navigate("/calendar/"))
    };
  }

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
      <form onSubmit={form.onSubmit((values) => handleOnSubmit(values))}>
        <Group direction={"column"} grow={true}>
            <Title order={3}>Login / Sign-up</Title>
            <InputWrapper
              label="Username"
              required
            >
              <TextInput placeholder="Enter text" {...form.getInputProps("username")} />
            </InputWrapper>
            <InputWrapper
              label="Password"
              required
            >
              <PasswordInput placeholder="Enter text" {...form.getInputProps("password")} />
            </InputWrapper>
            <Group position='apart'>
              <Switch label="Creating account?" {...form.getInputProps("isCreatingAccount")} />
            </Group>
            <Button type="submit">
              Proceed
            </Button>
        </Group>
      </form>
    </Paper>
  );
}