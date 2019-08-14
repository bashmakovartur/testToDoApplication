import React from "react";
import Header from "../Header";
import TasksList from "../TasksList";

import "../../normalize.css";
import { Page, Wrapper, PopupBlock } from "./styles";

const ToDoList = () => {
  return (
    <Page>
      <Wrapper>
        <Header />
        <TasksList />
      </Wrapper>
      <PopupBlock id="popup" />
    </Page>
  );
};

export default ToDoList;
