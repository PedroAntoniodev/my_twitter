import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

import * as S from "./styles";

const RegisterPage = () => {
  return (
    <S.RegisterPageContainer>
      <S.FirstContent className="Content">
        <S.FirstColumn>
          <S.TitlePrimary>Bom ver você de volta!</S.TitlePrimary>
          <S.DescriptionPrimary>
            Acesse a sua conta My Twitter
          </S.DescriptionPrimary>
          <S.ButtonPrimary>Entrar</S.ButtonPrimary>
        </S.FirstColumn>
        <S.SecondColumn>
          <S.TitleSecondary>Cadastre-se</S.TitleSecondary>
          <S.DescriptionSecondary>
            Preencha o formulário abaixo para criar uma conta
          </S.DescriptionSecondary>
          <S.Form>
            <label>
              <FaUser />
              <S.Input required type="text" placeholder="Nome de usuário" />
            </label>
            <label>
              <MdEmail />
              <S.Input required type="email" placeholder="E-mail" />
            </label>
            <label>
              <RiLockPasswordFill />
              <S.Input required type="password" placeholder="Senha" />
            </label>
            <label>
              <RiLockPasswordFill />
              <S.Input required type="password" placeholder="Confirmar senha" />
            </label>
            <S.ButtonSecondary type="submit">Cadastrar</S.ButtonSecondary>
          </S.Form>
        </S.SecondColumn>
      </S.FirstContent>
      <S.SecondContent className="Content">
        <S.FirstColumn style={{ width: "60%" }}>
          <S.TitleSecondary>Acesse sua conta</S.TitleSecondary>
          <S.DescriptionSecondary>
            Coloque seus dados para entrar na sua conta
          </S.DescriptionSecondary>
          <S.Form>
            <label>
              <FaUser />
              <S.Input required type="text" placeholder="Nome de usuário" />
            </label>
            <label>
              <RiLockPasswordFill />
              <S.Input required type="password" placeholder="Senha" />
            </label>
            <S.ButtonSecondary type="submit">Entrar</S.ButtonSecondary>
          </S.Form>
        </S.FirstColumn>
        <S.SecondColumn style={{ width: "40%" }}>
          <S.TitlePrimary>Olá, bem vindo!</S.TitlePrimary>
          <S.DescriptionPrimary>
            Ainda não possui uma conta?
          </S.DescriptionPrimary>
          <S.DescriptionPrimary>Crie uma conta My Twitter</S.DescriptionPrimary>
          <S.ButtonPrimary>Cadastre-se</S.ButtonPrimary>
        </S.SecondColumn>
      </S.SecondContent>
    </S.RegisterPageContainer>
  );
};

export default RegisterPage;
