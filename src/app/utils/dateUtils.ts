import moment from 'moment-timezone'; 

export const getToday = (timezone: string) => {
  return moment().tz(timezone).format('YYYY.MM.DD HH:mm');
};

export const getDiffBetweenTwoDays = (userRegisterDate: string) => { // 오늘 기준 하루(24H)이내이면 최신(NEW)로 간주
  const parsedUserRegisterDate = moment(userRegisterDate);
  const diff = moment().startOf('day').diff(parsedUserRegisterDate.startOf('day'), 'days');
  return diff < 1 ? '오늘 추가했음' : diff === 1 ? '어제 추가했음' : `${ diff }일 전에 추가했음`;
};