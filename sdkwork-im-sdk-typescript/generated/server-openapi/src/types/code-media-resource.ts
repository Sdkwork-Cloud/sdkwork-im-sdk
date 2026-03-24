export interface CodeMediaResource {
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
  /** 资源描述 */
  description?: string;
  /** 代码语言 */
  language?: 'JAVA' | 'PYTHON' | 'JAVASCRIPT' | 'TYPESCRIPT' | 'CPP' | 'C' | 'CSHARP' | 'GO' | 'RUST' | 'PHP' | 'RUBY' | 'SWIFT' | 'KOTLIN' | 'SQL' | 'HTML' | 'CSS' | 'SHELL' | 'JSON' | 'XML' | 'YAML' | 'OTHER';
  /** 代码内容 */
  code?: string;
  /** 代码行数 */
  lineCount?: number;
  /** 代码注释 */
  comments?: string;
  /** 代码依赖 */
  dependencies?: string[];
  /** 代码许可证 */
  license?: string;
  /** 代码版本 */
  version?: string;
  /** 代码作者 */
  author?: string;
}
