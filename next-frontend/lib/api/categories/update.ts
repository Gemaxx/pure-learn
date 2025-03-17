// lib/api/categories/update.ts
import { Category, UpdateCategoryData } from "../../types/category";

export async function updateCategory(
  learnerId: number,
  categoryId: number,
  updatedData: UpdateCategoryData
): Promise<Category | null> {
  try {
    // 1. بناء URL الصحيح حسب Swagger
    const url = `http://localhost:5115/api/learners/${learnerId}/categories/${categoryId}`;

    // 2. استخدام طريقة PATCH بدلاً من PUT
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    // 3. معالجة حالة الـ 204 No Content
    if (response.status === 204) {
      return null;
    }

    // 4. التحقق من صحة الاستجابة
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update category: ${errorText}`);
    }

    // 5. إرجاع البيانات المحدثة
    return await response.json();
    
  } catch (error) {
    console.error('Error in updateCategory:', error);
    throw error;
  }
}