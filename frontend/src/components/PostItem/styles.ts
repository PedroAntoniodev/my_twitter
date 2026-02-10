import styled from "styled-components";

export const Post = styled.div`
  width: 100%;
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
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4a90e2;
  }
`;

export const Line = styled.hr`
  border: 0;
  height: 1px;
  opacity: 0.5;
  background-color: #007bff;
  width: 100%;
  margin: 8px 0;
`;

export const PostAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

export const PostAuthorContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 8px;
`;

export const UpdatePostContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: right;
`;

export const CommentAuthorContainer = styled.div`
  display: flex;
  font-size: 12px;
  align-items: center;
  margin-bottom: 4px;
`;

export const CommentAvatar = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 4px;
`;

export const EditPostContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const EditPostTextArea = styled.textarea`
  resize: none;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

export const EditCommentTextArea = styled.textarea`
  resize: none;
  margin-right: 8px;
  padding: 4px;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

export const EditCommentContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;
