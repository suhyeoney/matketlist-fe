'use client'

interface ReviewType {
  id: number,
  author: string,
  content: string,
};

export const data: ReviewType[] = [
  {
    id: 0,
    author: '서OO 님',
    content: '어느 디바이스에서나 편리하게 접근할 수 있어서 최고에요!'
  },
  {
    id: 1,
    author: '김OO 님',
    content: '지도를 통해 내 맛집목록을 한눈에 파악할 수 있다는 게 가장 큰 장점인 거 같아요.'
  },
  {
    id: 2,
    author: '안OO 님',
    content: '이제 사무실 주변에 점심 먹을 곳 가지고 결정장애 생길 일이 크게 줄어드는 거 같아요~'
  },
  {
    id: 3,
    author: '최OO 님',
    content: ''
  },
];
