// 맛집 정보 type
export interface SearchMatjipInfo {
  address : string | undefined, // 맛집 주소
  // category: string | undefined, // 카테고리 (분류 경로)
  // description: string | undefined, // 맛집 상세
  name: string | undefined // 맛집명
  iconUrl: string | undefined, // 맛집 아이콘 URL
  latitude: number // 위도
  longitude: number // 경도
}