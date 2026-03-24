import type { CardAction } from './card-action';

export interface CardButton {
  /** 按钮文本 */
  text: string;
  /** 按钮动作 */
  action?: CardAction;
  /** 按钮样式 */
  style?: string;
  /** 按钮颜色 */
  color?: string;
}
