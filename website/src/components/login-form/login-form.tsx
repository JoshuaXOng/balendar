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
import { useMediaQuery, useViewportSize } from '@mantine/hooks';
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

  const processAuthToken = async (authToken: string) => {
    if (!authToken)
      form.setErrors({ username: "Could be incorrect", password: "Could be incorrect" });
    else {
      await appDispatch(authSlice.actions.setAuthToken({ authToken }));
      navigate("/calendar/");
    }
  }

  const handleOnSubmit = (value: typeof form.values) => {
    const { isCreatingAccount, username, password } = value;
    if (isCreatingAccount) {
      (async () => {
        const createResponse = await createUser({ username, password });
        if (createResponse.status >= 400)
          return form.setErrors({ username: "Already exists", password: null });
          
        const { authToken } = (await fetchAuthToken({ username, password })
          .then(response => response.json()));
        await processAuthToken(authToken);
      })()
    }
    else {
      (async () => {
        const { authToken } = (await fetchAuthToken({ username, password })
          .then(response => response.json()));
        await processAuthToken(authToken);
      })()
    };
  }
  
  const { width: viewportWidth, height: viewportHeight } = useViewportSize();
  const viewportAspectRatio  = viewportWidth / viewportHeight;
  
  return (
    <Paper 
      sx={{ 
        display: 'flex', flexDirection: viewportAspectRatio < 1 ? "row" : "column", width: viewportWidth > 1200 ? "40vw" : "80vw", 
        height: viewportWidth > 1200 ? "50vh" : (viewportHeight > 600 ? "80vh" : "65vh"), 
        padding: `0px ${viewportWidth > 1200 ? "50px" : "0px"} 0px 0px`, 
        alignItems: "center", justifyContent: "center", gap: viewportWidth > 1200 ? "10%" : "5%"
      }} shadow={'md'}
    >
      <img src={circleGunther} style={{ display: viewportHeight > 600 ? "block": "none", width: viewportWidth > 1200 ? "auto" : "80%", maxWidth: viewportWidth > 1200 ? "" : "15rem", height: viewportWidth > 1200 ? "50%" : "auto" }} />
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