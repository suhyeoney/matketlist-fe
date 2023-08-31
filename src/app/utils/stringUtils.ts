import { data } from '@utils/dataForRegion/data';

interface RegionType {
  key: string,
  name: string | string[],
};

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

export const checkHangeulTextEndsWithJongseong = (str: string) => {
  return (str.charCodeAt(str.length - 1) - '가'.charCodeAt(0)) % 28 === 0;
};

export const convertWithRegionCode = (address: string, compoundCode: string) => {
  const arrAddress = address.split(' ');
  const upperCityName = arrAddress[0];
  const remains = arrAddress.filter((e: string, idx: number) => idx > 0);
  let val = { key: '', name: '' };
  if(compoundCode !== undefined && (compoundCode.includes('특별시') || compoundCode.includes('광역시'))) {
    let found = data.find(e => e.name.includes(compoundCode.split(' ')[1].substring(0, 2)));
    if(found !== undefined) {
      if(typeof found?.name === 'string') {
        return { 
          key: found.key,
          name: found.name,
        };
      } else {
        return { 
          key: found.key,
          name: found.name[1]
        };
      }
    }
  }
  if(address.includes('Seoul')) {
    return { key: 'RC001', name: '서울' };
  }
  data.forEach((region: RegionType) => {
    if(region !== undefined) {
      switch(typeof region.name) {
        case 'string':
          if(upperCityName.includes(region?.name) || remains.includes(region?.name)) {
            val.key = region.key;
            val.name = region.name;
          }
          break;
        case 'object':
          if(region.name.find((e: string) => e === upperCityName)) {
            val.key = region.key;
            val.name = region.name[1];
          } else {
            region.name.forEach((e: string) => {
              remains.find((x: string) => {
                if(e === x) {
                  val.key = region.key;
                  val.name = region.name[1];
                  return;
                }
              });
            });
          }
          break;
      }
    }
  });
  return val;
};