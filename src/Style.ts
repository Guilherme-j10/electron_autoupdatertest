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
  background-color: #000;
  align-items: center;
  flex-direction: column;

  > h1, strong {
    color: #fff;
  }

  > h1 {
    font-weight: bold;
    margin-bottom: 10px;
  }

  > strong {
    font-weight: bold;
    display: flex;

    > p {
      margin-left: 10px;
    }
  }
`;

export const ContainerNotification = styled.div`
  width: 270px;
  position: fixed;
  background-color: #fff;
  bottom: 20px;
  left: 20px;
  padding: 20px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  > p {
    color: #444;
    margin-bottom: 10px;
    text-align: center;
  }

  > .OptionsButtons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;

    > button {
      background-color: #fff;
      color: #555;
      border-radius: 5px;
      border: solid 1px #ccc;
      padding: 10px 0px;
      width: 100px;
      cursor: pointer;
    }
  }
`;