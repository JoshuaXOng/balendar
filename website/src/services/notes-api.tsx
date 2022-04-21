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

export const toDateFromNotesApi = (apiDate: string) => {
  const [year, month, day] = apiDate.split("-");

  const date = new Date();
  date.setFullYear(parseInt(year));
  date.setMonth(parseInt(month) + 1);
  date.setDate(parseInt(day));
  return date;
}

export const toNotesApiDateFromDate = (date: Date) => {
  return `${(date.getFullYear()).toString().padStart(4, "0")}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}` 
}
