'use client'

type RegionType = {
  key: string,
  name: string | string[],
};

export const data: RegionType[] = [
  { key: 'RC000', name: '전국' },
  { key: 'RC001', name: [ '서울특별시', '서울' ] },
  { key: 'RC002', name: '경기' },
  { key: 'RC003', name: [ '인천광역시', '인천' ] },
  { key: 'RC004', name: [ '부산광역시', '부산' ] },
  { key: 'RC005', name: [ '대구광역시', '대구' ] },
  { key: 'RC006', name: [ '울산광역시', '울산' ] }, 
  { key: 'RC007', name: [ '광주광역시', '광주' ] }, 
  { key: 'RC008', name: [ '대전광역시', '대전' ] }, 
  { key: 'RC009', name: '강원' }, 
  { key: 'RC010', name: '세종' }, 
  { key: 'RC011', name: [ '충청남도', '충남' ] }, 
  { key: 'RC012', name: [ '충청북도', '충북' ] }, 
  { key: 'RC013', name: [ '전라남도', '전남' ] }, 
  { key: 'RC014', name: [ '전라북도', '전북' ] }, 
  { key: 'RC015', name: [ '경상남도', '경남' ] }, 
  { key: 'RC016', name: [ '경상북도', '경북' ] }, 
  { key: 'RC017', name: '제주' }, 
];