import styled from "styled-components";

export const ProfileContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;

  img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 1rem;
    border: 3px solid #4a90e2;
  }

  h2 {
    margin: 0.5rem 0;
    font-size: 1.5rem;
    color: #333;
  }

  p {
    color: #666;
    margin-bottom: 1rem;
  }

  button {
    background: #4a90e2;
    color: white;
    border: none;
    padding: 0.6rem 1.2rem;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    transition: background 0.3s;

    &:hover {
      background: #357ab8;
    }
  }
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;

  form {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    width: 400px;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    h3 {
      margin-bottom: 0.5rem;
      color: #333;
    }

    label {
      display: flex;
      flex-direction: column;
      text-align: left;
      font-weight: bold;
      color: #444;
    }

    input,
    textarea {
      margin-top: 0.3rem;
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 6px;
    }

    button {
      margin-top: 0.5rem;
      padding: 0.6rem;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: bold;
    }

    button[type="submit"] {
      background: #4a90e2;
      color: white;
    }

    button[type="button"] {
      background: #ccc;
      color: #333;
    }
  }
`;
