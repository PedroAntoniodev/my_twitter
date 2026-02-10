import styled from "styled-components";

export const RegisterPageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 20px;
    padding: 20px;
  }

  .FirstContentFirstColumn,
  .FirstContentSecondColumn,
  .SecondContentFirstColumn,
  .SecondContentSecondColumn {
    transition:
      opacity 0.6s ease,
      transform 0.6s ease;
  }

  &.register .FirstContentFirstColumn,
  &.register .FirstContentSecondColumn {
    z-index: 11;
  }

  &.register .SecondContentFirstColumn,
  &.register .SecondContentSecondColumn {
    z-index: -1;
    opacity: 0;
    transform: translateY(20px);
  }

  &.register .Content::before {
    transform: translateX(0);
    opacity: 1;
    transition: transform 1.2s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  }

  &.login .FirstContentFirstColumn,
  &.login .FirstContentSecondColumn {
    z-index: -1;
    opacity: 0;
    transform: translateY(20px);
  }

  &.login .SecondContentFirstColumn,
  &.login .SecondContentSecondColumn {
    z-index: 11;
  }

  &.login .Content::before {
    transform: translateX(150%);
    opacity: 0.8;
    transition: transform 1.2s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  }

  @media (max-width: 1024px) {
    &.register .FirstContentFirstColumn {
      margin-bottom: 40px;
    }

    &.register .Content::before {
      top: 0;
      left: 0;
      width: 100%;
      height: 40%;
      border-radius: 0;
      transform: translateY(0);
    }

    &.login .Content::before {
      top: 0;
      left: 0;
      width: 100%;
      height: 50%;
      border-radius: 0;
      transform: translateY(100%);
    }
  }
`;

export const RegisterPageForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const FirstContent = styled.div`
  display: flex;

  @media (max-width: 1024px) {
    flex-direction: column;
    justify-content: space-around;
  }

  &.Content {
    background-color: #fff;
    border-radius: 15px;
    width: 1024px;
    height: 50%;
    align-items: center;
    justify-content: space-between;
    position: relative;

    @media (max-width: 1024px) {
      width: 100%;
      height: 100%;
    }

    &::before {
      content: "";
      position: absolute;
      width: 40%;
      height: 100%;
      border-radius: 15px;
      background-color: #007bff;
      transition: left 0.6s ease-in-out;

      left: 0;

      @media (max-width: 1024px) {
        width: 100%;
        height: 100%;
        top: 0;
        border-radius: 0;
      }
    }
  }
`;

export const SecondContent = styled(FirstContent)``;

export const TitlePrimary = styled.h2`
  color: #fff;
  font-size: 28px;
  font-weight: bold;

  @media (max-width: 1024px) {
    font-size: 22px;
  }
`;

export const TitleSecondary = styled(TitlePrimary)`
  color: #007bff;
`;

export const FirstContentFirstColumn = styled.div`
  text-align: center;
  width: 40%;
  z-index: 11;
`;

export const FirstContentSecondColumn = styled.div`
  text-align: center;
  width: 60%;
  z-index: 11;

  @media (max-width: 1024px) {
    margin-top: 50px;
  }
`;

export const SecondContentFirstColumn = styled.div`
  text-align: center;
  width: 60%;
  z-index: -1;

  @media (max-width: 1024px) {
    margin-top: 50px;
  }
`;

export const SecondContentSecondColumn = styled.div`
  text-align: center;
  width: 40%;
  z-index: -1;

  @media (max-width: 1024px) {
    margin-bottom: 80px;
  }
`;

export const DescriptionPrimary = styled.p`
  font-size: 14px;
  font-weight: 300;
  color: #fff;
  line-height: 30px;
  margin-bottom: 10px;

  @media (max-width: 1024px) {
    font-size: 12px;
    line-height: 24px;
  }
`;

export const DescriptionSecondary = styled(DescriptionPrimary)`
  color: #007bff;
`;

export const ButtonPrimary = styled.button`
  border-radius: 15px;
  text-transform: uppercase;
  color: #fff;
  font-size: 10px;
  font-weight: bold;
  padding: 10px 50px;
  background-color: transparent;
  border: 2px solid #fff;
  cursor: pointer;
  transition:
    background-color 0.4s ease-in-out,
    color 0.4s ease-in-out;

  &:hover {
    background-color: #fff;
    color: #007bff;
  }

  @media (max-width: 1024px) {
    font-size: 8px;
    padding: 8px 30px;
  }
`;

export const ButtonSecondary = styled(ButtonPrimary)`
  background-color: #007bff;
  border: 2px solid #007bff;

  &:hover {
    background-color: #fff;
    color: #007bff;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Input = styled.input`
  height: 45px;
  background-color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 8px;

  @media (max-width: 1024px) {
    height: 35px;
    font-size: 12px;
  }
`;
