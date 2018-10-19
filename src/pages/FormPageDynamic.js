import React, { Component } from "react";
import { FormFACC } from "../components/FormFACC";
import { InputForm } from "../components/InputForm";
import Button from "@material-ui/core/Button";
import { addNamePredicate, isEmail } from "../validators/FormPage.validators";

const formPredicates = fields => {
  return [
    {
      name: "samePassword",
      validator: ({ password, confirmPassword }) => password === confirmPassword
    }
  ];
};

class FormPageDynamicComponent extends Component {
  render() {
    return (
      <div>
        <div>Form page dynamic</div>
        <FormFACC isDynamic={true} formPredicates={formPredicates}>
          {({
            handleChange,
            handleSubmit,
            addPredicate,
            fields: { username, email, password, confirmPassword },
            errors,
            formValid
          }) => (
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
          )}
        </FormFACC>
      </div>
    );
  }
}

export const FormPageDynamic = FormPageDynamicComponent;
