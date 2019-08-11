import styled from "styled-components";

export const HeaderBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 12px;
  background: whitesmoke;
  border-bottom: 1px solid lightgrey;
`;

export const Title = styled.h1`
  width: 100%;
  font-size: 24px;
  text-decoration: underline;
  margin: 0;
`;

export const TasksInfo = styled.div`
  width: 50%;
  height: 130px;
  margin: 10px 0 0;
`;

export const ButtonsBlock = styled(TasksInfo)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Paragraph = styled.p`
  font-size: 16px;
  line-height: 22px;
  margin: 0;
`;
