import styled from "styled-components";

export const HomePageContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
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

export const Post = styled.div`
  background: #f9f9f9;
  border-radius: 6px;
  padding: 12px;

  strong {
    color: #007bff;
  }

  p {
    margin: 8px 0;
  }

  span {
    font-size: 12px;
    color: #666;
  }
`;

export const Actions = styled.div`
  margin-top: 8px;

  button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 14px;
  }
`;

export const Comments = styled.div`
  margin-top: 12px;

  div {
    font-size: 12px;
    margin-bottom: 4px;
  }
`;

export const CommentForm = styled.form`
  display: flex;
  gap: 6px;
  margin-top: 6px;

  input {
    flex: 1;
    padding: 6px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }

  button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
  }
`;
