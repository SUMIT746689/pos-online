
export interface SubCategory {
  id: number;
  category_id: number;
  title: string;
  // created_at: string;
  // updated_at: string;
}
export interface CreateSubCategory {
  title: string;
  category_id: number;
}

export interface UpdateSubCategory {
  title?: string;
  category_id: number;
}