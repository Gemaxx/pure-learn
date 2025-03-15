import { NewCategory, Category } from "@/lib/types/category";

export async function addCategory(
  learnerId: number,
  categoryData: NewCategory,
    onSuccess?: () => void
): Promise<Category> {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/learners/${learnerId}/categories`;

    console.log("Sending request to❗:", url);
    console.log("Request body❗:", JSON.stringify(categoryData));

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(categoryData),
    });

    console.log("Response status❗:", res.status);

    if (!res.ok) {
      const errorText = await res.text(); // ✅ قراءة النص قبل محاولة `json()`
      console.error("❌ Response Error:", errorText);
      throw new Error(errorText || "Failed to add category");
    }

    // ✅ التحقق مما إذا كان `Response` يحتوي على بيانات قبل محاولة `res.json()`
    const resText = await res.text();
    if (!resText) {
      throw new Error(`❌ Empty response from server (${res.status})`);
    }

    const newCategory = JSON.parse(resText);

    // ✅ استدعاء `onSuccess` عند نجاح الإضافة
    if (onSuccess) {
      onSuccess();
    }
    return newCategory;
  } catch (error) {
    console.error("❌ Error adding category:", error);

    // ✅ إرجاع "كائن افتراضي" بدلاً من عدم إرجاع أي شيء (حتى لا يكسر `Promise<Category>`)
    return Promise.reject(
      new Error(
        "Something went wrong while adding the category. Please try again."
      )
    );
  }
}