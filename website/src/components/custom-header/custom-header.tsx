import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Aside,
} from '@mantine/core';
import { useSelector, useDispatch } from 'react-redux'
import pinkGunther from '../../../assets/pink-gunther.svg';
import { AppContext } from '../../old/app-context';
import { appStore, stylesSlice } from '../../app-store';
import NoteForm from '../note-form/note-form';
import BalendarHeader from '../balendar-header/balendar-header';

export default function CustomHeader() {
  const [isOpen, setIsOpen] = useState(appStore.getState().styles.isHeaderVisable);
  
  useEffect(() => {
    appStore.subscribe(() => setIsOpen(appStore.getState().styles.isHeaderVisable));
  }, [appStore.getState().styles.isHeaderVisable])

  return (
    isOpen ?
      <BalendarHeader /> :
      <></>
  );
}