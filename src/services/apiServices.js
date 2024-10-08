// src/services/apiService.js
import axios from 'axios';

// URL dasar dari API
const API_BASE_URL = 'https://digistar-demo-be.vercel.app/api';

// Categories API
const getCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

const createCategory = async (category) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/categories`, category);
    return response.data;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};

const updateCategory = async (id, category) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/categories/${id}`, category);
    return response.data;
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
};

const deleteCategory = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};

// Wallets API
const getWallets = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/wallets`);
    return response.data;
  } catch (error) {
    console.error('Error fetching wallets:', error);
    throw error;
  }
};

const createWallet = async (wallet) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/wallets`, wallet);
    return response.data;
  } catch (error) {
    console.error('Error creating wallet:', error);
    throw error;
  }
};

const updateWallet = async (id, wallet) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/wallets/${id}`, wallet);
    return response.data;
  } catch (error) {
    console.error('Error updating wallet:', error);
    throw error;
  }
};

const deleteWallet = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/wallets/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting wallet:', error);
    throw error;
  }
};

// Expense Items API

// Create Expense Item
export const createExpenseItem = async (expenseItem) => {
  const response = await axios.post(`${API_BASE_URL}/expense-items`, expenseItem);
  return response.data;
};

// Get All Expense Items
export const getAllExpenseItems = async () => {
  const response = await axios.get(`${API_BASE_URL}/expense-items`);
  return response.data;
};

// Get Expense Items by Wallet ID
export const getExpenseItemsByWallet = async (walletId) => {
  const response = await axios.get(`${API_BASE_URL}/expense-items?wallet=${walletId}`);
  return response.data;
};

// Get Single Expense Item by ID
export const getExpenseItemById = async (itemId) => {
  const response = await axios.get(`${API_BASE_URL}/expense-items/${itemId}`);
  return response.data;
};

// Update Expense Item
export const updateExpenseItem = async (itemId, updates) => {
  const response = await axios.put(`${API_BASE_URL}/expense-items/${itemId}`, updates);
  return response.data;
};

// Delete Expense Item
export const deleteExpenseItem = async (itemId) => {
  const response = await axios.delete(`${API_BASE_URL}/expense-items/${itemId}`);
  return response.data;
};

// Export semua fungsi
export {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getWallets,
  createWallet,
  updateWallet,
  deleteWallet,
};
