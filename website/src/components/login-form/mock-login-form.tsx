import { useEffect, useRef, useState } from 'react';
import {
  useMantineTheme,
  Group,
  Title,
  Paper,
  Button,
  Skeleton,
  Text
} from '@mantine/core';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { authSlice } from '../../app-store';
import circleGunther from '../../../assets/circle-gunther.png';
import { fetchAuthToken } from '../../services';
import { sleep } from '../../utils';
import { useAbstractedViewportArea, useAbstractedViewportRatio } from '../../hooks';

export default function MockLoginForm() {
  const appDispatch = useDispatch();
  
  const navigate = useNavigate();

  const processAuthToken = async (authToken: string) => {
    await appDispatch(authSlice.actions.setAuthToken({ authToken }));
    navigate("/calendar/");
  }

  const doAuthProcess = async (username: string, password: string) => {    
    const tokenResponse = await fetchAuthToken({ username, password })  
    if (tokenResponse instanceof Error) return;

    const { authToken } = await tokenResponse.json();
    await processAuthToken(authToken);
  }

  const handleOnSubmit = async () => {
    doAuthProcess("test-user", "test-user");
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
        borderStyle: "none",
        borderColor: theme.colors.blue[5],
        overflow: "hidden",
        transition: "border 2s",
        zIndex: 0,
        "::before": {
          position: "absolute",
          zIndex: -1,
          transform: `translate(${["s", "sm"].includes(abstractedViewportArea) ? (abstractedViewportRatio === "v" ? "0px" : "0px") : (abstractedViewportRatio === "v" ? "0px" : "15px")}, 0px)`,
          background: `${theme.white}`,
          width: "0px",
          height: paperHeight,
          content: "''",
        },
      }} shadow={'md'} ref={paper}
    >
      <img src={circleGunther} style={{ display: ["s", "sm"].includes(abstractedViewportArea) ? "none": "block", width: abstractedViewportArea === "m" ? "50%" : "50%", height: abstractedViewportArea === "m" ? "auto": "auto" }} />
      <Group direction={"column"} grow={true}>
          <Title order={3}>Login / Sign-up</Title>
          <Text>Username</Text>
          <Skeleton height={30}></Skeleton>
          <Text>Password</Text>
          <Skeleton height={30}></Skeleton>
          <Text>Creating account?</Text>
          <Skeleton height={30} circle radius="xl"></Skeleton>
          <Button onClick={() => handleOnSubmit()}>
            Enter
          </Button>
      </Group>
    </Paper>
  );
}