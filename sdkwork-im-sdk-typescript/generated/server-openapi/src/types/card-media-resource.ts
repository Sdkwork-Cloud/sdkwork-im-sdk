import type { CardAction } from './card-action';
import type { CardButton } from './card-button';

export interface CardMediaResource {
  /** 资源ID */
  id?: string;
  /** 资源UUID */
  uuid?: string;
  /** 资源URL */
  url?: string;
  /** 资源字节数据 */
  bytes?: string[];
  /** 本地文件 */
  localFile?: Record<string, unknown>;
  /** 资源Base64编码 */
  base64?: string;
  /** 资源类型 */
  type?: 'TEXT' | 'IMAGE' | 'VIDEO' | 'AUDIO' | 'DOCUMENT' | 'FILE' | 'LOCATION' | 'MUSIC' | 'CHARACTER' | 'MODEL_3D' | 'PPT' | 'CODE' | 'CARD';
  /** 资源MIME类型 */
  mimeType?: string;
  /** 资源大小（字节） */
  size?: number;
  /** 资源名称 */
  name?: string;
  /** 资源扩展名 */
  extension?: string;
  /** 资源标签 */
  tags?: Record<string, unknown>;
  /** 资源元数据 */
  metadata?: Record<string, unknown>;
  /** AI生成提示词 */
  prompt?: string;
  /** 创建时间 */
  createdAt?: string;
  /** 更新时间 */
  updatedAt?: string;
  /** 创建者ID */
  creatorId?: string;
  /** 卡片描述 */
  description?: string;
  /** 卡片类型 */
  cardType: 'MINI_PROGRAM' | 'APP' | 'LINK' | 'ARTICLE' | 'PRODUCT' | 'ORDER' | 'PAYMENT' | 'INVITATION' | 'RED_PACKET' | 'LOCATION' | 'CONTACT' | 'FILE_PREVIEW' | 'CUSTOM';
  /** 卡片标题 */
  title: string;
  /** 卡片封面图片URL */
  thumbnailUrl?: string;
  /** 卡片来源名称 */
  sourceName?: string;
  /** 卡片来源图标URL */
  sourceIcon?: string;
  /** 目标URL（点击跳转地址） */
  targetUrl?: string;
  /** 小程序appId */
  appId?: string;
  /** 小程序页面路径 */
  appPath?: string;
  /** 小程序原始ID */
  appOriginalId?: string;
  /** 小程序版本：release, trial, develop */
  appVersion?: string;
  /** 应用包名（APP卡片时使用） */
  packageName?: string;
  /** 应用下载URL */
  appDownloadUrl?: string;
  /** 卡片主动作 */
  mainAction?: CardAction;
  /** 卡片按钮列表 */
  buttons?: CardButton[];
  /** 卡片额外数据 */
  extraData?: Record<string, unknown>;
  /** 卡片标签 */
  tag?: string;
  /** 卡片状态 */
  status?: string;
  /** 过期时间 */
  expireTime?: string;
  /** 是否显示来源 */
  showSource?: boolean;
}
