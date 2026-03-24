import type { AgentConfig } from './agent-config';

export interface UpdateAgent {
  /** 智能体名称 */
  name?: string;
  /** 智能体描述 */
  description?: string;
  /** 智能体头像URL */
  avatar?: string;
  /** 智能体类型 */
  type?: 'chat' | 'task' | 'knowledge' | 'assistant' | 'custom';
  /** 智能体配置 */
  config?: AgentConfig;
  /** 是否公开 */
  isPublic?: boolean;
  /** 智能体状态 */
  status?: 'idle' | 'initializing' | 'ready' | 'chatting' | 'executing' | 'error' | 'disabled' | 'maintenance';
}
