import styled from "styled-components";

export const PopupWrapper = styled.div`
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  width: 100vw;
  height: 100vh;
`;

export const Popup = styled.div`
  min-width: 316px;
  width: 60%;
  max-width: calc(840px - 200px);
  margin: auto;
  padding: 12px;
  border: 2px solid black;
  border-radius: 5px;
  background: white;
  box-sizing: border-box;
`;

export const Title = styled.h3`
  margin: 10px 0 50px;
  text-align: center;

  @media screen and (orientation: landscape) and (max-height: 500px),
    (max-width: 500px) {
    margin: 0 0 12px;
  }
`;

export const TaskArea = styled.textarea`
  width: 100%;
  height: 70px;
  padding: 12px;
  box-sizing: border-box;
  border-radius: 5px;
  resize: none;
  cursor: ${props => (props.readOnly ? "default" : "text")};
`;

export const Label = styled.label``;

export const Deadline = styled.input`
  display: block;
  width: 140px;
  margin-top: 6px;
`;

export const BottomBlocksWrapper = styled.div`
  display: flex;
  height: ${props => (props.view ? "160px" : "120px")};
`;

export const BottomBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: ${props => (props.right ? "unset" : "auto")};
  justify-content: ${props => (props.right ? "space-around" : "unset")};
  align-items: ${props => (props.right ? "center" : "unset")};
`;

export const Paragraph = styled.p``;
