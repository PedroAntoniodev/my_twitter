import { useState } from "react";

import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

import * as S from "./styles";

const RegisterPage = () => {
  /// true = register, false = login
  const [isRegister, setIsRegister] = useState(true);

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
          <S.Form>
            <div>
              <FaUser />
              <S.Input required type="text" placeholder="Nome de usuário" />
            </div>
            <div>
              <MdEmail />
              <S.Input required type="email" placeholder="E-mail" />
            </div>
            <div>
              <RiLockPasswordFill />
              <S.Input required type="password" placeholder="Senha" />
            </div>
            <div>
              <RiLockPasswordFill />
              <S.Input required type="password" placeholder="Confirmar senha" />
            </div>
            <S.ButtonSecondary type="submit">Cadastrar</S.ButtonSecondary>
          </S.Form>
        </S.FirstContentSecondColumn>
      </S.FirstContent>
      <S.SecondContent className="Content" style={{ position: "absolute" }}>
        <S.SecondContentFirstColumn className="SecondContentFirstColumn">
          <S.TitleSecondary>Acesse sua conta</S.TitleSecondary>
          <S.DescriptionSecondary>
            Coloque seus dados para entrar na sua conta
          </S.DescriptionSecondary>
          <S.Form>
            <div>
              <FaUser />
              <S.Input required type="text" placeholder="Nome de usuário" />
            </div>
            <div>
              <RiLockPasswordFill />
              <S.Input required type="password" placeholder="Senha" />
            </div>
            <S.ButtonSecondary type="submit">Entrar</S.ButtonSecondary>
          </S.Form>
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

export default RegisterPage;
