import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PrimaryInput from "@/components/utils/PrimaryInput";
import PrimaryTextarea from "@/components/utils/PrimaryTextarea";
import PrimarySelect from "@/components/utils/PrimarySelect";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/types/Product";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isAdd: boolean;
  initialData?: Product;
};

const categories = ["Electronics", "Books", "Clothing", "Home & Kitchen"]; // Example categories

const AddEditProductModal = ({
  isOpen,
  setIsOpen,
  isAdd,
  initialData,
}: Props) => {
  const [formData, setFormData] = useState<Product>({
    name: "",
    description: "",
    category: "",
    price: 0,
    discount: 0,
    sellerId: "saf",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const productData = {
      ...formData,
      price: Number(formData.price) * 100, // Convert to paise
      discount: Number(formData.discount),
    };

    console.log("Form data submitted:", productData);
    // Handle submission logic, such as calling an API
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isAdd ? "Add" : "Edit"} Product</DialogTitle>
          <DialogDescription>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-y-4 mt-4"
            >
              <PrimaryInput
                id="name"
                type="text"
                label="Name"
                value={formData.name}
                setValue={(value) => handleInputChange("name", value)}
              />
              <PrimaryTextarea
                id="description"
                label="Description"
                value={formData.description}
                setValue={(value) => handleInputChange("description", value)}
              />
              <PrimarySelect
                id="category"
                label="Category"
                options={categories}
                value={formData.category}
                setValue={(value) => handleInputChange("category", value)}
              />
              <PrimaryInput
                id="price"
                type="number"
                label="Price (in Rupees)"
                value={String(formData.price)}
                setValue={(value) => handleInputChange("price", value)}
              />
              <PrimaryInput
                id="discount"
                type="number"
                label="Discount (%)"
                value={String(formData.discount)}
                setValue={(value) => handleInputChange("discount", value)}
              />
              <Button type="submit" className="mt-4">
                {isAdd ? "Add Product" : "Save Changes"}
              </Button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditProductModal;
