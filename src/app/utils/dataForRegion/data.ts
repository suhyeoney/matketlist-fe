'use client'

type RegionType = {
  key: string,
  name: string,
} | undefined;

export const data: RegionType[] = [
  { key: '', name: '전국' },
  { key: '00001', name: '서울' },
  { key: '00002', name: '경기' },
  { key: '00003', name: '인천' },
  { key: '00004', name: '부산' },
  { key: '00005', name: '대구' },
  { key: '00006', name: '울산' }, 
  { key: '00007', name: '광주' }, 
  { key: '00008', name: '대전' }, 
  { key: '00009', name: '강원' }, 
  { key: '00010', name: '세종' }, 
  { key: '00011', name: '충청남도' || '충남' }, 
  { key: '00012', name: '충청북도' || '충북' }, 
  { key: '00013', name: '전라남도' || '전남' }, 
  { key: '00014', name: '전라북도' || '전북' }, 
  { key: '00015', name: '경상남도' || '경남' }, 
  { key: '00016', name: '경상북도' ||'경북' }, 
  { key: '00017', name: '제주' }, 
];