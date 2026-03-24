import type { ImageMediaResource } from './image-media-resource';
import type { VideoMediaResource } from './video-media-resource';

export interface CharacterMediaResource {
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
  /** 角色名称 */
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
  /** 资源描述 */
  description?: string;
  /** 角色类型（2D_IMAGE, 2D_VIDEO, 3D_MODEL等） */
  characterType?: string;
  /** 性别 */
  gender?: string;
  /** 年龄段 */
  ageGroup?: string;
  /** 头像图片资源 */
  avatarImage?: ImageMediaResource;
  /** 头像视频资源 */
  avatarVideo?: VideoMediaResource;
  /** 关联发音人ID */
  speakerId?: string;
  /** 外观参数 */
  appearanceParams?: Record<string, unknown>;
  /** 动画参数 */
  animationParams?: Record<string, unknown>;
  /** 角色动作库 */
  actions?: string[];
  /** 角色表情库 */
  expressions?: string[];
  /** 角色声音特征 */
  voiceFeatures?: Record<string, unknown>;
}
