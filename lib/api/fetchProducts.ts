import axiosInstance from "@/lib/axios";

export const fetchProducts = async () => {
  const response = await axiosInstance.get("/product/get");

  if (!response.status || response.status !== 200) {
    throw new Error("Failed to fetch products");
  }
  return response?.data?.products;
};
