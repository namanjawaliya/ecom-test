"use client";

import AddEditProductModal from "@/components/product/AddEditProductModal";
import ProductCard from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import withAuth from "@/lib/hoc/withAuth";
import { useProducts } from "@/lib/hooks/useProducts";
import { Product } from "@/lib/types/Product";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

const ProductsPage = () => {
  const { data, error, isLoading } = useProducts();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdd, setIsAdd] = useState(true);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <section>
      <div className="flex justify-between items-center py-8 px-16">
        <h2 className="text-3xl font-bold">Products</h2>
        <Button className="px-6 font-bold" onClick={() => setIsModalOpen(true)}>
          <PlusIcon size={18} />
          Add
        </Button>
      </div>
      <div className="flex gap-10 flex-wrap justify-around">
        {data?.map(({ ...productConfig }: Product) => (
          <ProductCard {...productConfig} />
        ))}
      </div>
      <AddEditProductModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        isAdd={isAdd}
      />
    </section>
  );
};

export default withAuth(ProductsPage);
