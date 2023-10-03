import styled from "styled-components";

export const FullPageLoader = styled.div`
  position: absolute;
  display: flex;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10000;
  align-items: center;
  justify-content: center;
`;

export const Loader = styled.img`
  height: 200px;
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