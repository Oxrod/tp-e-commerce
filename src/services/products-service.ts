import {
  getFirstNProducts,
  getRandomProduct as getRngProduct,
} from "../repositories/products-repositories";

export async function getFirst100Products() {
  return await getFirstNProducts(100);
}

export async function getRandomProduct() {
  return await getRngProduct();
}
