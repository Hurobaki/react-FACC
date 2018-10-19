import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

class InputFormComponent extends Component {
  componentDidMount() {
    const { setPredicate } = this.props;
    setPredicate && setPredicate();
  }

  /* componentDidUpdate(nextProps) {
    const { setPredicate } = this.props;

    if (
      (nextProps.name === "password" || nextProps.name === "passVerif") &&
      nextProps.value !== this.props.value
    ) {
      console.log("il faut set le predicat");
      setPredicate && setPredicate();
    }
  } */

  render() {
    const {
      classes,
      handleChange,
      value,
      name,
      type,
      labelTitle,
      error
    } = this.props;
    return (
      <TextField
        error={!!error}
        label={error ? error : labelTitle}
        type={type}
        defaultValue={value}
        className={classes.textField}
        margin="normal"
        name={name}
        onChange={handleChange}
      />
    );
  }
}

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
});

export const InputForm = withStyles(styles)(InputFormComponent);
