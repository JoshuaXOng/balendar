import { XOR } from "../utils";
import { baseApiUrl } from "./services";

export type FetchAuthTokenProps = XOR<{
  username: string; 
  password: string;
}, {
  authToken: string;
}>

export const fetchAuthToken = async (props: FetchAuthTokenProps): Promise<Response | Error> => {
  return fetch(`${baseApiUrl}auth-tokens/`, { 
    method: "POST", 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(props) 
  }).catch(error => error)
}

export type CalidateAuthTokenProps = {
  authToken: string;
}

export const validateAuthToken = async (props: CalidateAuthTokenProps): Promise<Response | Error> => {
  return fetch(`${baseApiUrl}auth-tokens/validations/`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(props)
  }).catch(error => error)
}
