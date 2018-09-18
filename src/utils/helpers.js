import moment from 'moment';
import numeral from 'numeral';
import { map, isUndefined, isNull, isString } from 'lodash';


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
