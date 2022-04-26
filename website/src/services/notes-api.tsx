import { appStore } from "../app-store";

const baseApiUrl = "http://localhost:3000/api/v0/";

export const getAllNotes = async (): Promise<Response> => {
  const { authToken } = appStore.getState().auth;
  if (!authToken) throw new Error("No Authorization value is in the global store.");
  
  return fetch(`${baseApiUrl}notes/`, {
    headers: {
      "Authorization": `Bearer ${authToken!}`
    }
  })
}

export type CreateNoteProps = {
  headerText: string,
  bodyText: string,
  begDatetime?: string, 
  endDatetime?: string,
}

export const createNote = async (props: CreateNoteProps): Promise<Response> => {
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
  })
}

export type UpdateNoteProps = {
  id: string
  headerText?: string,
  bodyText?: string,
  begDatetime?: string, 
  endDatetime?: string,
}

export const updateNote = async (props: UpdateNoteProps): Promise<Response> => {
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
  })
}

export type DeleteNoteProps = {
  id: string
}

export const deleteNote = async (props: DeleteNoteProps): Promise<Response> => {
  const { id } = props;

  const { authToken } = appStore.getState().auth;
  if (!authToken) throw new Error("No Authorization value is in the global store.");

  return fetch(`${baseApiUrl}notes/${id}/`, { 
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${authToken!}`
    }
  })
}