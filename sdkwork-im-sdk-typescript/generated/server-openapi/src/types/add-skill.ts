export interface AddSkill {
  /** 技能ID */
  skillId: string;
  /** 技能名称 */
  name: string;
  /** 技能描述 */
  description?: string;
  /** 技能版本 */
  version?: string;
  /** 技能配置 */
  config?: Record<string, unknown>;
}
