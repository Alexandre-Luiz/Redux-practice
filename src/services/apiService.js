import axios from 'axios';

// GET all products
export async function apiGetAllProducts() {
  const { data } = await axios.get(`https://dummyjson.com/products`);
  return data;
}

// GET product details
export async function apiGetProductDetails(id) {
  const { data } = await axios.get(`https://dummyjson.com/products/${id}`);
  return data;
}
