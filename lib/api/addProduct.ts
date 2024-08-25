import axiosInstance from "@/lib/axios";
import { Product } from "@/lib/types/Product";

const addProduct = async (productData: Product): Promise<Product> => {
  const response = await axiosInstance.post("/product/add", productData);
  return response.data;
};

export default addProduct;
