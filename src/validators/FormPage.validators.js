export const addNamePredicate = value => value && /(?:\w){6,}/.test(value);

export const isEmail = email =>
  email && /^(?:\w[._-]?)+@(?:\w)+\.(?:\w){2,4}$/.test(email);

export const isPasswordEqual = ({ password, confirmPassword }) =>
  password && /^(\w){6,}$/.test(password) && password === confirmPassword;
