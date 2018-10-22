import React, { Component } from "react";
import PropTypes from "prop-types";

const sampleFormError = {
  email: "Email can't be empty",
  username: "Must be at least 6 chars",
  samePassword: "Passwords must be equal"
};

class FormFACCComponent extends Component {
  state = {
    fields: {},
    predicates: {},
    customPredicates: {},
    errors: {},
    formValid: false
  };

  componentDidMount() {
    const { formPredicates } = this.props;
    const { fields } = this.state;
    this.setState(prevState => ({
      customPredicates: {
        ...prevState.customPredicates,
        ...formPredicates(fields)
      }
    }));
  }

  validate = () => {
    const { predicates, fields, customPredicates } = this.state;
    this.setState({ errors: {} });

    let { errors } = Object.keys(predicates).reduce(
      (acc, curr) => {
        const error = !predicates[curr](fields[curr])
          ? { [curr]: sampleFormError[curr] }
          : {};
        return {
          errors: { ...acc.errors, ...error },
          formValid: !!(acc.formValid && predicates[curr](fields[curr]))
        };
      },
      { errors: {} }
    );

    errors = Object.keys(customPredicates).reduce(
      (acc, item) => {
        const error = !customPredicates[item]["validator"](fields)
          ? {
              [customPredicates[item]["name"]]:
                sampleFormError[customPredicates[item]["name"]]
            }
          : {};
        return { ...acc.errors, ...error };
      },
      { errors: { ...errors } }
    );

    this.setState({ errors, formValid: !Object.keys(errors).length });
  };

  handleChange = async event => {
    const formField = { [event.target.name]: event.target.value };
    const { isDynamic } = this.props;
    await this.setState(prevState => ({
      fields: { ...prevState.fields, ...formField }
    }));
    isDynamic && this.validate();
  };

  handleSubmit = event => {
    const { isDynamic } = this.props;
    event.preventDefault();
    !isDynamic && this.validate();
  };

  addPredicate = (field, predicateFn) => () => {
    this.setState(prevState => ({
      predicates: {
        ...prevState.predicates,
        [field]: predicateFn
      }
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
