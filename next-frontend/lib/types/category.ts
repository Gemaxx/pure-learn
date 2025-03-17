// types/category.ts
export interface Category {
  id: number;
  title: string;
  description: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  parentCategoryId: number | null;
  learnerId: number;
  isDeleted: boolean;
}

export interface UpdateCategoryData {
  title?: string;
  description?: string;
  color?: string;
}