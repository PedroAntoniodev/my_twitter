// src/api/follow.ts
const API_URL = "https://pedroantoniodev1.pythonanywhere.com/api";

// checar se o usuário segue ou nao
export const checkFollowStatus = async (username: string) => {
  const res = await fetch(`${API_URL}/profile/${username}/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  });

  if (!res.ok) throw new Error("Erro ao buscar perfil");
  return res.json(); // contém { followed_by_me: boolean }
};

// seguir ou deixar de seguir
export const toggleFollow = async (username: string) => {
  const res = await fetch(`${API_URL}/follow/${username}/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  });

  if (!res.ok) throw new Error("Erro ao seguir/deixar de seguir");
  return res.json();
};
