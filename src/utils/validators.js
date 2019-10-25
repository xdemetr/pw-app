const required = value => {
  if (value) return undefined;
  return 'Field required';
};

const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;
const positiveNumber = value => value && (isNaN(Number(value)) || Number(value) <= 0) ? 'Must be a positive number' : undefined;

const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
      'Invalid email address' : undefined;

const strongPassword = value => value && !/^.*((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/i.test(value) ?
    'Password should be strong (uppercase letters, digits, special symbols)' : undefined;

const minValue = min => value =>
    value && value.length < min ? `Must be at least ${min} symbols` : undefined;

export {
  required,
  number,
  positiveNumber,
  email,
  minValue,
  strongPassword
}
