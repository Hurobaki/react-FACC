import React, { Component } from "react";
import { FormFACC } from "../components/FormFACC";
import { InputForm } from "../components/InputForm";
import Button from "@material-ui/core/Button";
import { addNamePredicate } from "../validators/FormPage.validators";
import { isEmail } from "../validators/validators";

class FormPageComponent extends Component {
  render() {
    return (
      <div>
        <div>Form page</div>
        <FormFACC>
          {({
            handleChange,
            handleSubmit,
            addPredicate,
            fields: { username, email },
            errors,
            formValid
          }) => (
            <form onSubmit={handleSubmit} style={{ display: "flex" }}>
              <InputForm
                type="text"
                name="username"
                value={username}
                labelTitle="Username :"
                error={errors.username}
                handleChange={handleChange}
                setPredicate={addPredicate("username", addNamePredicate)}
              />
              <InputForm
                type="email"
                name="email"
                value={email}
                labelTitle="Email :"
                error={errors.email}
                handleChange={handleChange}
                setPredicate={addPredicate("email", isEmail)}
              />
              <Button style={{ alignSelf: "flex-end" }} type="submit">
                Submit
              </Button>
              {formValid ? <p>Valid</p> : <p>Invalid</p>}
            </form>
          )}
        </FormFACC>
      </div>
    );
  }
}

export const FormPage = FormPageComponent;
