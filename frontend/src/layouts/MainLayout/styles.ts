import styled from "styled-components";

export const MainLayoutContainer = styled.div`
  display: flex;
  max-width: 1200px;
  justify-content: center;
`;

export const SideBarContainer = styled.div`
  position: fixed;
  left: calc(50% - 550px);
  top: 40px;
  width: 250px;
  height: 100vh;
  border-right: 1px solid #ddd;
  padding: 20px;
`;

export const MainLayoutContent = styled.div`
  max-width: 50%;
  width: 100%;
  margin-left: 260px;
  padding: 20px;
`;
