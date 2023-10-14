function validation(values) {
  let errors = {};
  const email_pattern = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
  const password_pattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!values.email) {
    errors.email = 'Email is required';
  }
  if (!email_pattern.test(values.email)) {
    errors.email = 'Email is invalid';
  }
  if (!values.userName) {
    errors.userName = 'Username is required';
  }
  if (!values.password) {
    errors.password = 'Password is required';
  }
  if (!password_pattern.test(values.password)) {
    errors.password = 'Password is invalid';
  }
  if (
    !values.confirm_password ||
    String(values.confirm_password) !== String(values.password)
  ) {
    errors.confirm_password = 'Password did not match';
  }
  return errors;
}

export default validation;
