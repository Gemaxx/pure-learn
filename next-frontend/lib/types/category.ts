// ✅ تعريف النوع الأساسي للتصنيفات (Categories)
export interface Category {
  id: number;
  title: string;
  description: string;
  color: string;
}

// ✅ نوع خاص بإضافة تصنيف جديد
//يزيل بعض الخصائص من Type لإنشاء NewCategory بدون id و createdAt
export type NewCategory = Omit<Category, "id" | "createdAt">;
