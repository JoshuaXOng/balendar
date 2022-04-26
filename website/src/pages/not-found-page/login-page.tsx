import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Box
} from '@mantine/core';
import { useSelector, useDispatch } from 'react-redux'
import pinkGunther from '../../../assets/pink-gunther.svg';
import { AppContext } from '../../old/app-context';
import { appStore, stylesSlice } from '../../app-store';
import orgalorg from '../../../assets/orgalorg.png';
import LoginForm from '../../components/login-form/login-form';

export default function NotFoundPage() {
  const appDispatch = useDispatch();

  useEffect(() => {
    appDispatch(stylesSlice.actions.setIsHeaderVisable({ isHeaderVisable: false }));
    appDispatch(stylesSlice.actions.setIsAsideOpen({ isAsideOpen: false }));
  }, []);

  return (
    <Box sx={{ display: "flex", width: "100%", height: `calc(100% - ${appStore.getState().styles.headerHeight!}px)`, alignItems: "center", justifyContent: "center" }}>
      <img src={orgalorg}></img>
    </Box>
  );
}