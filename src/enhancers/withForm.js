import React, { Component } from "react";

export const withForm = ({ isDynamic, formPredicates }) => WrappedComponent => {
  class WithForm extends Component {
    state = {
      fields: {},
      predicates: {},
      customPredicates: {},
      errors: {},
      formValid: false
    };

    componentDidMount() {
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
          const error = !predicates[curr](fields[curr]) ? { [curr]: true } : {};
          return {
            errors: { ...acc.errors, ...error }
          };
        },
        { errors: {} }
      );

      errors = Object.keys(customPredicates).reduce(
        (acc, item) => {
          const error = !customPredicates[item]["validator"](fields)
            ? {
                [customPredicates[item]["name"]]: true
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
      await this.setState(prevState => ({
        fields: { ...prevState.fields, ...formField }
      }));
      isDynamic && this.validate();
    };

    handleSubmit = event => {
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
      return (
        <WrappedComponent
          {...this.props}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          addPredicate={this.addPredicate}
          {...this.state}
        />
      );
    }
  }
  return WithForm;
};
