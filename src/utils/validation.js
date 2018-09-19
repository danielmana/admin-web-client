const isEmpty = (value) => value === undefined || value === null || value === '';
const join = (rules) => (value, data) => rules.map((rule) => rule(value, data)).filter((error) => !!error)[0];

export function required(value) {
  if (isEmpty(value)) {
    return 'Required';
  }
  return false;
}

export function email(value) {
  if (!isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'Invalid email address';
  }
  return false;
}

export function maxLength(max) {
  return (value) => {
    if (!isEmpty(value) && value.length > max) {
      return `Must be ${max} characters or less`;
    }
    return false;
  };
}

export function minLength(min) {
  return (value) => {
    if (!isEmpty(value) && value.length < min) {
      return `Must be minimum ${min} characters`;
    }
    return false;
  };
}

export function password(oldPassword) {
  return (value) => {
    if (isEmpty(value)) return 'Password required';
    if (value === oldPassword) return 'New password must be different than the old one!';
    if (value.length < 8) return 'Password too short!';
    if (!/[\d\W_]/i.test(value)) return 'Password must contain at least one number or symbol!';
    if (!/[A-Z]/.test(value)) return 'Password must contain at least one uppercase leter!';
    if (!/[a-z]/.test(value)) return 'Password must contain at least one lowercase leter!';
    return false;
  };
}

export function match(s) {
  return (value) => {
    if (value !== s) {
      return "Passwords don't match";
    }
    return false;
  };
}

export function phoneNumber(value) {
  const phone = /^(\+[0-9]{1,2} )?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if (!value.match(phone)) {
    return 'Not a valid US phone number.';
  }
  return false;
}

export function zipCode(value) {
  const code = /(^\d{5}$)|(^\d{9}$)/;
  if (!value.match(code)) {
    return 'Not a valid ZIP code.';
  }
  return false;
}

export function createValidator(rules) {
  return (immutableObj) => {
    const data = immutableObj.toJS();
    const errors = {};
    Object.keys(rules).forEach((key) => {
      const rule = join([].concat(rules[key]));
      const error = rule(data[key], data);
      if (error) {
        errors[key] = error;
      }
    });
    return errors;
  };
}
