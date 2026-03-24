export interface Model3DMediaResource {
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
  /** 3D模型格式 */
  format?: 'OBJ' | 'FBX' | 'GLTF' | 'GLB' | 'STL' | 'PLY' | '3DS' | 'DAE' | 'USD';
  /** 模型顶点数 */
  vertexCount?: number;
  /** 模型面数 */
  faceCount?: number;
  /** 模型材质数 */
  materialCount?: number;
  /** 模型骨骼数 */
  boneCount?: number;
  /** 模型动画数 */
  animationCount?: number;
  /** 模型边界盒尺寸 */
  boundingBox?: Record<string, unknown>;
  /** 模型预览图URL */
  previewUrl?: string;
  /** 模型材质贴图URLs */
  textureUrls?: string[];
}
