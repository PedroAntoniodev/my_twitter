import { useState } from "react";

import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

import * as S from "../../pages/AuthPage/styles";

interface LoginFormProps {
  onLogin: (username: string, password: string) => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <S.Form onSubmit={handleSubmit}>
      <div>
        <FaUser />
        <S.Input
          required
          type="text"
          placeholder="Nome de usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <RiLockPasswordFill />
        <S.Input
          required
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <S.ButtonSecondary type="submit">Entrar</S.ButtonSecondary>
    </S.Form>
  );
};

export default LoginForm;
