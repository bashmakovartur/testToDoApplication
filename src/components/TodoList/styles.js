import styled from "styled-components";

export const Page = styled.section`
  display: flex;
  font-family: sans-serif;
  min-width: 320px;
  width: 100%;
  height: 100vh;
  background: lightgray;
`;

export const Wrapper = styled.section`
  min-width: 316px;
  width: 80%;
  max-width: 840px;
  height: 80vh;
  margin: auto;
  border: 2px solid grey;
  border-radius: 5px;
  background: white;
  box-sizing: border-box;
  cursor: default;

  @media screen and (orientation: landscape) and (max-height: 500px) {
    height: 100%;
  }
`;

export const PopupBlock = styled.div`
  position: relative;
`;
