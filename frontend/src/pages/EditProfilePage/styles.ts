import styled from "styled-components";

export const EditProfileContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;

  h2 {
    margin-top: 30px;
    margin-bottom: 15px;
    font-size: 22px;
    color: #333;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;

  input,
  textarea {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 16px;
  }

  button {
    padding: 10px;
    background: #429dfd;
    color: #fff;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
      background: #2f7ed8;
    }
  }
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-weight: 500;
  color: #444;
`;

export const Textarea = styled.textarea`
  resize: none;
`;
