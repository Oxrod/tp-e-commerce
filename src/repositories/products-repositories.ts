import axios from "axios";
import { ApiProduct } from "../interfaces/products";

const BASE_API_URL = "https://dummyjson.com/products";

export async function getFirstNProducts(amount: number) {
  const products = (await axios.get(`${BASE_API_URL}?limit=${amount}`)).data
    .products as ApiProduct[];
  products.slice(0, amount);

  return products;
}

export async function getRandomProduct() {
  const randomIndex = Math.floor(Math.random() * 100);
  const product = (await axios.get(`${BASE_API_URL}/${randomIndex}`))
    .data as ApiProduct;

  return product;
}
