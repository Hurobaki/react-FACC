import React, { Component } from "react";

class FormValidatorComponent extends Component {
  componentDidUpdate(prevProps, prevState) {
    const { formValid, formSubmitted } = this.props;
    formValid && formSubmitted && console.log("Traitement formulaire ...");
  }

  render() {
    return null;
  }
}

export const FormValidator = FormValidatorComponent;
