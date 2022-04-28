import short from 'short-uuid';
import 'dayjs/locale/ru';
import React, { Profiler, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from 'react';
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
  ScrollArea
} from '@mantine/core';
import { Calendar, DatePicker, Month } from '@mantine/dates';
import { useMove } from '@mantine/hooks';
import { DragDropContext, Droppable, Draggable, DroppableProvided, DroppableStateSnapshot, DropResult, ResponderProvided } from "react-beautiful-dnd";
import BalendarCalendarNote from './balendar-calendar-note';
import { Note } from '../../../models/note';
import { MONTHS } from '../../../utils/date-utils';
import { AppContext } from '../../../old/app-context';
import { appStore, notesSlice } from '../../../app-store';
import { toNotesApiDateFromDate } from '../../../services/notes-api-utils';

type BalendarCalendarDayProps = {
  currentDatetime: Date;
}

export default function BalendarCalendarDay(props: BalendarCalendarDayProps) {
  const { currentDatetime } = props;

  const [dayNotes, setDayNotes] = useState([] as Note[]);
  
  // THIS IS WHERE THE NON-LOADING OCCURS 
  appStore.subscribe(() => {
    const notes = appStore.getState().notes.allNotesBegDatetimeIndexed[toNotesApiDateFromDate(currentDatetime)]
    if (notes?.length && notes.length !== dayNotes.length)
      setDayNotes(appStore.getState().notes.allNotesBegDatetimeIndexed[toNotesApiDateFromDate(currentDatetime)] ?? []);
  })

  useEffect(() => {
    setDayNotes(appStore.getState().notes.allNotesBegDatetimeIndexed[toNotesApiDateFromDate(currentDatetime)] ?? []);
  }, []);

  const handleOnClick = () => {
    appStore.dispatch(notesSlice.actions.clearSelectedNote());
    appStore.dispatch(notesSlice.actions.setSelectedDay({ selectedDay: toNotesApiDateFromDate(currentDatetime) }));
  }

  return (
    <Box
      sx={(theme) => ({
        position: 'relative',
        height: '100%',
        padding: '5px 0 5px 0',
        border: '1px solid #eee',
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        textAlign: 'center',
      })}
      onClick={() => handleOnClick()}
    >
      <Text>{currentDatetime.getDate() === 1 ? `${MONTHS[currentDatetime.getMonth()]} ${currentDatetime.getDate()}` : `${currentDatetime.getDate()}`}</Text>
      <Box sx={{ height: "70%", overflowY: 'auto', '::-webkit-scrollbar': { display: 'none' } }}> 
        {dayNotes.map((dn, index) => <BalendarCalendarNote key={index} backgroundColor='salmon' isJoinedLeft={false} isJoinedRight={true} note={dn} />)}
      </Box>
    </Box>
  );
}

