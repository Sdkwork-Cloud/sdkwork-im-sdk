export interface CardAction {
  /** 动作类型 */
  type: string;
  /** 动作目标URL */
  url?: string;
  /** 动作参数 */
  params?: Record<string, unknown>;
  /** 小程序appId（小程序卡片时使用） */
  appId?: string;
  /** 小程序路径（小程序卡片时使用） */
  appPath?: string;
}
