export interface SendFriendRequestDto {
  /** Target user ID */
  toUserId: string;
  /** Request message */
  message?: string;
}
