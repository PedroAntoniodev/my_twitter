import styled from "styled-components";

export const RegisterPageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const RegisterPageForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const FirstContent = styled.div`
  display: none;

  &.Content {
    background-color: #fff;
    border-radius: 15px;
    width: 1024px;
    height: 50%;
    align-items: center;
    justify-content: space-between;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      width: 40%;
      height: 100%;
      border-radius: 15px;
      background-color: #007bff;

      left: 0;
    }
  }
`;

export const SecondContent = styled(FirstContent)`
  display: flex;
  position: absolute;

  &.Content {
    &::before {
      left: 60%;
    }
  }
`;

export const TitlePrimary = styled.h2`
  color: #fff;
  font-size: 28px;
  font-weight: bold;
`;

export const TitleSecondary = styled(TitlePrimary)`
  color: #007bff;
`;

export const FirstColumn = styled.div`
  text-align: center;
  width: 40%;
  z-index: 10;
`;

export const SecondColumn = styled.div`
  text-align: center;
  width: 60%;
  z-index: 10;
`;

export const DescriptionPrimary = styled.p`
  font-size: 14px;
  font-weight: 300;
  color: #fff;
  line-height: 30px;
  margin-bottom: 10px;
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
  transition: background-color 0.4s ease-in-out, color 0.4s ease-in-out;

  &:hover {
    background-color: #fff;
    color: #007bff;
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
`;
