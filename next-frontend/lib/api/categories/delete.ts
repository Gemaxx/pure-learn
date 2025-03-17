// lib/api/categories/delete.ts
export async function deleteCategory(learnerId: number, categoryId: number) {
    try {
      const response = await fetch(
        `http://localhost:5115/api/learners/${learnerId}/categories/${categoryId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (!response.ok) throw new Error('Failed to delete category');
      return true;
    } catch (error) {
      console.error('Error deleting category:', error);
      return false;
    }
  }