// 맛집 정보 type
export interface Matjip {
  id: number | undefined, // 고유 ID
  name: string | undefined, // 맛집 상호명
  latitude: string | undefined, // 맛집 좌표 (위도)
  longitude: string | undefined, // 맛집 좌표 (경도)
  address : string | undefined, // 맛집 주소
  addressDetail: string | undefined, // 맛집 상세주소
}