import 'dayjs/locale/ru';
import React, { ReactElement, useEffect, useMemo, useRef, useState } from 'react';
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
  SimpleGrid
} from '@mantine/core';
import { Calendar, DatePicker, Month } from '@mantine/dates';
import { useSelector, useDispatch } from 'react-redux'
import { Note } from '../../../models/note';
import { appStore, notesSlice } from '../../../app-store';

type BalendarCalendarNoteProps = {
  backgroundColor: string,
  isJoinedLeft: boolean,
  isJoinedRight: boolean,
  note: Note,
}

export default function BalendarCalendarNote(props: BalendarCalendarNoteProps) {
  const { backgroundColor, isJoinedLeft, isJoinedRight, note } = props;

  const appDispatch = useDispatch();

  return (
    <Box
      sx={(theme) => ({
        paddingLeft: 10,
        borderRadius: `${isJoinedLeft ? "0px" : "5px"} ${isJoinedRight ? "0px" : "5px"} ${isJoinedRight ? "0px" : "5px"} ${isJoinedLeft ? "0px" : "5px"}`,
        margin: `1px ${isJoinedRight ? "0px" : "10px"} 1px ${isJoinedLeft ? "0px" : "10px"}`,
        backgroundColor: backgroundColor,
        textAlign: 'left',
        cursor: 'default'
      })}
      onClick={() => appDispatch(notesSlice.actions.setSelectedNote({ selectedNote: note }))}
    >
      <Text>{note.headerText}</Text>
    </Box>
  );
}
