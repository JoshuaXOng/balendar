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
  ActionIcon,
  TextInput,
  ColorPicker,
  ColorSwatch,
  ColorInput
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useSelector, useDispatch } from 'react-redux'
import { createNote, CreateNoteProps, deleteNote, getAllNotes, updateNote } from '../../services/notes-api';
import { AppContext } from '../../old/app-context';
import { appStore, notesSlice, stylesSlice } from '../../app-store';
import { Note } from '../../models/note';
import { showNotification } from '@mantine/notifications';
import { useForm } from '@mantine/form';
import { DateStringed, stringifyDateAttributes, toDateFromYyyyMmDd, toYyyyMmDdFromDate } from '../../utils';

export default function NoteForm() {
  const appDispatch = useDispatch();

  const { selectedNote, selectedDay } = appStore.getState().notes;
  const initialNote: DateStringed<Note> = selectedNote ?
    stringifyDateAttributes(selectedNote, (date) => toYyyyMmDdFromDate(date))! : { 
      id: "", primaryColor: "salmon", 
      headerText: "", bodyText: "", 
      begDatetime: selectedDay !as string, endDatetime: selectedDay !as string
    };

  const [formType, setFormType] = useState<"create" | "update">(!!selectedNote ? "update" : "create");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    initialValues: {
      id: initialNote.id,
      primaryColor: initialNote.primaryColor,
      headerText: initialNote.headerText, bodyText: initialNote.bodyText,
      begDatetime: initialNote.begDatetime, endDatetime: initialNote.endDatetime
    },
    validate: {
      headerText: (text) => text.replace(" ", "").length >= 1 ? null : "Cannot be empty",
    },
  });

  appStore.subscribe(() => {
    const { selectedNote, selectedDay } = appStore.getState().notes;

    if (selectedNote) {
      setFormType("update");
      
      const { id, primaryColor, headerText, bodyText, begDatetime, endDatetime } = selectedNote !as Note;
      form.setValues({ 
        id, primaryColor, headerText, bodyText, begDatetime, endDatetime
      })
    }
    
    if (selectedDay) {
      setFormType("create");
      form.reset();
      form.setFieldValue("begDatetime", toYyyyMmDdFromDate(new Date()));
      form.setFieldValue("endDatetime", toYyyyMmDdFromDate(new Date()));
    }
  })

  const handleOnDeleteClick = () => {
    (async () => {
      const deleteResponse = await deleteNote({ id: form.values.id })
      if (deleteResponse instanceof Error) 
        return showNotification({ color: "red", title: "Errorrr!", message: "Server down - could not delete note" })

      const getResponse = await getAllNotes();
      if (getResponse instanceof Error) 
        return showNotification({ color: "red", title: "Errorrr!", message: "Server down - could not refresh notes" })

      const allNotes = await getResponse.json()
      appDispatch(notesSlice.actions.setAllNotes({ allNotes }));

      appDispatch(notesSlice.actions.clearSelectedNote());

      appStore.dispatch(notesSlice.actions.setIsNoteFormOpen({ isNoteFormOpen: false }));
      form.reset();
    })()
  }

  const handleOnSubmit = async (value: typeof form.values) => {
    setIsSubmitting(true);

    const { id, primaryColor, headerText, bodyText, begDatetime, endDatetime } = form.values;

    if (formType === "create") {
      (async () => {
        const createResponse = await createNote({ primaryColor, headerText, bodyText, begDatetime: begDatetime });
        if (createResponse instanceof Error) 
          return showNotification({ color: "red", title: "Errrorrr!", message: "Server down - could not create note" })
        
        const getResponse = await getAllNotes();
        if (getResponse instanceof Error)
          return showNotification({ color: "red", title: "Errrorrr!", message: "Server down - could not refresh notes" })

        const allNotes = await getResponse.json()
        appDispatch(notesSlice.actions.setAllNotes({ allNotes }))
      })()
    } 
    
    if (formType === "update") {
      (async () => {
        const updateResponse = await updateNote({ id, primaryColor, headerText, bodyText, begDatetime: begDatetime });
        if (updateResponse instanceof Error)
          return showNotification({ color: "red", title: "Errrorrr!", message: "Server down - could not update note" })
         
        const getResponse = await getAllNotes();
        if (getResponse instanceof Error)
          return showNotification({ color: "red", title: "Errrorrr!", message: "Server down - could not refresh notes" })

        const allNotes = await getResponse.json()
        appDispatch(notesSlice.actions.setAllNotes({ allNotes }))
        appDispatch(notesSlice.actions.clearSelectedNote())
      })()
    }

    setIsSubmitting(false);
    appStore.dispatch(notesSlice.actions.setIsNoteFormOpen({ isNoteFormOpen: false }));
    form.reset();
  }

  return (
    <form onSubmit={form.onSubmit((values) => handleOnSubmit(values))}>
      <Group direction="column" grow={true}>
        <Group position='apart'>
          <Title order={4}>{formType === "update" ? "Update Note" : "Create Note"}</Title>
          {formType && <ActionIcon onClick={() => handleOnDeleteClick()}>
            <AiFillDelete />
          </ActionIcon>}
        </Group>
        <DatePicker label="Event date" placeholder="Pick date" {...form.getInputProps("begDatetime")} 
          value={form.getInputProps("begDatetime").value ? toDateFromYyyyMmDd(form.getInputProps("begDatetime").value) : null} required 
          onChange={(date) => form.setFieldValue("begDatetime", toYyyyMmDdFromDate(date!))} 
        />
        <ColorInput label="Primary Colour" placeholder="Pick color" {...form.getInputProps("primaryColor")} />
        <InputWrapper
          label="Header"
          required
        >
          <TextInput placeholder="Enter text" {...form.getInputProps("headerText")} />
        </InputWrapper>
        <Textarea
          label="Body"
          placeholder="Enter text"
          minRows={7}
          {...form.getInputProps("bodyText")}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ?
            "Loading..." :
            formType === "update" ? "Save" : "Create"}
        </Button>
      </Group>
    </form>
  );
}