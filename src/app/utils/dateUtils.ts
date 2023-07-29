'use client'

import moment from 'moment';

export const getToday = () => {
  return moment().format('YYYY-MM-DD HH:mm');
};

export const getDiffBetweenTwoDays = (userRegisterDate: string) => { // 오늘 기준 하루(24H)이내이면 최신(NEW)로 간주
  const parsedUserRegisterDate = moment(userRegisterDate);
  const diff = moment().startOf('day').diff(parsedUserRegisterDate.startOf('day'), 'days');
  return diff < 1 ? '오늘 추가함' : diff === 1 ? '어제 추가함' : `${ diff }일 전에 추가함`;
};