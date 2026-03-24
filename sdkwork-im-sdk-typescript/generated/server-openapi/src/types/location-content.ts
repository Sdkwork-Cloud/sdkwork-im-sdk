export interface LocationContent {
  /** 纬度 */
  latitude: number;
  /** 经度 */
  longitude: number;
  /** 地址描述 */
  address?: string;
  /** 地点名称 */
  name?: string;
  /** 缩略图URL */
  thumbnailUrl?: string;
}
