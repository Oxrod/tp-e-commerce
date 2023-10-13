import React, { useEffect, useState } from "react";
import Featured from "../Featured/Featured";
import { ApiProduct } from "../../interfaces/products";
import ProductGallery from "../ProductGallery/ProductGallery";
import {
  getFirst100Products,
  getRandomProduct,
} from "../../services/products-service";

const defaultProduct = {
  id: 1,
  title: "iPhone 9",
  description: "An apple mobile which is nothing like apple",
  price: 549,
  discountPercentage: 12.96,
  rating: 4.69,
  stock: 94,
  brand: "Apple",
  category: "smartphones",
  thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
  images: [
    "https://i.dummyjson.com/data/products/1/1.jpg",
    "https://i.dummyjson.com/data/products/1/2.jpg",
    "https://i.dummyjson.com/data/products/1/3.jpg",
    "https://i.dummyjson.com/data/products/1/4.jpg",
    "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
  ],
};

function Homepage() {
  const [featuredProduct, setFeaturedProduct] =
    useState<ApiProduct>(defaultProduct);
  const [products, setProducts] = useState<ApiProduct[]>([]);

  useEffect(() => {
    async function getProducts() {
      setFeaturedProduct(await getRandomProduct());
      setProducts(await getFirst100Products());
    }
    getProducts();
  }, []);

  return (
    <main className="pt-20">
      <section className="h-96 p-5 outline outline-1 outline-slate-800 mb-5">
        <Featured product={featuredProduct}></Featured>
      </section>
      <section>
        <ProductGallery products={products} />
      </section>
    </main>
  );
}

export default Homepage;
