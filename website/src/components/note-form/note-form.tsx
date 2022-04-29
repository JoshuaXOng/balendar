import React, { useContext, useEffect, useRef, useState } from 'react';
import { AiFillDelete } from "react-icons/ai";
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
  Button,
  ActionIcon
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useSelector, useDispatch } from 'react-redux'
import { createNote, CreateNoteProps, deleteNote, getAllNotes, updateNote } from '../../services/notes-api';
import { AppContext } from '../../old/app-context';
import { appStore, notesSlice, stylesSlice } from '../../app-store';
import { Note } from '../../models/note';
import { toDateFromNotesApi, toNotesApiDateFromDate } from '../../services/notes-api-utils';
import { showNotification } from '@mantine/notifications';

type CUNotePropsDTO = {
  id: string,
  headerText: string,
  bodyText: string,
  begDatetime: Date | undefined | null,
}

export default function NoteForm() {
  const appDispatch = useDispatch();

  const [id, setId] = useState("");
  const [date, setDate] = useState<Date | undefined | null>(undefined);
  const [headerText, setHeaderText] = useState("");
  const [bodyText, setBodyText] = useState("");
  
  const resetInputs = () => {
    setDate(null);
    setHeaderText("");
    setBodyText("");
  }

  const [isUpdateForm, setIsUpdateForm] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  appStore.subscribe(() => {
    if (appStore.getState().notes.selectedNote) {
      setIsUpdateForm(true);
      
      const selectedNote = appStore.getState().notes.selectedNote !as Note;
      setId(selectedNote.id);
      setDate(toDateFromNotesApi(selectedNote.begDatetime));
      setHeaderText(selectedNote.headerText);
      setBodyText(selectedNote.bodyText);
    }
    else if (appStore.getState().notes.selectedDay) {
      setIsUpdateForm(false);
      resetInputs();
      setDate(toDateFromNotesApi(appStore.getState().notes.selectedDay!));
    }
    else {
      setIsUpdateForm(false);
      resetInputs();
    }
  })

  const handleOnDeleteClick = () => {
    (async () => {
      const deleteResponse = await deleteNote({ id })
      if (deleteResponse instanceof Error) 
        return showNotification({ color: "red", title: "Errorrr!", message: "Server down - could not delete note" })

      const getResponse = await getAllNotes();
      if (getResponse instanceof Error) 
        return showNotification({ color: "red", title: "Errorrr!", message: "Server down - could not refresh notes" })

      const allNotes = getResponse.json()
      appDispatch(notesSlice.actions.setAllNotes({ allNotes }));
      appDispatch(notesSlice.actions.clearSelectedNote())
      resetInputs()
    })()
  }
  
  const handleOnDateChange = (date: Date | null) => {
    if (!date) return setDate(undefined);
    setDate(date);
  }

  const isSubmissionDisabled = () => {
    if (!date) return true;
    if (!headerText.trim().length) return true;
  }

  const handleSubmission = async ({ id, headerText, bodyText, begDatetime }: CUNotePropsDTO) => {
    setIsUploading(true);
    if (!isUpdateForm) {
      (async () => {
        const createResponse = await createNote({ headerText, bodyText, begDatetime: toNotesApiDateFromDate(begDatetime!) });
        if (createResponse instanceof Error) 
          return showNotification({ color: "red", title: "Errrorrr!", message: "Server down - could not create note" })
        
        
        const getResponse = await getAllNotes();
        if (getResponse instanceof Error)
          return showNotification({ color: "red", title: "Errrorrr!", message: "Server down - could not refresh notes" })

        const allNotes = await getResponse.json()
        appDispatch(notesSlice.actions.setAllNotes({ allNotes }))
        setIsUploading(false)
      })()
    } else {
      (async () => {
        const updateResponse = await updateNote({ id, headerText, bodyText, begDatetime: toNotesApiDateFromDate(begDatetime!) });
        if (updateResponse instanceof Error)
          return showNotification({ color: "red", title: "Errrorrr!", message: "Server down - could not update note" })
         
        const getResponse = await getAllNotes();
        if (getResponse instanceof Error)
          return showNotification({ color: "red", title: "Errrorrr!", message: "Server down - could not refresh notes" })

        const allNotes = await getResponse.json()
        appDispatch(notesSlice.actions.setAllNotes({ allNotes }))
        appDispatch(notesSlice.actions.clearSelectedNote())
        resetInputs();
        setIsUploading(false)
      })()
    }
  }

  return (
    <Group direction="column" grow={true}>
      <Group position='apart'>
        <Title order={4}>{isUpdateForm ? "Update Note" : "Create Note"}</Title>
        {isUpdateForm && <ActionIcon onClick={() => handleOnDeleteClick()}>
          <AiFillDelete />
        </ActionIcon>}
      </Group>
      <DatePicker placeholder="Pick date" label="Event date" value={date} onChange={(date) => handleOnDateChange(date)} required />
      <InputWrapper
        label="Header"
        required
      >
        <Input placeholder="Enter text" value={headerText} onChange={(event: any) => setHeaderText(event.target.value)}/>
      </InputWrapper>
      <Textarea
        label="Body"
        placeholder="Enter text"
        minRows={7}
        value={bodyText}
        onChange={(event: any) => setBodyText(event.target.value)}
      />
      <Button onClick={() => handleSubmission({ id, headerText, bodyText, begDatetime: date })} {...(isSubmissionDisabled() || isUploading) ? { disabled: true } : undefined}>
        {isUploading ?
          "Sending..." :
          isUpdateForm ? "Save" : "Create"}
      </Button>
    </Group>
  );
}