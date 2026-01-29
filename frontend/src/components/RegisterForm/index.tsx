import { useState } from "react";

import Loader from "../Loader";

import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

import * as S from "../../pages/AuthPage/styles";

interface RegisterFormProps {
  onRegister: (
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
  ) => void;
  loading: boolean;
}

const RegisterForm = ({ onRegister, loading }: RegisterFormProps) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister(username, email, password, confirmPassword);
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
        <MdEmail />
        <S.Input
          required
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
      <div>
        <RiLockPasswordFill />
        <S.Input
          required
          type="password"
          placeholder="Confirmar senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <S.ButtonSecondary type="submit" disabled={loading}>
        {loading ? <Loader /> : "Cadastre-se"}
      </S.ButtonSecondary>
    </S.Form>
  );
};

export default RegisterForm;
