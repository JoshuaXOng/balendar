import React, { useContext, useEffect, useRef, useState } from 'react';
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
  Textarea,
  Input,
  InputWrapper,
  Button
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useSelector, useDispatch } from 'react-redux'
import { createNote, CreateNoteProps, getAllNotes, toNotesApiDateFromDate } from '../../services/notes-api';
import { AppContext } from '../../old/app-context';
import { appStore, notesSlice, stylesSlice } from '../../app-store';

export default function NoteForm() {
  const appDispatch = useDispatch();

  const [date, setDate] = useState<string | undefined>(undefined);
  const [headerText, setHeaderText] = useState("");
  const [bodyText, setBodyText] = useState("");

  const handleOnDateChange = (date: Date | null) => {
    if (!date) return setDate(undefined);
    setDate(toNotesApiDateFromDate(date));
  }
  
  const handleSubmission = async ({ headerText, bodyText, begDatetime }: CreateNoteProps) => {
    await createNote({ headerText, bodyText, begDatetime });
    getAllNotes()
      .then(response => response.json())
      .then(allNotes => appDispatch(notesSlice.actions.setAllNotes({ allNotes })));
  }

  const [isUpdatingNote, setIsUpdatingNote] = useState(false);
  appStore.subscribe(() => {
    if (appStore.getState().notes.selectedNote) setIsUpdatingNote(true);
  })

  return (
    <Group direction="column" grow={true}>
      <Title order={4}>{isUpdatingNote ? "Update Note" : "Create Note"}</Title>
      <DatePicker placeholder="Pick date" label="Event date" onChange={(date) => handleOnDateChange(date)} required />
      <InputWrapper
        label="Header"
        required
      >
        <Input placeholder="Enter text" onChange={(event: any) => setHeaderText(event.target.value)}/>
      </InputWrapper>
      <Textarea
        label="Body"
        placeholder="Enter text"
        minRows={7}
        onChange={(event: any) => setBodyText(event.target.value)}
      />
      <Button onClick={() => handleSubmission({ headerText, bodyText, begDatetime: date })}>Create</Button>
    </Group>
  );
}