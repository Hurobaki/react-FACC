import React, { Component } from "react";
import PropTypes from "prop-types";

const errorsDictionnary = {
  email: "Email can't be empty",
  username: "Must be at least 6 chars"
};

class FormFACCComponent extends Component {
  state = {
    fields: {},
    predicates: {},
    errors: {},
    formValid: false
  };

  handleChange = event => {
    const formField = { [event.target.name]: event.target.value };
    this.setState(prevState => ({
      fields: { ...prevState.fields, ...formField }
    }));
  };

  handleSubmit = event => {
    event.preventDefault();
    const { predicates } = this.state;
    this.setState({ errors: {} });

    const { errors, formValid } = Object.keys(predicates).reduce(
      (acc, curr) => {
        const error = !predicates[curr](this.state.fields[curr])
          ? { [curr]: errorsDictionnary[curr] }
          : {};
        return {
          errors: { ...acc.errors, ...error },
          formValid: !!(
            acc.formValid && predicates[curr](this.state.fields[curr])
          )
        };
      },
      { errors: {}, formValid: true }
    );

    this.setState({ errors, formValid });
  };

  addPredicate = (field, predicateFn) => () => {
    this.setState(prevState => ({
      predicates: { ...prevState.predicates, [field]: predicateFn }
    }));
  };

  render() {
    return this.props.children({
      handleChange: this.handleChange,
      handleSubmit: this.handleSubmit,
      addPredicate: this.addPredicate,
      ...this.state
    });
  }
}

export const FormFACC = FormFACCComponent;

FormFACCComponent.propTypes = {
  children: PropTypes.func.isRequired
};
