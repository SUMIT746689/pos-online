
export interface SubSubCategory {
  id: number;
  category_id: number;
  title: string;
  // created_at: string;
  // updated_at: string;
}
export interface CreateSubSubCategory {
  title: string;
  sub_category_id: number;
}

export interface UpdateSubSubCategory {
  title?: string;
  sub_category_id: number;
}