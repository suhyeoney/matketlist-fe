'use client'

export const isEmpty = (str: string) => {
  return str.length === 0;
};

export const checkSpaceIncluded = (str: string) => {
  return str.split('').reduce((cnt: number, current: string) => 
    cnt + (' ' === current ? 1 : 0), 0
  ) > 0 ? true : false;
};

export const checkFullHangeulOrEnglish = (str: string) => {
  let regex = /[가-힣a-zA-Z0-9]+$/;
  return str.length > 0 && !regex.test(str);
};