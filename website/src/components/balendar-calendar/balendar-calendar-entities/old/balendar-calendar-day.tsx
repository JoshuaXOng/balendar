import short from 'short-uuid';
import 'dayjs/locale/ru';
import React, { useCallback, useEffect, useRef, useState } from 'react';
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
import BalendarCalendarNote from '../balendar-calendar-note';

const elements = [
  { id: "one", content: "one" },
  { id: "two", content: "two" },
  { id: "three", content: "three" },
  { id: "four", content: "four" }
];

export default function BalendarCalendarDay() {
  const droppableId = useRef(short.generate());
  const [items, setItems] = useState(elements);

  const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
    if (!result.destination) 
      return;

    const newItems = Array.from(items);
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination!.index, 0, removed);
    setItems(newItems);
  };
  
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
    >
      <Droppable droppableId={droppableId.current} type="NOTE">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey' }}
            {...provided.droppableProps}
          >              
            {items.map((e, index)=> (
              <Draggable draggableId={e.id} key={short.generate()} index={index}>
                {(provided, snapshot) => (
                  <div 
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {e.content}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Box>
  );
}