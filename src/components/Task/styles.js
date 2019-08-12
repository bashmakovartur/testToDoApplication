import styled from "styled-components";
import { TableHeader, TableCell } from "../TasksList/styled";

const getStylesWithProps = (props, style) => {};

export const TaskRow = styled(TableHeader)`
  position: static;
  background: ${props =>
    props.actual && props.completed
      ? "lightgreen"
      : !props.actual
      ? "lightsalmon"
      : "white"};
  opacity: ${props => (props.completed || !props.actual ? "0.6" : "1")};
  cursor: pointer;
`;

export const TaskCell = styled(TableCell)`
  text-align: ${props => (props.main ? "left" : "center")};
`;
