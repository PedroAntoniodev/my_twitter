import styled, { keyframes } from "styled-components";

export const Blink = keyframes`
    0% { opacity: 0.2; }
    20% { opacity: 1; }
    100% { opacity: 0.2; }
`;

export const Dot = styled.span`
  animation: ${Blink} 1.4s infinite both;
  font-size: 10px;
  margin: 0 2px;

  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  &:nth-child(3) {
    animation-delay: 0.3s;
  }
`;
