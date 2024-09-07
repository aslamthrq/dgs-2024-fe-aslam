// src/components/CategoriesPage.js
import React, { useEffect, useState } from 'react';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../services/apiServices';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [editMode, setEditMode] = useState(false); // State untuk mode edit
  const [currentCategory, setCurrentCategory] = useState(null); // Kategori yang sedang diedit

  // Fetch categories saat komponen dimuat
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data.data); // Asumsi data categories berada di `data`
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Handle submit form untuk create atau update category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        // Update kategori jika dalam mode edit
        const updatedCategory = await updateCategory(currentCategory._id, { name: categoryName });
        setCategories(categories.map((category) =>
          category._id === currentCategory._id ? updatedCategory.data : category
        ));
        setEditMode(false); // Keluar dari mode edit
      } else {
        // Buat kategori baru jika tidak dalam mode edit
        const newCategory = await createCategory({ name: categoryName });
        setCategories([...categories, newCategory.data]);
      }
      setCategoryName(''); // Reset input field
    } catch (err) {
      console.error('Error creating/updating category:', err);
      setError(err.message);
    }
  };

  // Masuk ke mode edit
  const handleEdit = (category) => {
    setCategoryName(category.name);
    setCurrentCategory(category);
    setEditMode(true); // Set ke mode edit
  };

  // Handle hapus kategori
  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      setCategories(categories.filter((category) => category._id !== id)); // Hapus dari state
    } catch (err) {
      console.error('Error deleting category:', err);
      setError(err.message);
    }
  };

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Categories</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Category Name"
          required
        />
        <button type="submit">{editMode ? 'Update Category' : 'Create Category'}</button>
        {editMode && <button onClick={() => { setEditMode(false); setCategoryName(''); }}>Cancel Edit</button>}
      </form>

      <ul>
        {categories.map((category) => (
          <li key={category._id}>
            {category.name}
            <button onClick={() => handleEdit(category)}>Edit</button>
            <button onClick={() => handleDelete(category._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesPage;
