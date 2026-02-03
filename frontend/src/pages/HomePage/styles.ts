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

export const SearchForm = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  input {
    flex: 1;
    padding: 8px;
    border-radius: 6px;
    border: 1px solid #ccc;
  }

  button {
    margin-left: 10px;
    background-color: #007bff;
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #429dfd;
    }
  }
`;

export const Feed = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Tabs = styled.div`
  display: flex;
  justify-content: center;
`;

export const FeedButton = styled.button`
  color: #429dfd;
  font-size: 20px;
  font-weight: bold;
  border: none;
  padding-bottom: 5px;
  background: none;
  text-transform: uppercase;
  margin: 10px 10px;
  border-bottom: 2px solid transparent;
  transition: border-bottom 0.3s ease;
  cursor: pointer;

  &.active {
    border-bottom: 2px solid #429dfd;
  }
`;
