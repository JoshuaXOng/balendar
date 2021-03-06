import 'dayjs/locale/ru';
import { forwardRef, useEffect, useRef, useState } from 'react';
import {
  ScrollArea,
  Skeleton,
  useMantineTheme
} from '@mantine/core';
import { useDispatch } from 'react-redux'
import BalendarCalendarWeek from './balendar-calendar-entities/balendar-calendar-week';
import { getAllNotes } from '../../services';
import { getClosestPrevMonday } from '../../utils';
import { notesSlice } from '../../app-store';
import { showNotification } from '@mantine/notifications';

type BalendarCalendarProps = {
  onIsDataReady: () => void
}

export const BalendarCalendar = forwardRef((props: BalendarCalendarProps, ref) => {
  const { onIsDataReady } = props

  const appDispatch = useDispatch();

  const theme = useMantineTheme();
  
  const [isDataReady, setIsDataReady] = useState(false);

  useEffect(() => {
    (async () => {
      const notesReponse = await getAllNotes();
      if (notesReponse instanceof Error) 
        return showNotification({ color: "red", title: "Errrorrr!", message: "Server down - cannot load notes" })
      
      const allNotes = await notesReponse.json()
      appDispatch(notesSlice.actions.setAllNotes({ allNotes }))
      setIsDataReady(true);
    })()
  }, [])

  const currentWeeksMonday = getClosestPrevMonday();
  const pastMondays = [...Array(70).keys()].map(_ => new Date(currentWeeksMonday));
  pastMondays.forEach((date, index) => date.setDate(date.getDate() - 7*(index+1)));
  const futureMondays = [...Array(70).keys()].map(_ => new Date(currentWeeksMonday));
  futureMondays.forEach((date, index) => date.setDate(date.getDate() + 7*(index+1)));
  const [coveredMondays, setCoveredMondays] = useState([...pastMondays.reverse(), currentWeeksMonday, ...futureMondays]);

  let scroller = useRef<any>();
  useEffect(() => {
    scroller.current?.scrollTo({ top: (scroller.current.scrollHeight - window.innerHeight) / 2, behavior: 'instant' });
    onIsDataReady();
  }, [isDataReady])
  
  return (
    <>
      <ScrollArea style={{ height: isDataReady ? "100%" : "0%", backgroundColor: theme.colors.gray[3] }} viewportRef={ref as any ?? scroller}>
        {coveredMondays.map((cm, index) => <BalendarCalendarWeek key={index} mondayDatetime={cm}></BalendarCalendarWeek>)}
      </ScrollArea> 
      {isDataReady ? <></> : <Skeleton width="100%" height="100%" />}
    </>
  );
})