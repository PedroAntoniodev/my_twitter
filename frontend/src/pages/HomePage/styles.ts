import styled from "styled-components";

export const HomePageContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;

  a {
    text-decoration: none;
  }
`;

export const NewPostForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  textarea {
    resize: none;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 6px;
    border: 1px solid #ccc;
  }

  button {
    align-self: flex-end;
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
  }
`;

export const Feed = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
