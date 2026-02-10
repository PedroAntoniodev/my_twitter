// src/api/profile.ts
const API_URL = "https://pedroantoniodev1.pythonanywhere.com/api";

// Buscar usuário pelo username
export const fetchUserByUsername = async (username: string) => {
  const res = await fetch(`${API_URL}/users/?search=${username}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  });
  if (!res.ok) throw new Error("Erro ao buscar usuário");
  return res.json();
};

// Buscar perfil
export const fetchProfile = async (username: string) => {
  const res = await fetch(`${API_URL}/profile/${username}/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  });
  if (!res.ok) throw new Error("Erro ao buscar perfil");
  return res.json();
};

// Buscar seguidores
export const fetchFollowers = async (username: string) => {
  const res = await fetch(`${API_URL}/followers/${username}/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  });
  if (!res.ok) throw new Error("Erro ao buscar seguidores");
  return res.json();
};

// Buscar seguindo
export const fetchFollowing = async (username: string) => {
  const res = await fetch(`${API_URL}/following/${username}/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  });
  if (!res.ok) throw new Error("Erro ao buscar seguindo");
  return res.json();
};

// Atualizar perfil
export const updateProfile = async (
  displayName: string,
  bio: string,
  avatar?: File,
) => {
  const formData = new FormData();
  formData.append("display_name", displayName);
  formData.append("bio", bio);
  if (avatar) {
    formData.append("avatar", avatar);
  }

  const res = await fetch(`${API_URL}/profile/update/`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
    body: formData,
  });

  if (!res.ok) throw new Error("Erro ao atualizar perfil");
  return res.json();
};
