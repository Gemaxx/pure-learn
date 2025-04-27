// 📄 app/categories/page.tsx
import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card"; // ShadCN UI
import { ScrollArea } from "@/components/ui/scroll-area"; // For sidebar scrolling
import { Skeleton } from "@/components/ui/skeleton"; // For loading state
import type { Category } from "@/lib/types/category";
//&


// // ✅ Fetch categories from API
// async function getCategories(learnerId: number): Promise<Category[]> {
//   try {
//     const res = await fetch(
//       `http://localhost:5115/api/learners/${learnerId}/categories`,
//       {
//         headers: { Accept: "application/json" },
//         cache: "no-store",
//       }
//     );
//     if (!res.ok) throw new Error("Failed to fetch categories");
//     return res.json();
//   } catch (error) {
//     console.error("Error fetching categories:", error);
//     return [];
//   }
// }

// // This is a server component
// export default async function CategoriesPage() {
//   const learnerId = 1; // 🔹 Make this dynamic later
//   const categories = await getCategories(learnerId);

//   return (
//     <div className="flex min-h-screen">
//       {/* Sidebar */}
//       <aside className="w-64 bg-gray-900 text-white p-4 border-r border-gray-800">
//         <h2 className="text-lg font-bold mb-4">Categories</h2>
//         <ScrollArea className="h-[calc(100vh-5rem)]">
//           {categories.length > 0 ? (
//             <ul className="space-y-2">
//               {categories.map((category) => (
//                 <li key={category.id}>
//                   <Link href={`/categories/${category.id}`}>
//                     <Card
//                       className="p-3 flex items-center gap-3 hover:bg-gray-800 rounded-lg cursor-pointer transition"
//                       style={{ borderLeft: `8px solid ${category.color}` }}
//                     >
//                       <span className="text-sm">{category.title}</span>
//                     </Card>
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-gray-400">No categories found.</p>
//           )}
//         </ScrollArea>
//       </aside>

//       {/* Content Area */}
//       <main className="flex-1 p-6 flex items-center justify-center">
//         <p className="text-gray-500 text-lg">
//           Select a category from the sidebar to view details.
//         </p>
//       </main>
//     </div>
//   );
// }
