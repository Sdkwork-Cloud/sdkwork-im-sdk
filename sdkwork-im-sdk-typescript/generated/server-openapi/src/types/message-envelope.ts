import type { AudioMediaResource } from './audio-media-resource';
import type { CardMediaResource } from './card-media-resource';
import type { CharacterMediaResource } from './character-media-resource';
import type { CodeMediaResource } from './code-media-resource';
import type { CustomContent } from './custom-content';
import type { DocumentMediaResource } from './document-media-resource';
import type { FileMediaResource } from './file-media-resource';
import type { ImageMediaResource } from './image-media-resource';
import type { LocationMediaResource } from './location-media-resource';
import type { Model3DMediaResource } from './model3-dmedia-resource';
import type { MusicMediaResource } from './music-media-resource';
import type { PptMediaResource } from './ppt-media-resource';
import type { SystemContent } from './system-content';
import type { TextMediaResource } from './text-media-resource';
import type { VideoMediaResource } from './video-media-resource';

export interface MessageEnvelope {
  /** 消息类型，统一使用大写枚举 */
  type?: 'TEXT' | 'IMAGE' | 'AUDIO' | 'VIDEO' | 'FILE' | 'LOCATION' | 'CARD' | 'CUSTOM' | 'SYSTEM' | 'MUSIC' | 'DOCUMENT' | 'CODE' | 'PPT' | 'CHARACTER' | 'MODEL_3D';
  /** 文本资源 */
  text?: TextMediaResource;
  /** 图片资源 */
  image?: ImageMediaResource;
  /** 音频资源 */
  audio?: AudioMediaResource;
  /** 视频资源 */
  video?: VideoMediaResource;
  /** 文件资源 */
  file?: FileMediaResource;
  /** 位置资源 */
  location?: LocationMediaResource;
  /** 卡片资源 */
  card?: CardMediaResource;
  /** 系统消息内容 */
  system?: SystemContent;
  /** 自定义消息内容 */
  custom?: CustomContent;
  /** 音乐资源 */
  music?: MusicMediaResource;
  /** 文档资源 */
  document?: DocumentMediaResource;
  /** 代码资源 */
  code?: CodeMediaResource;
  /** PPT 资源 */
  ppt?: PptMediaResource;
  /** 数字角色资源 */
  character?: CharacterMediaResource;
  /** 3D 模型资源 */
  model3d?: Model3DMediaResource;
}
