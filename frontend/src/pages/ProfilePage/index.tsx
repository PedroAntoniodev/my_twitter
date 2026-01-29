import { useState, useEffect } from "react";
import type { User } from "../../types/user";
import Header from "../../components/Header";
import * as S from "./styles";

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  // Buscar dados do usuário logado
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(
        "https://pedroantoniodev1.pythonanywhere.com/api/auth/me/",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        },
      );
      const data = await response.json();
      setUser(data);
    };
    fetchUser();
  }, []);

  // Atualizar perfil (aceita JSON ou FormData)
  const handleUpdateProfile = async (updates: Partial<User> | FormData) => {
    try {
      let response;
      if (updates instanceof FormData) {
        response = await fetch(
          "https://pedroantoniodev1.pythonanywhere.com/api/auth/me/",
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
            body: updates, // 👈 FormData para upload
          },
        );
      } else {
        response = await fetch(
          "https://pedroantoniodev1.pythonanywhere.com/api/auth/me/",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
            body: JSON.stringify(updates), // 👈 JSON para texto
          },
        );
      }

      if (!response.ok) throw new Error("Erro ao atualizar perfil");
      const updated = await response.json();
      setUser(updated);
      setShowSettings(false);
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return <p>Carregando...</p>;

  return (
    <S.ProfileContainer>
      <Header />
      <img src={user.avatar || "/default-avatar.png"} alt="Foto de perfil" />
      <h2>@{user.display_name}</h2>
      <p>{user.bio || "Sem bio ainda"}</p>

      <button onClick={() => setShowSettings(true)}>⚙️ Configurações</button>

      {showSettings && (
        <S.Modal>
          <h3>Editar Perfil</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);

              const updates = {
                display_name: formData.get("username") as string,
                bio: formData.get("bio") as string,
              };

              const file = formData.get("profile_picture") as File | null;

              if (file) {
                const uploadData = new FormData();
                uploadData.append("display_name", updates.display_name);
                uploadData.append("bio", updates.bio);
                uploadData.append("avatar", file);

                handleUpdateProfile(uploadData);
              } else {
                handleUpdateProfile(updates);
              }
            }}
          >
            <label>
              Username:
              <input name="username" defaultValue={user.display_name} />
            </label>
            <label>
              Bio:
              <textarea name="bio" defaultValue={user.bio || ""}></textarea>
            </label>
            <label>
              Foto de perfil:
              <input type="file" name="profile_picture" />
            </label>
            <button type="submit">Salvar</button>
            <button type="button" onClick={() => setShowSettings(false)}>
              Cancelar
            </button>
          </form>

          <h3>Alterar Senha</h3>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              try {
                const response = await fetch(
                  "https://pedroantoniodev1.pythonanywhere.com/api/users/me/password/",
                  {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${localStorage.getItem("access")}`,
                    },
                    body: JSON.stringify({
                      old_password: formData.get("old_password"),
                      new_password: formData.get("new_password"),
                    }),
                  },
                );
                if (!response.ok) throw new Error("Erro ao alterar senha");
                alert("Senha alterada com sucesso!");
              } catch (err) {
                console.error(err);
              }
            }}
          >
            <label>
              Senha atual:
              <input type="password" name="old_password" />
            </label>
            <label>
              Nova senha:
              <input type="password" name="new_password" />
            </label>
            <button type="submit">Alterar Senha</button>
          </form>
        </S.Modal>
      )}
    </S.ProfileContainer>
  );
};

export default ProfilePage;
