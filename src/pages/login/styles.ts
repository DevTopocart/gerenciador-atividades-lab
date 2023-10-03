import styled from "styled-components";

export const LogoTopocart = styled.img`
  align-self: flex-end;
`;

export const Version = styled.p`
  color: white;
  align-self: center;
  font-size: 8pt;
  margin: 0;
`;

export const Loader = styled.img`
  animation-name: spin;
  animation-duration: 500ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
