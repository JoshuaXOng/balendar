import 'dayjs/locale/ru';
import React, { useEffect, useRef, useState } from 'react';
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
import BalendarCalendarDay from './balendar-calendar-day';

type BalendarCalendarWeekProps = {
  height: number;
  mondayDatetime: Date;
}

export default function BalendarCalendarWeek(props: BalendarCalendarWeekProps) {
  const { height, mondayDatetime } = props;
  
  const daysOfTheWeek = [...Array(7).keys()].map(_ => new Date(mondayDatetime));
  daysOfTheWeek.forEach((date, index) => date.setDate(date.getDate() + index));

  return (
    <SimpleGrid style={{ height }} cols={7} spacing={0}>
      {daysOfTheWeek.map((dotw, index) => <BalendarCalendarDay currentDatetime={dotw} key={index}></BalendarCalendarDay>)}
    </SimpleGrid>
  );
}
