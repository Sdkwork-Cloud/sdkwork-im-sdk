export interface AgentConfig {
  /** 模型名称 */
  model?: string;
  /** 温度参数 */
  temperature?: number;
  /** 最大Token数 */
  maxTokens?: number;
  /** 系统提示词 */
  systemPrompt?: string;
  /** 欢迎消息 */
  welcomeMessage?: string;
  /** 工具列表 */
  tools?: string[];
  /** 技能列表 */
  skills?: string[];
  /** LLM配置 */
  llm?: Record<string, unknown>;
}
