const API_URL = "https://pedroantoniodev1.pythonanywhere.com/api";

export const login = async (username: string, password: string) => {
  const res = await fetch(`${API_URL}/auth/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail || "Erro ao fazer login");
  }

  return res.json(); // { access, refresh }
};

export const register = async (
  username: string,
  email: string,
  password: string,
) => {
  const res = await fetch(`${API_URL}/auth/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    if (errorData.username) {
      throw new Error("Esse usuário já existe!");
    } else if (errorData.email) {
      throw new Error("Esse email já existe!");
    } else {
      throw new Error("Erro ao registrar usuário, verifique os dados.");
    }
  }

  return res.json();
};
