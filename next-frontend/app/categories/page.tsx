// 📄 app/categories/page.tsx

import React from "react";

// ✅ تعريف نوع البيانات للكاتيجوري
type Category = {
  id: number;
  title: string;
  color: string;
};

// ✅ دالة لجلب الداتا من الـ API
async function getCategories(learnerId: number): Promise<Category[]> {
  try {
    const res = await fetch(
      `http://localhost:5115/api/learners/${learnerId}/categories`,
      {
        headers: {
          Accept: "application/json",
        },
        cache: "no-store", // يمنع الكاش علشان يجيب أحدث داتا
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

// ✅ صفحة عرض الكاتيجوريز
export default async function CategoriesPage() {
  const learnerId = 1; // ممكن تخليه ديناميكي بعدين
  const categories = await getCategories(learnerId);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">📂 Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.length > 0 ? (
          categories.map((category) => (
            <div
              key={category.id}
              className="p-4 rounded shadow"
              style={{ backgroundColor: category.color }}
            >
              <h2 className="text-xl font-semibold">{category.title}</h2>
              <p className="text-sm">ID: {category.id}</p>
            </div>
          ))
        ) : (
          <p>No categories found.</p>
        )}
      </div>
    </div>
  );
}
