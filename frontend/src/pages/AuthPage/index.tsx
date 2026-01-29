import { useState } from "react";

import * as S from "./styles";
import RegisterForm from "../../components/RegisterForm";
import LoginForm from "../../components/LoginForm";

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
      const response = await fetch(
        "https://pedroantoniodev1.pythonanywhere.com/api/auth/register/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.username) {
          alert("Esse usuário já existe!");
        } else if (errorData.email) {
          alert("Esse email já existe!");
        } else {
          alert("Erro ao registrar usuário, verifique os dados.");
        }
        return;
      }

      const data = await response.json();
      alert("Cadastro realizado com sucesso!");
      console.log("Resposta da API:", data);

      setIsRegister(false);
    } catch {
      alert("Erro ao registrar usuário, verifique os dados.");
    }
  };

  const handleLogin = async (username: string, password: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://pedroantoniodev1.pythonanywhere.com/api/auth/login/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        alert(
          "Erro ao fazer login, verifique os dados." +
            JSON.stringify(errorData),
        );
        return;
      }

      const data = await response.json();
      const { access, refresh } = data;

      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);

      window.location.href = "/home";
    } catch (error) {
      alert("Erro na conexão com o servidor.");
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
