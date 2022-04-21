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
import { createNote, CreateNoteProps, getAllNotes, toNotesApiDateFromDate } from '../../services/notes-api';
import { AppContext } from '../../app-context';

export default function NoteForm() {
  const appContext = useContext(AppContext);

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
      .then(notes => appContext.allNotes = notes)
      .then(notes => appContext.balendarCalendarSetAllNotes(notes));
  }

  return (
    <Group direction="column" grow={true}>
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