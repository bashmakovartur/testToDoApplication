import styled from "styled-components";
import { TableHeader, TableCell } from "../TasksList/styled";

export const TaskRow = styled(TableHeader)`
  position: static;
  background: ${props =>
    props.completed ? "lightgreen" : props.actual ? "white" : "lightsalmon"};
  color: ${props =>
    props.completed || props.actual ? "rgba(0,0,0,1)" : "rgba(0,0,0,0.2)"};
  cursor: pointer;
`;

export const TaskCell = styled(TableCell)`
  text-align: ${props => (props.main ? "left" : "center")};
`;
