import {
  SimpleGrid
} from '@mantine/core';
import BalendarCalendarDay from './balendar-calendar-day';

type BalendarCalendarWeekProps = {
  mondayDatetime: Date;
}

export default function BalendarCalendarWeek(props: BalendarCalendarWeekProps) {
  const { mondayDatetime } = props;
  
  const daysOfTheWeek = [...Array(7).keys()].map(_ => new Date(mondayDatetime));
  daysOfTheWeek.forEach((date, index) => date.setDate(date.getDate() + index));

  return (
    <SimpleGrid cols={7} spacing={0}
      breakpoints={[
        { maxWidth: 900, cols: 3 },
        { maxWidth: 400, cols: 1 },
      ]}
    >
      {daysOfTheWeek.map((dotw, index) => <BalendarCalendarDay currentDatetime={dotw} key={index}></BalendarCalendarDay>)}
    </SimpleGrid>
  );
}
