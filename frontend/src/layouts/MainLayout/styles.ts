import styled from "styled-components";

export const MainLayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
`;

export const SideBarContainer = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  width: 220px;
  height: 100vh;
  background-color: #fff;
  box-shadow: 0 0 10px #ddd;
  padding: 20px;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const MainLayoutContent = styled.div`
  flex: 1;
  margin-left: 220px;

  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;
    padding-bottom: 60px;
    box-sizing: border-box;
  }
`;

export const BottomBar = styled.nav`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background-color: #fff;
    border-top: 1px solid #ddd;
    justify-content: space-around;
    align-items: center;
    z-index: 1000;
  }

  a {
    text-decoration: none;
    font-size: 24px;
  }

  button {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
  }
`;
