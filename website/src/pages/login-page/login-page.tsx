import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Box
} from '@mantine/core';
import { useSelector, useDispatch } from 'react-redux'
import pinkGunther from '../../../assets/pink-gunther.svg';
import { AppContext } from '../../old/app-context';
import { appStore, stylesSlice } from '../../app-store';
import circleGunther from '../../../assets/circle-gunther.png';
import LoginForm from '../../components/login-form/login-form';

export default function LoginPage() {
  const appDispatch = useDispatch();

  return (
    <Box sx={{ display: "flex", width: "100%", height: `calc(100% - ${appStore.getState().styles.headerHeight!}px)`, alignItems: "center", justifyContent: "center" }}>
      <LoginForm></LoginForm>
    </Box>
  );
}