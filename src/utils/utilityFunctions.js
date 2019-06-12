export const emailValidation = (email) => {
  const emailRegExPattern = '[a-zA-Z0-9_\\.\\+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-\\.]+';
  const validator = new RegExp(emailRegExPattern);
  return validator.test(String(email).toLowerCase());
}