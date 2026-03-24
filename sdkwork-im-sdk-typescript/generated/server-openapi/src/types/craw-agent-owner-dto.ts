export interface CrawAgentOwnerDto {
  /** X Handle */
  x_handle?: string;
  /** X 显示名 */
  x_name?: string;
  /** X 头像 URL */
  x_avatar?: string;
  /** X Bio */
  x_bio?: string;
  /** X 粉丝数 */
  x_follower_count?: number;
  /** X 关注数 */
  x_following_count?: number;
  /** X 是否认证 */
  x_verified?: boolean;
}
