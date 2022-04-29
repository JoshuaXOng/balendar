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
  TextInput,
  Alert
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
import userViewportArea from '../../hooks/use-viewport-area';
import userViewportRatio from '../../hooks/use-viewport-ratio';

export default function LoginForm() {
  const appDispatch = useDispatch();
  
  const navigate = useNavigate();

  const [formAlertPayload, setFormAlertPayload] = useState({ isVisable: false, bodyText: "O.o" });

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
      isCreatingAccount: false
    },
    validate: {
      username: (username) => username.replace(" ", "").length >= 1 ? null : "Cannot be empty",
      password: (password) => password.replace(" ", "").length >= 1 ? null : "Cannot be empty"
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

  const doAuthProcess = async (username: string, password: string) => {
    const tokenResponse = await fetchAuthToken({ username, password })
    if (tokenResponse instanceof Error) 
      return setFormAlertPayload({ isVisable: true, bodyText: "Server down - can't authenticate user" });
    
    const { authToken } = await tokenResponse.json();
    await processAuthToken(authToken);
  }

  const handleOnSubmit = (value: typeof form.values) => {
    const { isCreatingAccount, username, password } = value;
    if (isCreatingAccount) {
      (async () => {
        const createResponse = await createUser({ username, password });
        if (createResponse instanceof Error) 
          return setFormAlertPayload({ isVisable: true, bodyText: "Server down - can't create user" });
        if (createResponse.status >= 400)
          return form.setErrors({ username: "Already exists", password: null });
          
        doAuthProcess(username, password);
      })()
    }
    else {
      doAuthProcess(username, password);
    };
  }
  
  const viewportArea = userViewportArea();
  const viewportRatio  = userViewportRatio();
  
  return (
    <Paper 
      sx={{ 
        display: 'flex', flexDirection: viewportArea < 2.5 ? (viewportRatio < 1 ? "column" : "row") : (viewportRatio < 1 ? "column" : "row"), 
        width: viewportArea < 5 ? (viewportRatio < 1 ? "85vw" : "85vw") : (viewportRatio < 1 ? "40vw" : "40vw"), 
        minHeight: viewportArea < 5 ? (viewportRatio < 1 ? "70vh" : "85vh") : (viewportRatio < 1 ? "50vh" : "50vh"), 
        padding: `10px ${viewportArea < 6 ? (viewportRatio < 1 ? "10px" : "10px") : (viewportRatio < 1 ? "10px" : "40px")} 10px 10px`, 
        alignItems: "center", justifyContent: viewportArea < 11 ? "center" : "space-around", gap: viewportArea < 11 ? "5%" : "0%" 
      }} shadow={'md'}
    >
      <img src={circleGunther} style={{ display: viewportArea < 6 ? "none": "block", width: viewportArea < 10 ? "50%" : "50%", height: viewportArea < 10 ? "auto": "auto" }} />
      <form onSubmit={form.onSubmit((values) => handleOnSubmit(values))} onChange={() => setFormAlertPayload({ isVisable: false, bodyText: "o.O"})}>
        <Group direction={"column"} grow={true}>
            <Title order={3}>Login / Sign-up</Title>
            {formAlertPayload.isVisable && <Alert title="Errrrorr!" color="red">{formAlertPayload.bodyText}</Alert>}
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