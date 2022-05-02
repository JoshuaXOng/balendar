import { useEffect, useState } from 'react';
import {
  Text,
  Box
} from '@mantine/core';
import BalendarCalendarNote from './balendar-calendar-note';
import { Note } from '../../../models';
import { MONTHS, toYyyyMmDdFromDate } from '../../../utils';
import { appStore, notesSlice } from '../../../app-store';

type BalendarCalendarDayProps = {
  currentDatetime: Date;
}

export default function BalendarCalendarDay(props: BalendarCalendarDayProps) {
  const { currentDatetime } = props;

  const isToday = toYyyyMmDdFromDate(currentDatetime) === toYyyyMmDdFromDate(new Date());

  const [dayNotes, setDayNotes] = useState([] as Note[]);

  appStore.subscribe(() => {
    const notes = appStore.getState().notes.allNotesBegDatetimeIndexed[toYyyyMmDdFromDate(currentDatetime)]
    if ((notes?.length && notes.length !== dayNotes.length) || (dayNotes.length === 1 && !notes))
      setDayNotes(notes ?? []);
  })

  useEffect(() => {
    setDayNotes(appStore.getState().notes.allNotesBegDatetimeIndexed[toYyyyMmDdFromDate(currentDatetime)] ?? []);
  }, []);

  const handleOnClick = () => {
    appStore.dispatch(notesSlice.actions.clearSelectedNote());
    appStore.dispatch(notesSlice.actions.setSelectedDay({ selectedDay: toYyyyMmDdFromDate(currentDatetime) }));
    appStore.dispatch(notesSlice.actions.setIsNoteFormOpen({ isNoteFormOpen: true }));
  }

  return (
    <Box
      sx={(theme) => ({
        position: 'relative',
        height: '200px',
        padding: '5px 0 5px 0',
        border: isToday ? `1px solid ${theme.colors.lime[4]}` : `1px solid ${theme.colors.gray[3]}`,
        backgroundColor: isToday ? theme.colors.lime[1] : (theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0]),
        textAlign: 'center',
      })}
      onClick={() => handleOnClick()}
    >
      <Text sx={{ height: "15%" }}>{currentDatetime.getDate() === 1 ? `${MONTHS[currentDatetime.getMonth()]} ${currentDatetime.getDate()}` : `${currentDatetime.getDate()}`}{isToday && " - TODAY"}</Text>
      <Box sx={{ height: "85%", overflowY: 'auto', '::-webkit-scrollbar': { display: 'none' } }}> 
        {dayNotes.map((dn, index) => <BalendarCalendarNote key={index} defaultBackgroundColor='salmon' isJoinedLeft={false} isJoinedRight={true} note={dn} />)}
      </Box>
    </Box>
  );
}

