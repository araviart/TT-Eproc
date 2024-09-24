import React, { useEffect, useState } from "react";
import { Product } from "@/types/Product";
import { cn } from "@/lib/utils";
import ProductPlaceholder from "@/components/ProductPlaceHolder";
import Link from "next/link";

interface ProductListingProps {
  product: Product | null;
  index: number;
}

const ProductListing = ({ product, index }: ProductListingProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 75);

    return () => clearTimeout(timer);
  }, [index]);

  if (!product || !isVisible) return <ProductPlaceholder />;

  return (
    <Link
      className={cn("invisible h-full w-full cursor-pointer group/main", {
        "visible animate-in fade-in-5": isVisible,
      })}
      href={`/product/${product.id}`}
    >
      <div className="flex flex-col w-full">
        <div className="relative w-[170] h-[185px] md:w-[232px] md:h-[266px] lg:w-[258px] lg:h-[298px] mt-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-xl"
          />
          <div className="flex w-full items-center justify-between">
            <h3 className="mt-3 font-medium text-sm text-gray-700 rounded-2xl">
              {product.name}
            </h3>
            <h3 className="mt-3 font-medium text-sm text-gray-700 rounded-2xl">
              {product.price} €
            </h3>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductListing;
