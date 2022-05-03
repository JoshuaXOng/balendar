import { useEffect, useRef, useState } from 'react';
import {
  useMantineTheme,
  Group,
  Title,
  Paper,
  Button,
  InputWrapper,
  PasswordInput,
  Switch,
  TextInput,
  Alert
} from '@mantine/core';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { authSlice } from '../../app-store';
import circleGunther from '../../../assets/circle-gunther.png';
import { createUser, fetchAuthToken } from '../../services';
import { sleep } from '../../utils';
import { useAbstractedViewportArea, useAbstractedViewportRatio } from '../../hooks';

export default function LoginForm() {
  const appDispatch = useDispatch();
  
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);

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
      return form.setErrors({ username: "Could be incorrect", password: "Could be incorrect" });
    
    await appDispatch(authSlice.actions.setAuthToken({ authToken }));
    navigate("/calendar/");
  }

  const doAuthProcess = async (username: string, password: string) => {    
    const tokenResponse = await fetchAuthToken({ username, password })
    if (tokenResponse instanceof Error) 
      return setFormAlertPayload({ isVisable: true, bodyText: "Server down - can't authenticate user" });
    if (tokenResponse.status >= 400 && tokenResponse.status < 500)
      return form.setErrors({ username: "Could be incorrect", password: "Could be incorrect" });
    
    const { authToken } = await tokenResponse.json();
    await processAuthToken(authToken);
  }

  const handleOnSubmit = async (value: typeof form.values) => {
    const { isCreatingAccount, username, password } = value;

    setIsSubmitting(true);
    await sleep(2000);

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

    setIsSubmitting(false);
  }
  
  const theme = useMantineTheme();

  const abstractedViewportArea = useAbstractedViewportArea();
  const abstractedViewportRatio = useAbstractedViewportRatio();

  const paper = useRef<HTMLDivElement | null>(null);
  const initialDimension = "0px"
  const [paperWidth, setPaperWidth] = useState(initialDimension);
  const [paperHeight, setPaperHeight] = useState(initialDimension);
  useEffect(() => {
    setPaperWidth(`${paper.current!.getBoundingClientRect().width}px` ?? initialDimension);
    setPaperHeight(`${paper.current!.getBoundingClientRect().height}px` ?? initialDimension);
  }, [paper.current?.getBoundingClientRect().width, paper.current?.getBoundingClientRect().height]);

  return (
    <Paper 
      sx={{ 
        display: 'flex', flexDirection: abstractedViewportRatio === "v" ? "column" : "row", 
        width: ["s", "sm"].includes(abstractedViewportArea) ? (abstractedViewportRatio === "v" ? "85vw" : "85vw") : (abstractedViewportRatio === "v" ? "40vw" : "40vw"), 
        minHeight: ["s", "sm"].includes(abstractedViewportArea) ? (abstractedViewportRatio === "v" ? "70vh" : "80vh") : (abstractedViewportRatio === "v" ? "50vh" : "50vh"), 
        padding: `20px ${["s", "sm"].includes(abstractedViewportArea) ? (abstractedViewportRatio === "v" ? "10px" : "10px") : (abstractedViewportRatio === "v" ? "10px" : "40px")} 20px 10px`, 
        alignItems: "center", justifyContent: ["s", "sm"].includes(abstractedViewportArea) ? "center" : "space-around", gap: ({ s: "5%", sm: "5%", m: "10%", l: "5%", xl: "0%" })[abstractedViewportArea],
        borderWidth: "5px 0px 5px 0px",
        borderStyle: isSubmitting ? "solid" : "none",
        borderColor: theme.colors.blue[5],
        overflow: "hidden",
        transition: "border 2s",
        zIndex: 0,
        "::before": {
          position: "absolute",
          zIndex: -1,
          transform: `translate(${["s", "sm"].includes(abstractedViewportArea) ? (abstractedViewportRatio === "v" ? "0px" : "0px") : (abstractedViewportRatio === "v" ? "0px" : "15px")}, 0px)`,
          background: `${theme.white}`,
          width: isSubmitting ? "0px" : paperWidth,
          height: paperHeight,
          ...isSubmitting ? { transition: "width 2s" } : {},
          content: "''",
        },
      }} shadow={'md'} ref={paper}
    >
      <img src={circleGunther} style={{ display: ["s", "sm"].includes(abstractedViewportArea) ? "none": "block", width: abstractedViewportArea === "m" ? "50%" : "50%", height: abstractedViewportArea === "m" ? "auto": "auto" }} />
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
            <Button type="submit" disabled={isSubmitting ? true : false}>
              {isSubmitting ? "Loading" : "Proceed"}
            </Button>
        </Group>
      </form>
    </Paper>
  );
}