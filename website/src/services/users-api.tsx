const baseApiUrl = "http://localhost:8080/api/v0/";

export type CreateUserProps = {
  username: string; 
  password: string;
}

export const createUser = async (props: CreateUserProps): Promise<Response> => {
  return fetch(`${baseApiUrl}users/`, { 
    method: "POST", 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(props) 
  })
}