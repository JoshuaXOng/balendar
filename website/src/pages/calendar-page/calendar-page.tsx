import React, { useContext, useEffect, useRef, useState } from 'react';
import { Box } from '@mantine/core';
import { useSelector, useDispatch } from 'react-redux'
import pinkGunther from '../../../assets/pink-gunther.svg';
import { AppContext } from '../../old/app-context';
import { appStore, stylesSlice } from '../../app-store';
import circleGunther from '../../../assets/circle-gunther.png';
import LoginForm from '../../components/login-form/login-form';
import BalendarCalendar from '../../components/balendar-calendar/balendar-calendar';
import { useNavigate } from 'react-router-dom';

export default function CalendarPage() {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!appStore.getState().auth.authToken)
    navigate("/login/");
  }, []);

  return (
    <Box sx={{ width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>
      <BalendarCalendar></BalendarCalendar>
    </Box>
  );
}