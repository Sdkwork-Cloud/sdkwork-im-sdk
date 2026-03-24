import type { AudioMediaResource } from './audio-media-resource';
import type { CardContent } from './card-content';
import type { CardMediaResource } from './card-media-resource';
import type { CharacterMediaResource } from './character-media-resource';
import type { CodeMediaResource } from './code-media-resource';
import type { CustomContent } from './custom-content';
import type { DocumentMediaResource } from './document-media-resource';
import type { EventContent } from './event-content';
import type { FileMediaResource } from './file-media-resource';
import type { ImageMediaResource } from './image-media-resource';
import type { LocationContent } from './location-content';
import type { Model3DMediaResource } from './model3-dmedia-resource';
import type { MusicMediaResource } from './music-media-resource';
import type { PptMediaResource } from './ppt-media-resource';
import type { SystemContent } from './system-content';
import type { TextContent } from './text-content';
import type { VideoMediaResource } from './video-media-resource';

export interface MessageContent {
  /** 文本内容 */
  text?: TextContent;
  /** 图片资源 */
  image?: ImageMediaResource;
  /** 视频资源 */
  video?: VideoMediaResource;
  /** 音频资源 */
  audio?: AudioMediaResource;
  /** 音乐资源 */
  music?: MusicMediaResource;
  /** 文件资源 */
  file?: FileMediaResource;
  /** 文档资源 */
  document?: DocumentMediaResource;
  /** 代码资源 */
  code?: CodeMediaResource;
  /** 演示文稿资源 */
  ppt?: PptMediaResource;
  /** 数字人/角色资源 */
  character?: CharacterMediaResource;
  /** 3D模型资源 */
  model3d?: Model3DMediaResource;
  /** 位置内容 */
  location?: LocationContent;
  /** 名片内容 */
  card?: CardContent;
  /** 卡片资源（小程序、应用等） */
  cardResource?: CardMediaResource;
  /** 系统消息内容 */
  system?: SystemContent;
  /** 自定义消息内容 */
  custom?: CustomContent;
  /** 事件内容 */
  event?: EventContent;
}
