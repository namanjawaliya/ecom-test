import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Product } from "@/lib/types/Product";
import { Button } from "../ui/button";
import { PenIcon, Trash } from "lucide-react";

const getDiscountedPrice = (price: number, discount: number) => {
  return (price - (price * discount) / 100) / 100;
};

const ProductCard = ({
  id,
  name,
  description,
  category,
  price,
  discount,
}: Product) => {
  return (
    <Card className="w-80 flex flex-col justify-between">
      <CardHeader>
        <CardTitle>
          <span className="capitalize mb-2">{name}</span>
        </CardTitle>
        <CardDescription className="flex flex-col items-start gap-y-2">
          <p className="line-clamp-1">{description}</p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="flex gap-4 items-center">
          <span className="flex justify-between w-full">
            <span className="text-lg">
              ₹{getDiscountedPrice(price, discount)}
            </span>
            <span className="capitalize border rounded-full text-sm max-w-32 truncate px-4 py-1">
              {category}
            </span>
          </span>
        </p>
        <p className="flex gap-4 items-center">
          <span className="line-through text-sm">₹{price}</span>
          <span className="font-semibold text-sm">({discount}% off)</span>
        </p>
      </CardContent>
      <CardFooter className="items-end justify-between">
        <Button>Buy Now</Button>
        <span className="flex gap-2">
          <Button variant="outline">
            <PenIcon />
          </Button>
          <Button variant="destructive">
            <Trash />
          </Button>
        </span>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
