import 'dayjs/locale/ru';
import React, { Profiler, ReactElement, useEffect, useMemo, useRef, useState } from 'react';
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
  Box,
  SimpleGrid,
  Modal
} from '@mantine/core';
import { Calendar, DatePicker, Month } from '@mantine/dates';
import { useSelector, useDispatch } from 'react-redux'
import { Note } from '../../../models/note';
import { appStore, notesSlice } from '../../../app-store';
import NoteForm from '../../note-form/note-form';
import { sleep } from '../../../utils/time-utils';

type BalendarCalendarNoteProps = {
  defaultBackgroundColor: string,
  isJoinedLeft: boolean,
  isJoinedRight: boolean,
  note: Note,
}

export default function BalendarCalendarNote(props: BalendarCalendarNoteProps) {
  const { defaultBackgroundColor, isJoinedLeft, isJoinedRight, note } = props;

  const checkIsSelected = () => appStore.getState().notes.selectedNote ? 
    (appStore.getState().notes.selectedNote !as Note).id === note.id : false

  const [isSelected, setIsSelected] = useState(checkIsSelected())
  appStore.subscribe(() => {
    setIsSelected(checkIsSelected())
  })

  const appDispatch = useDispatch();
  const handleOnClick = () => {
    appDispatch(notesSlice.actions.setSelectedNote({ selectedNote: note }));
    appDispatch(notesSlice.actions.setIsNoteFormOpen({ isNoteFormOpen: true }));
  };

  return (
    useMemo(() => 
      <Box
        sx={(theme) => ({
          paddingLeft: 10,
          ...isSelected ? { border: '1px solid black' } : undefined,
          borderRadius: `${isJoinedLeft ? "0px" : "5px"} ${isJoinedRight ? "0px" : "5px"} ${isJoinedRight ? "0px" : "5px"} ${isJoinedLeft ? "0px" : "5px"}`,
          margin: `1px ${isJoinedRight ? "0px" : "10px"} 1px ${isJoinedLeft ? "0px" : "10px"}`,
          backgroundColor: note.primaryColor ?? defaultBackgroundColor,
          textAlign: 'left',
          textOverflow: 'clip',
          overflow: 'clip',
          cursor: 'default',
          ":hover": {
            filter: "brightness(1.1)"
          },
        })}
        onClick={(event: any) => {
          handleOnClick();
          event.stopPropagation();
        }}
      >
        <Text>{note.headerText}</Text>
      </Box>
    , [note.headerText, isSelected])
  );
}
