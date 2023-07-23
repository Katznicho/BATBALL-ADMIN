import moment from "moment";

//helper types
export type _String = string;
export type _Mixed = string | null;
export type _Number = number;
export type _Boolean = boolean;
export type __Mixed = string | boolean;
export type _Any = any;

// export const delay = (ms: _Number): _Any => new Promise((res) => setTimeout(res, ms));

//check empty filds
export const EmptyError = (data: _String, name: _String): _Mixed => {
  if (data === '' || data === null) {
    return `${name} cannot be empty`;
  }
  return null;
};
//empty to disable buttons
export const EmptyFieldError = (field: _String): boolean =>
  field === '' || field === null ? true : false;
//empty to disable buttons

export const lengthError = (
  data: _String,
  desiredLength: _Number,
  field: _String,
): _Mixed => {
  if (data && data.length < desiredLength) {
    return `${field} must be ${desiredLength} characters and above`;
  }
  return null;
};

export const lengthChecker = (
  data: _String,
  desiredLength: _Number,
): boolean => {
  if (data && data.length < desiredLength) {
    return true;
  }
  return false;
};

//   /[^a-zA-Z]/.test(data) === true
export const passwordRegx: _Any = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;
export const passwordError = (data: _String): _Mixed => {
  if (data && data.length < 6) {
    return 'atleast 6 character needed';
  }

  return null;
};

export const passwordRegxChecker = (data: _String): _Mixed => {
  if (data && !passwordRegx.test(data)) {
    return 'password must be atleast 6 characters and contain atleast one number, one uppercase and one lowercase letter';
  }
  return null;
};

export const confirmPasswordError = (
  password: _String,
  confirmPassword: _String,
): boolean => {
  if (confirmPassword && confirmPassword !== password) {
    // return 'The passwords do not match';
    return true;
  } else {
    return false;
  }
};

export const numberError = (data: any): boolean => {
  if (data && /^[\s()+-]*([0-9][\s()+-]*){9,10}$/.test(data) !== true) {
    //return 'Please enter a valid phone number with 10 digits and please use only numbers';
    return true;
  } else {
    return false;
  }
};

export const emailRegex: _Any =
  /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;

export const emailChecker = (data: _String): boolean => {
  if (data && emailRegex.test(data) !== true) {
    return true;
  } else {
    return false;
  }
};

export const emailMessage = (data: _String): _Mixed => {
  if (data && emailRegex.test(data) !== true) {
    return 'Please enter valid email address.';
  }
  return null;
};

export const formatPhoneNumber = (number: any) => {
  let num = '+256';
  //remove a 0 from the beginning of the number and append a +256
  if (number.charAt(0) === '0') {
    num += number.substring(1);
  }
  return num;
};

export function getErrorMessage(errors: {}, fieldName: string) {
  if (errors.hasOwnProperty(fieldName)) {
    return errors[fieldName][0];
  } else {
    return '';
  }
}



export function formatTime(timeStr:string) {
  const timeObj = moment(`1970-01-01T${timeStr}Z`);
  const formattedTime = timeObj.format('hh:mm A').replace(/^(\d{1}):/, '0$1:');
  return formattedTime;
}

export function formatDate(dateStr:string) {
  const dateObj = moment(dateStr);
  const formattedDate = dateObj.format('DD MMM YYYY');
  return formattedDate;
}