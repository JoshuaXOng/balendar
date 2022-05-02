import { useMemo, useState } from 'react';
import { Text, Box } from '@mantine/core';
import { useDispatch } from 'react-redux'
import { Note } from '../../../models';
import { appStore, notesSlice } from '../../../app-store';

type BalendarCalendarNoteProps = {
  defaultBackgroundColor: string,
  isJoinedLeft: boolean,
  isJoinedRight: boolean,
  note: Note,
}

export default function BalendarCalendarNote(props: BalendarCalendarNoteProps) {
  const { defaultBackgroundColor, isJoinedLeft, isJoinedRight, note } = props;

  const checkIsSelected = () => appStore.getState().notes.selectedNote ? 
    (appStore.getState().notes.selectedNote !as Note).id === note.id : false

  const [isSelected, setIsSelected] = useState(checkIsSelected())
  appStore.subscribe(() => {
    setIsSelected(checkIsSelected())
  })

  const appDispatch = useDispatch();
  const handleOnClick = () => {
    appDispatch(notesSlice.actions.setSelectedNote({ selectedNote: note }));
    appDispatch(notesSlice.actions.setIsNoteFormOpen({ isNoteFormOpen: true }));
  };

  return (
    useMemo(() => 
      <Box
        sx={(theme) => ({
          paddingLeft: 10,
          ...isSelected ? { border: '1px solid black' } : undefined,
          borderRadius: `${isJoinedLeft ? "0px" : "5px"} ${isJoinedRight ? "0px" : "5px"} ${isJoinedRight ? "0px" : "5px"} ${isJoinedLeft ? "0px" : "5px"}`,
          margin: `1px ${isJoinedRight ? "0px" : "10px"} 1px ${isJoinedLeft ? "0px" : "10px"}`,
          backgroundColor: note.primaryColor ?? defaultBackgroundColor,
          textAlign: 'left',
          textOverflow: 'clip',
          overflow: 'clip',
          cursor: 'default',
          ":hover": {
            filter: "brightness(1.1)"
          },
        })}
        onClick={(event: any) => {
          handleOnClick();
          event.stopPropagation();
        }}
      >
        <Text>{note.headerText}</Text>
      </Box>
    , [note.headerText, isSelected])
  );
}
