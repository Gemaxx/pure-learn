// 📄 app/categories/[categoryId]/page.tsx

import React from "react";

// ✅ تعريف نوع البيانات للكاتيجوري
type Category = {
  id: number;
  title: string;
  color: string;
};

// ✅ دالة لجلب بيانات كاتيجوري معين من الـ API
async function getCategory(
  learnerId: number,
  categoryId: number
): Promise<Category | null> {
  try {
    const res = await fetch(
      `http://localhost:5115/api/learners/${learnerId}/categories/${categoryId}`,
      {
        headers: {
          Accept: "application/json",
        },
        cache: "no-store", // Get fresh data
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch category");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
}

// ✅ الصفحة الخاصة بعرض تفاصيل الكاتيجوري
export default async function CategoryPage({
  params,
}: {
  params: { categoryId: string };
}) {
  const learnerId = 1; // ثابت حالياً، يمكن جعله ديناميكي لاحقًا
  const categoryId = parseInt(params.categoryId, 10);
  const category = await getCategory(learnerId, categoryId);

  if (!category) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-red-500">
          ❌ Category Not Found
        </h1>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">📂 Category Details</h1>

      {/* ✅ تفاصيل الكاتيجوري */}
      <div
        className="p-6 rounded-lg shadow-lg"
        style={{ backgroundColor: category.color }}
      >
        <h2 className="text-3xl font-bold mb-2">{category.title}</h2>
        <p className="text-lg">ID: {category.id}</p>
        <div className="mt-4">
          <span className="font-semibold">Color:</span>{" "}
          <span
            style={{ backgroundColor: category.color }}
            className="inline-block w-6 h-6 rounded-full"
          ></span>
        </div>
      </div>
    </div>
  );
}
