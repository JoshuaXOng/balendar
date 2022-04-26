import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Aside,
} from '@mantine/core';
import { useSelector, useDispatch } from 'react-redux'
import pinkGunther from '../../../assets/pink-gunther.svg';
import { AppContext } from '../../old/app-context';
import { appStore, stylesSlice } from '../../app-store';
import NoteForm from '../note-form/note-form';

export default function CustomAside() {
  const [isOpen, setIsOpen] = useState(appStore.getState().styles.isAsideOpen);
  
  useEffect(() => {
    appStore.subscribe(() => setIsOpen(appStore.getState().styles.isAsideOpen));
  }, [appStore.getState().styles.isAsideOpen])

  return (
    isOpen ?
      <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
        <NoteForm></NoteForm>
      </Aside> :
      <></>
  );
}