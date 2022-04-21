import React, { useReducer, useState } from 'react';
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
} from '@mantine/core';
import BalendarHeader from './components/balendar-header/balendar-header';
import BalendarCalendar from './components/balendar-calendar/balendar-calendar';
import NoteForm from './components/note-form/note-form';
import BalendarCalendarDay from './components/balendar-calendar/balendar-calendar-entities/balendar-calendar-day';
import { DragDropContext } from 'react-beautiful-dnd';
import { AppContext } from './app-context';
import InifiniteScroll from './components/infinite-scroll/infinite-scroll';

export default function App() {
  const theme = useMantineTheme();
  return (
    <AppContext.Provider value={{ header: { height: 70 }, allNotes: [], balendarCalendarSetAllNotes: () => {} }}>
      <AppShell
        styles={{
          main: {
            background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          },
        }}
        fixed
        navbarOffsetBreakpoint="sm"
        header={<BalendarHeader />}
        asideOffsetBreakpoint="sm"
        aside={
          <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
            <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
              <NoteForm></NoteForm>
            </Aside>
          </MediaQuery>
        }
      >
        <BalendarCalendar></BalendarCalendar>
      </AppShell>
    </AppContext.Provider>
  );
}