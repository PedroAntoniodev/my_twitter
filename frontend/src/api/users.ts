const API_URL = "https://pedroantoniodev1.pythonanywhere.com/api";

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
}

export async function registerUser(
  data: RegisterPayload
): Promise<User | { detail: string }> {
  const response = await fetch(`${API_URL}/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}
