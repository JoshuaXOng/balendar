const baseApiUrl = "http://localhost:8080/api/v0/";

export const getAllNotes = async (): Promise<Response> => {
  return fetch(`${baseApiUrl}notes/`)
}

export type CreateNoteProps = {
  headerText: string,
  bodyText: string,
  begDatetime?: string, 
  endDatetime?: string,
}

export const createNote = async (props: CreateNoteProps): Promise<Response> => {
  return fetch(`${baseApiUrl}notes/`, { 
    method: "POST", 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
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
  return fetch(`${baseApiUrl}notes/${id}/`, { 
    method: "PUT", 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(rest) 
  })
}

export type DeleteNoteProps = {
  id: string
}

export const deleteNote = async (props: DeleteNoteProps): Promise<Response> => {
  const { id } = props;
  return fetch(`${baseApiUrl}notes/${id}/`, { method: "DELETE" })
}