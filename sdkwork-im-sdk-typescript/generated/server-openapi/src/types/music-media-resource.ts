export interface MusicMediaResource {
  /** 资源ID */
  id?: string;
  /** 资源UUID */
  uuid?: string;
  /** 音乐URL */
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
  /** 资源描述 */
  description?: string;
  /** 音频格式 */
  format?: 'WAV' | 'MP3' | 'AAC' | 'FLAC' | 'OGG' | 'PCM' | 'AIFF' | 'AU' | 'OPUS';
  /** 音乐时长（秒） */
  duration?: number;
  /** 音乐标题 */
  title?: string;
  /** 音乐艺术家 */
  artist?: string;
  /** 音乐专辑 */
  album?: string;
  /** 音乐风格 */
  genre?: string;
  /** 音乐歌词 */
  lyrics?: string;
  /** 音乐封面URL */
  coverUrl?: string;
  /** 音乐年份 */
  year?: number;
}
