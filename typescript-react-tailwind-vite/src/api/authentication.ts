import { DOMAIN } from "./config";


export const registerApi = async (bodyObject: Record<string, any>): Promise<[any, string | null]> => {
    const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyObject),
  };

  

  try {
    const response = await fetch(`${DOMAIN}/users`, requestOptions);

    if (response.ok) {
      const result = await response.json();
      return [ result,''];
    }
    if(response.status === 422){
      return [ '','User already exist' ];
    }
    const errorMessage = await response.text();
    return [ '', `Server side error` ];
  } catch (error) {
        return [ '', `Server down: ${error}` ];
  }
};
export const loginApi = async (bodyObject: Record<string, any>): Promise<[any, string | null]> => {
    const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyObject),
  };

  

  try {
    const response = await fetch(`${DOMAIN}/users/sign_in`, requestOptions);

    if (response.ok) {
      return [ response,''];
    }
    if(response.status === 401){
      return['','Invalid email or password']
    }
    if(response.status === 422){
      return [ '','User already exist' ];
    }
    const errorMessage = await response.text();
    return [ '', `Server side error:${errorMessage}` ];
  } catch (error) {
        return [ '', `Server down: ${error}` ];
  }
};
