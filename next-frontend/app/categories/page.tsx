// 📄 app/categories/page.tsx



import React, { useState, useEffect } from "react";

// ✅ تعريف نوع البيانات للكاتيجوري
type Category = {
  id: number;
  title: string;
  color: string;
};

export default function CategoriesPage() {
  const learnerId = 1; // ثابت حالياً لكن ممكن نخليه ديناميكي بعدين
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState({
    title: "",
    description: "",
    color: "",
  });
  const [isAdding, setIsAdding] = useState(false);

  // ✅ دالة لجلب البيانات من الـ API
  const fetchCategories = async () => {
    try {
      const res = await fetch(
        `http://localhost:5115/api/learners/${learnerId}/categories`,
        {
          headers: {
            Accept: "application/json",
          },
          cache: "no-store",
        }
      );

      if (!res.ok) throw new Error("Failed to fetch categories");

      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // ✅ دالة لإرسال طلب إضافة كاتيجوري جديد
  const handleAddCategory = async () => {
    if (!newCategory.title || !newCategory.color)
      return alert("Title and Color are required!");

    try {
      const res = await fetch(
        `http://localhost:5115/api/learners/${learnerId}/categories`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
          },
          body: JSON.stringify(newCategory),
        }
      );

      if (!res.ok) throw new Error("Failed to add category");

      const addedCategory = await res.json();

      // ✅ تحديث القائمة بعد الإضافة
      setCategories((prev) => [...prev, addedCategory]);
      setNewCategory({ title: "", description: "", color: "" });
      setIsAdding(false);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  // ✅ جلب البيانات عند تحميل الصفحة
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">📂 Categories</h1>

      {/* ✅ زر إضافة كاتيجوري جديد */}
      <button
        onClick={() => setIsAdding(true)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        ➕ Add New Category
      </button>

      {/* ✅ نموذج إضافة كاتيجوري جديد */}
      {isAdding && (
        <div className="mb-6 p-4 border rounded bg-gray-100">
          <h2 className="text-xl font-semibold mb-2">Add New Category</h2>
          <input
            type="text"
            placeholder="Title"
            value={newCategory.title}
            onChange={(e) =>
              setNewCategory({ ...newCategory, title: e.target.value })
            }
            className="w-full p-2 mb-2 rounded border"
          />
          <input
            type="text"
            placeholder="Description"
            value={newCategory.description}
            onChange={(e) =>
              setNewCategory({ ...newCategory, description: e.target.value })
            }
            className="w-full p-2 mb-2 rounded border"
          />
          <input
            type="color"
            value={newCategory.color}
            onChange={(e) =>
              setNewCategory({ ...newCategory, color: e.target.value })
            }
            className="w-full p-2 h-10 mb-2 rounded border "
          />
          <button
            onClick={handleAddCategory}
            className="px-4 py-2 bg-green-500 text-white rounded mr-2"
          >
            ✅ Add
          </button>
          <button
            onClick={() => setIsAdding(false)}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            ❌ Cancel
          </button>
        </div>
      )}

      {/* ✅ عرض الكاتيجوريز */}
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
