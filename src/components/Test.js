import React, { Component } from "react";

class TestComponent extends Component {
  state = {
    ok: "ok le test"
  };

  render() {
    return <div>{this.props.children("NAME")}</div>;
  }
}

export const Test = TestComponent;
