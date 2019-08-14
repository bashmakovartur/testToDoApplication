import styled from "styled-components";

const stylesByLocation = {
  header: {
    width: "130px",
    height: "35px",
    "align-self": "center",
    border: "1px solid dimgrey"
  },
  popup: {
    width: "120px",
    height: "30px",
    background: "lightgrey",
    border: "1px solid dimgrey"
  },
  table: {
    display: "block",
    width: "170px",
    height: "50px",
    margin: " 30px auto",
    background: "lightgrey",
    border: "1px solid dimgrey"
  }
};

export const Btn = styled.button(props =>
  Object.assign({}, stylesByLocation[props.location], {
    cursor: "pointer",
    "border-radius": "5px",
    "pointer-events": `${props.active ? "unset" : "none"}`,
    opacity: `${props.active ? "1" : "0.4"}`
  })
);
