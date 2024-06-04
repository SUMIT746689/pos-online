
export interface Attribute {
  id: number;
  title: string;
  value: string;
  // created_at: string;
  // updated_at: string;
}
export interface CreateAttribute {
  title: string;
  value: string;
}

export interface UpdateAttribute {
  title?: string;
  value?: string;
}