// 맛집 정보 type
export interface SearchMatjipInfo {
  // id: number | undefined, // Unique ID
  address : string | undefined, // 맛집 주소
  name: string | undefined // 맛집명
  iconUrl: string | undefined, // 맛집 아이콘 URL
  latitude: number, // 위도
  longitude: number, // 경도
  phoneNumber: string, // 대표전화번호
  placeId: string, // 장소 고유 ID
  website: string, // 대표홈페이지 URL 
  userRegisterDate : string, // 내가 맛집목록에 추가한 일자  
  compoundCode: string, // 지역 구분 스트링
  hashtags: number[], // 해시태그 배열,
  registerUser: string, // User ID
  regionCode: string,
}