
import { NewCategory, Category } from "@/lib/types/category";

export async function addCategory(
  learnerId: number,
  categoryData: NewCategory
): Promise<Category> {
  try {
    console.log(
      "Sending request to❗:",
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/learners/${learnerId}/categories`
    );
    console.log("Request body❗:", categoryData); // ✅ طباعة البيانات للتحقق

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${learnerId}/categories`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoryData),
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to add category");
    }

    return res.json();
  } catch (error) {
    console.error("Error adding category:", error);
    throw new Error(
      "Something went wrong while adding the category. Please try again."
    );
  }
}
