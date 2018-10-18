export const isEmail = email =>
  email && /^(?:\w[._-]?)+@(?:\w)+\.(?:\w){2,4}$/.test(email);
