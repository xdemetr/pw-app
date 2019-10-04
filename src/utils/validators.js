const required = value => {
  if (value) return undefined;
  return 'Field required';
};

const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;

const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
      'Invalid email address' : undefined;

const minValue = min => value =>
    value && value.length < min ? `Must be at least ${min}` : undefined;

export {
  required,
  number,
  email,
  minValue
}
