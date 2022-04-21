import short from 'short-uuid';
import 'dayjs/locale/ru';
import React, { useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from 'react';
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
import { useMove } from '@mantine/hooks';
import { DragDropContext, Droppable, Draggable, DroppableProvided, DroppableStateSnapshot, DropResult, ResponderProvided } from "react-beautiful-dnd";
import BalendarCalendarNote from './balendar-calendar-note';
import { Note } from '../../../models/note';
import { toDateFromNotesApi, toNotesApiDateFromDate } from '../../../services/notes-api';
import { MONTHS } from '../../../utils/date-utils';
import { AppContext } from '../../../old/app-context';
import { appStore } from '../../../app-store';

type BalendarCalendarDayProps = {
  currentDatetime: Date;
}

export default function BalendarCalendarDay(props: BalendarCalendarDayProps) {
  const { currentDatetime } = props;

  const [dayNotes, setDayNotes] = useState([] as Note[]);
  
  appStore.subscribe(() => setDayNotes(appStore.getState().notes.allNotes.filter(n => n.begDatetime === toNotesApiDateFromDate(currentDatetime))))

  return (
    useMemo(() => 
      <Box
        sx={(theme) => ({
          position: 'relative',
          height: '100%',
          padding: '5px 0 5px 0',
          border: '1px solid #eee',
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
          textAlign: 'center',
        })}
      >
        <Text>{currentDatetime.getDate() === 1 ? `${MONTHS[currentDatetime.getMonth()]} ${currentDatetime.getDate()}` : `${currentDatetime.getDate()}`}</Text>
        {dayNotes.map((dn, index) => <BalendarCalendarNote key={index} backgroundColor='salmon' isJoinedLeft={false} isJoinedRight={true}>{dn.headerText}</BalendarCalendarNote>)}
      </Box>
    , [dayNotes.length])
  );
}