import { isNull } from 'lodash';
import moment from 'moment';

export const required = (value: any) => (value || !isNaN(Number(value)) ? undefined : 'Required');

export const notEmpty = (value: any) =>
  value && !/\S/.test(value) ? 'Cannot be whitespace only' : undefined;

export const maxLength = (max: any) => (value: any) =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;

export const maxLength15 = maxLength(15);

export const minLength = (min: any) => (value: any) =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;

export const minLength2 = minLength(2);

// eslint-disable-next-line no-restricted-globals
export const number = (value: any) => (isNaN(Number(value)) ? 'Must be a number' : undefined);

export const minValue = (min: any) => (value: any) =>
  !isNull(min) && value < min ? `Deve ser pelo menos ${min}` : undefined;

export const minValueWithZero = (min: any) => (value: any) =>
  !value || value < min ? `Deve ser pelo menos ${min}` : undefined;

export const maxValue = (max: any) => (value: any) =>
  value && value > max ? `Deve ser menos que ${max}` : undefined;

export const minValueZero = minValue(0);

export const minValueOne = minValue(1);

export const email = (value: any) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined;

export const phoneNumber = (value: any) =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? 'Invalid phone number, must be 10 digits'
    : undefined;

export const regexPhoneNumber = (value: any) =>
  value && !/^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$/i.test(value)
    ? 'Invalid phone number, format (555) 555-5555'
    : undefined;

export const cityStateCountry = (value: any) =>
  value && !/^[A-Za-zÀ-ÿ .-]{2,},[A-Za-zÀ-ÿ .-]{2,},[ ]?[A-Za-z]{2}$/.test(value)
    ? 'Invalid format: Manhattan, New York, US'
    : undefined;

export const minLength1 = (value: any) => (value && value?.length < 1 ? 'Required' : undefined);

export const dateMatchesYear = (allowedYear: any) => (date: any) => {
  const momentDate = moment(date);

  return momentDate.isValid() && Number(momentDate.format('YYYY')) !== Number(allowedYear)
    ? `Date has to be in the year ${allowedYear}`
    : undefined;
};

export const startDatetimeIsBeforeEndDatetime =
  (endDate: any, endTime: any, startTime: any) => (startDate: any) => {
    const startTimeObject = moment(startTime, true);
    const endTimeObject = moment(endTime, true);

    if (startTimeObject.isValid() && endTimeObject.isValid() && startDate && endDate) {
      const startDateObject = moment(startDate, true);
      const endDateObject = moment(endDate, true);

      if (startDateObject.isValid() && endDateObject.isValid()) {
        const startDateTimeObject = moment(
          `${startDateObject.format('YYYY-MM-DD')} ${startTimeObject.format('HH:ii:ss')}`,
          'YYYY-MM-DD HH:ii:ss',
          true,
        );
        const endDateTimeObject = moment(
          `${endDateObject.format('YYYY-MM-DD')} ${endTimeObject.format('HH:ii:ss')}`,
          'YYYY-MM-DD HH:ii:ss',
          true,
        );

        return endDateTimeObject.isBefore(startDateTimeObject)
          ? 'Start has to be before end'
          : undefined;
      }
    }

    return undefined;
  };

// (?i)^[a-z0-9][a-z0-9\- ]{0,10}[a-z0-9]$

export const zipCode = (value: any) =>
  !/^[A-Z0-9\- ]{0,10}[A-Z0-9]$/.test(value) ? 'Invalid zip code: 10001 or V0N 0A0' : undefined;

export default {
  required,
  email,
  number,
  dateMatchesYear,
};
