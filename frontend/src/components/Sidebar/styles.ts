import styled from "styled-components";

export const SidebarContainer = styled.div`
  h2 {
    margin-bottom: 20px;

    strong {
      color: #4a90e2;
    }
  }

  nav {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  a {
    text-decoration: none;
    color: #333;
    font-weight: bold;
  }
`;

export const SidebarContent = styled.div`
  display: flex;
  align-items: center;
`;
