import 'dayjs/locale/ru';
import React, { useCallback, useContext, useEffect, useReducer, useRef, useState } from 'react';
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
  ScrollArea,
  Skeleton
} from '@mantine/core';
import { Calendar, DatePicker, Month } from '@mantine/dates';
import { useSelector, useDispatch } from 'react-redux'
import BalendarCalendarDay from './balendar-calendar-entities/balendar-calendar-day';
import BalendarCalendarWeek from './balendar-calendar-entities/balendar-calendar-week';
import { AppContext } from '../../old/app-context';
import { getAllNotes } from '../../services/notes-api';
import { generateMondays, getClosestPrevMonday } from '../../utils/date-utils';
import { useScrollLock } from '@mantine/hooks';
import short, { uuid } from 'short-uuid';
import { appStore, notesSlice } from '../../app-store';
import { showNotification } from '@mantine/notifications';

export default function BalendarCalendar() {
  const appState = appStore.getState();
  const appDispatch = useDispatch();
  
  const [isDataReady, setIsDataReady] = useState(false);

  const offset = appState.styles.headerHeight !as number + 50;
  const initialCalendarHeight = window.innerHeight - offset;
  const [calendarHeight, setCalendarHeight] = useState(initialCalendarHeight);
  const handleWindowReize = () => {
    setCalendarHeight(window.innerHeight - offset);
  }
  useEffect(() => {
    window.addEventListener("resize", () => handleWindowReize(), false);
  }, []);
  
  useEffect(() => {
    (async () => {
      const notesReponse = await getAllNotes();
      if (notesReponse instanceof Error) {
        showNotification({ color: "red", title: "Errrorrr!", message: "Server down - cannot load notes" })
      } else {
        const allNotes = await notesReponse.json()
        appDispatch(notesSlice.actions.setAllNotes({ allNotes }))
        setIsDataReady(true);
      }
    })()
  }, [])

  const currentWeeksMonday = getClosestPrevMonday();
  const pastMondays = [...Array(70).keys()].map(_ => new Date(currentWeeksMonday));
  pastMondays.forEach((date, index) => date.setDate(date.getDate() - 7*(index+1)));
  const futureMondays = [...Array(70).keys()].map(_ => new Date(currentWeeksMonday));
  futureMondays.forEach((date, index) => date.setDate(date.getDate() + 7*(index+1)));
  const [coveredMondays, setCoveredMondays] = useState([...pastMondays.reverse(), currentWeeksMonday, ...futureMondays]);

  const scroller = useRef<any>();
  useEffect(() => {
    scroller.current?.scrollTo({ top: (scroller.current.scrollHeight - calendarHeight) / 2, behavior: 'instant' });
  }, [isDataReady])

  return (
    isDataReady ?
      <ScrollArea style={{ height: calendarHeight }} viewportRef={scroller}>
        {coveredMondays.map((cm, index) => <BalendarCalendarWeek key={index} height={Math.max(Math.min(calendarHeight / 4, 250), 170)} mondayDatetime={cm}></BalendarCalendarWeek>)}
      </ScrollArea> :
      <Skeleton width="100%" height="100%" />
  );
}