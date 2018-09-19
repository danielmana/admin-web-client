import moment from 'moment';
import numeral from 'numeral';
import { map, get, isUndefined, isNull, isString, isObject, isArray, isNumber, isBoolean } from 'lodash';

export function formatNumber(value) {
  return value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0';
}

export function capitalizeFirstLetter(value) {
  if (!isString(value)) {
    return '';
  }
  const s = value.toLowerCase();
  return (s.charAt(0).toUpperCase() + s.slice(1)).replace(/-|_/g, ' ');
}

export function getSessionTimeout() {
  return moment().add(15, 'minutes');
}

export function toDate(value) {
  return value ? moment.utc(value).format('YYYY-MM-DD') : '';
}

export function toMoney(value) {
  return isUndefined(value) || isNull(value) ? '' : numeral(value).format('$0,0.00');
}

export function toString(value) {
  return value ? value.toString() : '';
}

export function getTrimmedString(value) {
  return value.substring(0, 3);
}

export function daysToShortName(value) {
  if (value.length < 1) {
    return '-';
  }
  return map(value, getTrimmedString).join(', ');
}

export function mapValues(array, value) {
  if (array.length < 0) {
    return '-';
  }
  return map(array, value).join(', ');
}

export function toCardCreatedDate(value) {
  return value ? moment(value).format('LLL') : '';
}

export function dateToMilliseconds(value) {
  if (!value) {
    return;
  }
  return moment(value).valueOf();
}

export function millisecondsToDate(value) {
  return new Date(value);
}

export function getItemValue(item, config) {
  // use callback if any
  if (config.callback) {
    return config.callback(item);
  }
  const id = get(config, 'id');
  let value = get(item, id);

  // date
  if (config.date || id === 'date') {
    return value ? toCardCreatedDate(value) : '-';
  }
  // currency
  if (config.currency) {
    return value ? numeral(value).format('$0,0.00') : 'n/a';
  }
  // amount
  if (id === 'amount') {
    return value ? toMoney(value) : '-';
  }
  // array
  if (isArray(value)) {
    return config.numeric ? value.length : mapValues(value, 'name');
  }
  // object
  if (isObject(value)) {
    return get(value, 'name', '-');
  }
  // boolean
  if (isBoolean(value)) {
    if (value.toString() != null) {
      return value.toString() === 'true' ? 'Yes' : 'No';
    }
    return 'n/a';
  }
  // number
  if (isNumber(value)) {
    value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    // prefix for IDs
    if (id === 'id') {
      value = `#${value}`;
    }
  }
  return value;
}
