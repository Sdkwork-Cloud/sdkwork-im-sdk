export interface DocumentMediaResource {
  /** 资源ID */
  id?: string;
  /** 资源UUID */
  uuid?: string;
  /** 文档URL */
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
  /** 文档格式 */
  format?: 'PDF' | 'DOC' | 'DOCX' | 'XLS' | 'XLSX' | 'TXT' | 'RTF' | 'MD' | 'EPUB';
  /** 文档页数 */
  pageCount?: number;
  /** 文档作者 */
  author?: string;
  /** 文档标题 */
  title?: string;
  /** 文档摘要 */
  summary?: string;
  /** 文档关键词 */
  keywords?: string[];
  /** 文档内容文本 */
  contentText?: string;
  /** 文档封面URL */
  coverUrl?: string;
  /** 文档版本 */
  version?: string;
}
