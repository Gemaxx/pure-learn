import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryForm = ({ categoryId, onSave }) => {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('');
  const [description, setDescription] = useState('');
  const [parentCategoryId, setParentCategoryId] = useState(null);

  useEffect(() => {
    // If editing an existing category, fetch its details
    if (categoryId) {
      const fetchCategory = async () => {
        try {
          const response = await axios.get(`/api/categories/${categoryId}`);
          const category = response.data;
          setTitle(category.Title);
          setColor(category.Color);
          setDescription(category.Description);
          setParentCategoryId(category.ParentCategoryID);
        } catch (error) {
          console.error("Error fetching category:", error);
        }
      };

      fetchCategory();
    }
  }, [categoryId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const categoryData = {
      Title: title,
      Color: color,
      Description: description,
      ParentCategoryID: parentCategoryId,
    };

    try {
      if (categoryId) {
        // Edit existing category
        await axios.put(`/api/categories/${categoryId}`, categoryData);
      } else {
        // Create new category
        await axios.post('/api/categories', categoryData);
      }
      onSave();  // Callback to refresh the category list
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{categoryId ? 'Edit Category' : 'Add Category'}</h2>
      <div>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Color:</label>
        <input type="text" value={color} onChange={(e) => setColor(e.target.value)} required />
      </div>
      <div>
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <div>
        <label>Parent Category:</label>
        <select value={parentCategoryId || ''} onChange={(e) => setParentCategoryId(e.target.value)}>
          <option value="">None</option>
          {/* Options for parent categories */}
          {/* You can fetch and populate this from the API */}
        </select>
      </div>
      <button type="submit">{categoryId ? 'Update' : 'Add'} Category</button>
    </form>
  );
};

export default CategoryForm;
