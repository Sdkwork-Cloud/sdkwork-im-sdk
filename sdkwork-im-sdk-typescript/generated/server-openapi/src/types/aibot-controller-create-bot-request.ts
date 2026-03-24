export interface AibotControllerCreateBotRequest {
  name: string;
  description: string;
  type: string;
  config?: Record<string, unknown>;
  isActive?: boolean;
}
