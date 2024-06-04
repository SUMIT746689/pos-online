
export interface Category {
  id: number;
  title: string;
  // created_at: string;
  // updated_at: string;
}
export interface CreateCategory {
  title: string;
}

export interface UpdateCategory {
  title?: string;
}