// src/api/users.ts
const API_URL = "https://pedroantoniodev1.pythonanywhere.com/api";

// Buscar usuários
export const searchUsers = async (term: string) => {
  const res = await fetch(`${API_URL}/users/?search=${term}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  });

  if (!res.ok) throw new Error("Erro ao buscar usuários");
  return res.json();
};

// Trocar a senha do usuario
export const changePassword = async (
  oldPassword: string,
  newPassword: string,
) => {
  const res = await fetch(`${API_URL}/users/change-password/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
    body: JSON.stringify({
      old_password: oldPassword,
      new_password: newPassword,
    }),
  });

  if (!res.ok) throw new Error("Erro ao trocar senha");
  return res.json();
};

// usuario logado
export const fetchCurrentUser = async () => {
  const res = await fetch(`${API_URL}/auth/me/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  });

  if (!res.ok) throw new Error("Erro ao buscar usuário logado");
  return res.json();
};
