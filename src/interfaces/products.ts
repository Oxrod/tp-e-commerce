export type ApiProduct = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

export type ApiResponse = {
  products: ApiProduct[];
  total: number;
  skip: number;
  limit: number;
};
