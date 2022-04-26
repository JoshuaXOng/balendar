import { baseApiUrl } from "./services";

export type FetchAuthTokenProps = {
  username: string; 
  password: string;
}

export const fetchAuthToken = async (props: FetchAuthTokenProps): Promise<Response> => {
  return fetch(`${baseApiUrl}auth-tokens/`, { 
    method: "POST", 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(props) 
  })
}