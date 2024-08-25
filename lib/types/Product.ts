export type Product = {
  id?: string;
  sellerId?: string;
  name: string;
  category: string;
  description: string;
  price: number;
  discount: number;
  createdAt?: string;
  thumbnail?: string;
  images?: string;
};
