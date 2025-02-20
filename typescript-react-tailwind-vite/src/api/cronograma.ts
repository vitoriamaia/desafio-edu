import { DOMAIN } from "./config";

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

// Add Cronograma
export const addCronograma = async (
  jwtToken: string,
  bodyObject: Record<string, any>
): Promise<ApiResponse<any>> => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${jwtToken}`, // Use Bearer prefix for token
    },
    body: JSON.stringify(bodyObject),
  };

  try {
    const response = await fetch(`${DOMAIN}/api/v1/desafios`, requestOptions);

    if (response.ok) {
      const result = await response.json();
      return { data: result.data, error: null };
    }

    if (response.status === 422) {
      return { data: null, error: "Unauthorized user or invalid data" };
    }

    const errorMessage = await response.text();
    return { data: null, error: `Server side error: ${errorMessage}` };
  } catch (error) {
    return { data: null, error: `Server down: ${error}` };
  }
};
