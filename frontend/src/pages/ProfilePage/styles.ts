import styled from "styled-components";

export const ProfileContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;

  img {
    width: 240px;
    height: 240px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 1rem;
    border: 3px solid #4a90e2;
  }

  h2 {
    margin: 0.5rem 0;
    font-size: 1.5rem;
    color: #4a90e2;
  }

  h3 {
    margin: 10px 0;
  }
`;

export const InfoContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  gap: 10px;
`;

export const FollowButton = styled.button`
  background-color: #4a90e2;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 0.5rem;

  &:hover {
    background-color: #007bff;
  }
`;

export const FollowersCount = styled.p`
  font-size: 18px;
  margin-bottom: 20px;
`;

export const FollowersInfo = styled.span`
  opacity: 0.5;
`;

export const Bio = styled.p`
  font-size: 16px;
  margin-top: 20px;
  border: 2px solid #4a90e2;
  padding: 10px;
  border-radius: 10px;
`;

export const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;

  h3 {
    text-align: center;
    color: #4a90e2;
  }
`;
