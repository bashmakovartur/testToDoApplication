import styled from "styled-components";

const stylesByLocation = {
  header: {
    width: "130px",
    height: "35px",
    "align-self": "center"
  },
  popup: {
    width: "120px",
    height: "30px",
    background: "lightgrey"
  },
  table: {
    display: "block",
    width: "170px",
    height: "50px",
    margin: " 30px auto",
    background: "lightgrey"
  }
};

export const Btn = styled.button(props =>
  Object.assign({}, stylesByLocation[props.location], {
    cursor: "pointer",
    "border-radius": "5px",
    "pointer-events": `${props.active ? "unset" : "none"}`,
    opacity: `${props.active ? "1" : "0.4"}`,
    border: "1px solid dimgrey"
  })
);
