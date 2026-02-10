import { useState } from "react";

import { updateProfile } from "../../api/profile";
import { changePassword } from "../../api/users";

import * as S from "./styles";

const EditProfilePage = () => {
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(displayName, bio, avatar || undefined);
      setDisplayName("");
      setBio("");
      setAvatar(null);
      alert("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar perfil");
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("As senhas não coincidem");
      return;
    }

    try {
      await changePassword(oldPassword, newPassword);

      alert("Senha alterada com sucesso!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error(error);
      alert("Erro ao trocar senha");
    }
  };

  return (
    <S.EditProfileContainer>
      <h2>Editar Perfil</h2>
      <S.Form onSubmit={handleUpdateProfile}>
        <S.Label>
          Nome de exibição:
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </S.Label>
        <S.Label>
          Bio:
          <S.Textarea value={bio} onChange={(e) => setBio(e.target.value)} />
        </S.Label>
        <S.Label>
          Foto de perfil:
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files?.[0] || null)}
          />
        </S.Label>
        <button type="submit">Salvar alterações</button>
      </S.Form>

      <h2>Trocar Senha</h2>
      <S.Form onSubmit={handleChangePassword}>
        <S.Label>
          Senha atual:
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </S.Label>
        <S.Label>
          Nova senha:
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </S.Label>
        <S.Label>
          Confirmar nova senha:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </S.Label>
        <button type="submit">Alterar senha</button>
      </S.Form>
    </S.EditProfileContainer>
  );
};

export default EditProfilePage;
