export interface AddTool {
  /** 工具名称 */
  name: string;
  /** 工具描述 */
  description?: string;
  /** 工具参数Schema */
  parameters?: Record<string, unknown>;
  /** 工具配置 */
  config?: Record<string, unknown>;
}
