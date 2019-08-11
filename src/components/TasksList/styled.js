import styled from "styled-components";

export const Table = styled.div``;

export const TableHeader = styled.div`
  display: flex;
  border-bottom: 1px solid lightgrey;
  background: skyblue;
`;

export const TableCell = styled.div`
  font-size: 16px;
  line-height: 29px;
  width: ${props => (props.main ? "60%" : "20%")};
  height: 30px;
  overflow: hidden;
  text-align: center;

  &:first-child {
    padding-left: 12px;
  }

  &:last-child {
    padding-right: 12px;
  }

  &:nth-child(2) {
    border-right: 1px solid lightgrey;
    border-left: 1px solid lightgrey;
  }

  @media screen and (max-width: 725px) {
    font-size: 2.2vw;
  }

  @media screen and (max-width: 420px) {
    font-size: 9px;
  }
`;

export const EmptyList = styled.div`
  font-size: 20px;
  width: 100%;
  padding-top: 50px;
  text-align: center;
`;

export const TableBody = styled.div``;
