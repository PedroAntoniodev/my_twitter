import { useState } from "react";

import RegisterForm from "../../components/RegisterForm";
import LoginForm from "../../components/LoginForm";
import { login, register } from "../../api/auth";

import * as S from "./styles";

const AuthPage = () => {
  /// true = register, false = login
  const [isRegister, setIsRegister] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
  ) => {
    if (password !== confirmPassword) {
      alert("As senhas devem ser iguais");
      return;
    }

    try {
      const data = await register(username, email, password);

      alert("Cadastro realizado com sucesso!");
      console.log("Resposta da API:", data);

      setIsRegister(false);
    } catch (error) {
      alert("Erro ao cadastrar, verifique os dados.");
      console.log(error);
    }
  };

  const handleLogin = async (username: string, password: string) => {
    setLoading(true);
    try {
      const data = await login(username, password);

      const { access, refresh } = data;

      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);

      window.location.href = "/home";
    } catch (error) {
      alert(
        "Erro ao fazer login, verifique suas credenciais e tente novamente.",
      );
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.RegisterPageContainer className={isRegister ? "register" : "login"}>
      <S.FirstContent className="Content">
        <S.FirstContentFirstColumn className="FirstContentFirstColumn">
          <S.TitlePrimary>Bom ver você de volta!</S.TitlePrimary>
          <S.DescriptionPrimary>
            Acesse a sua conta My Twitter
          </S.DescriptionPrimary>
          <S.ButtonPrimary type="button" onClick={() => setIsRegister(false)}>
            Entrar
          </S.ButtonPrimary>
        </S.FirstContentFirstColumn>
        <S.FirstContentSecondColumn className="FirstContentSecondColumn">
          <S.TitleSecondary>Cadastre-se</S.TitleSecondary>
          <S.DescriptionSecondary>
            Preencha o formulário abaixo para criar uma conta
          </S.DescriptionSecondary>
          <RegisterForm onRegister={handleRegister} loading={loading} />
        </S.FirstContentSecondColumn>
      </S.FirstContent>
      <S.SecondContent className="Content" style={{ position: "absolute" }}>
        <S.SecondContentFirstColumn className="SecondContentFirstColumn">
          <S.TitleSecondary>Acesse sua conta</S.TitleSecondary>
          <S.DescriptionSecondary>
            Coloque seus dados para entrar na sua conta
          </S.DescriptionSecondary>
          <LoginForm onLogin={handleLogin} loading={loading} />
        </S.SecondContentFirstColumn>
        <S.SecondContentSecondColumn className="SecondContentSecondColumn">
          <S.TitlePrimary>Olá, bem vindo!</S.TitlePrimary>
          <S.DescriptionPrimary>
            Ainda não possui uma conta?
          </S.DescriptionPrimary>
          <S.DescriptionPrimary>Crie uma conta My Twitter</S.DescriptionPrimary>
          <S.ButtonPrimary type="button" onClick={() => setIsRegister(true)}>
            Cadastre-se
          </S.ButtonPrimary>
        </S.SecondContentSecondColumn>
      </S.SecondContent>
    </S.RegisterPageContainer>
  );
};

export default AuthPage;
