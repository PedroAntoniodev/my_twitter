import styled from "styled-components";

export const Post = styled.div`
  background: #f9f9f9;
  border-radius: 6px;
  padding: 12px;

  strong {
    color: #007bff;
    margin-right: 4px;
  }

  a {
    text-decoration: none;
  }

  p {
    margin: 8px 0;
  }

  span {
    font-size: 12px;
    color: #666;
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
`;

export const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
`;

export const Line = styled.hr`
  border: 0;
  height: 1px;
  opacity: 0.5;
  background-color: #007bff;
  width: 100%;
  margin: 8px 0;
`;
