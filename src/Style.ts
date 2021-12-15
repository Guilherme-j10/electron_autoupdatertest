import styled, { createGlobalStyle } from 'styled-components';

export const GlobaStyle = createGlobalStyle`
  *{
    margin: 0px;
    padding: 0px;
    outline: none;
    box-sizing: border-box;
    font-family: Arial;
    font-weight: normal;
  }
`;

export const ContainerMain = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  > h1 {
    font-weight: bold;
    margin-bottom: 10px;
  }

  > strong {
    font-weight: bold;
  }
`;