import { appStore } from "../app-store";
import { baseApiUrl } from "./services";

export const getAllNotes = async (): Promise<Response | Error> => {
  const { authToken } = appStore.getState().auth;
  if (!authToken) throw new Error("No Authorization value is in the global store.");
  
  return fetch(`${baseApiUrl}notes/`, {
    headers: {
      "Authorization": `Bearer ${authToken!}`
    }
  }).catch(error => error)
}

export type CreateNoteProps = {
  primaryColor: string,
  headerText: string,
  bodyText: string,
  begDatetime?: string, 
  endDatetime?: string,
}

export const createNote = async (props: CreateNoteProps): Promise<Response | Error> => {
  const { authToken } = appStore.getState().auth;
  if (!authToken) throw new Error("No Authorization value is in the global store.");

  return fetch(`${baseApiUrl}notes/`, { 
    method: "POST", 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${authToken!}`
    },
    body: JSON.stringify(props) 
  }).catch(error => error)
}

export type UpdateNoteProps = {
  id: string
  primaryColor?: string,
  headerText?: string,
  bodyText?: string,
  begDatetime?: string, 
  endDatetime?: string,
}

export const updateNote = async (props: UpdateNoteProps): Promise<Response | Error> => {
  const { id, ...rest } = props;

  const { authToken } = appStore.getState().auth;
  if (!authToken) throw new Error("No Authorization value is in the global store.");

  return fetch(`${baseApiUrl}notes/${id}/`, { 
    method: "PUT", 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${authToken!}`
    },
    body: JSON.stringify(rest) 
  }).catch(error => error)
}

export type DeleteNoteProps = {
  id: string
}

export const deleteNote = async (props: DeleteNoteProps): Promise<Response | Error> => {
  const { id } = props;

  const { authToken } = appStore.getState().auth;
  if (!authToken) throw new Error("No Authorization value is in the global store.");

  return fetch(`${baseApiUrl}notes/${id}/`, { 
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${authToken!}`
    }
  }).catch(error => error)
}