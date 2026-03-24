export interface ContactControllerUpdateRequest {
  name?: string;
  remark?: string;
  tags?: string[];
  isFavorite?: boolean;
  status?: 'active' | 'blocked' | 'deleted';
}
