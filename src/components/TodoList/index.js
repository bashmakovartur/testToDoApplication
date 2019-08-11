import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../Header";
import TasksList from "../TasksList";

import "../../normalize.css";
import { Page, Wrapper, PopupBlock } from "./styles";

class ToDoList extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Page>
        <Wrapper>
          <Header />
          <TasksList />
        </Wrapper>
        <PopupBlock id="popup" />
      </Page>
    );
  }
}

const mapStateToProps = store => {
  console.log(store);
  return {};
};

export default connect(mapStateToProps)(ToDoList);
