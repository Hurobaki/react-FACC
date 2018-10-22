import React, { Component } from "react";
import { withForm } from "../enhancers/withForm";
import { InputForm } from "../components/InputForm";
import Button from "@material-ui/core/Button";
import {
  addNamePredicate,
  isEmail,
  isPasswordEqual
} from "../validators/FormPage.validators";

const formPredicates = fields => {
  return [
    {
      name: "samePassword",
      validator: isPasswordEqual
    }
  ];
};

class FormPageHOCComponent extends Component {
  render() {
    const {
      handleChange,
      handleSubmit,
      addPredicate,
      fields: { username, email, password, confirmPassword },
      errors,
      formValid
    } = this.props;
    return (
      <div>
        <div>Form page HOC</div>
        <form onSubmit={handleSubmit} style={{ display: "flex" }}>
          <InputForm
            type="text"
            name="username"
            value={username}
            labelTitle="Username"
            error={errors.username}
            handleChange={handleChange}
            setPredicate={addPredicate("username", addNamePredicate)}
          />
          <InputForm
            type="email"
            name="email"
            value={email}
            labelTitle="Email"
            error={errors.email}
            handleChange={handleChange}
            setPredicate={addPredicate("email", isEmail)}
          />
          <InputForm
            type="password"
            name="password"
            value={password}
            labelTitle="Password"
            handleChange={handleChange}
          />
          <InputForm
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            labelTitle="Re-Type"
            error={errors.samePassword}
            handleChange={handleChange}
          />
          <Button
            style={{ alignSelf: "flex-end" }}
            type="submit"
            color="primary"
            disabled={!formValid}
          >
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

export const FormPageHOC = withForm({
  isDynamic: true,
  formPredicates: formPredicates
})(FormPageHOCComponent);
