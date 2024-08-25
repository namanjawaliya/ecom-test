"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/api/fetchProducts";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
};
