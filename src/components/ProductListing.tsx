import React, { useEffect, useState } from "react";
import { Product } from "@/types/Product";
import { cn } from "@/lib/utils";
import ProductPlaceholder from "@/components/ProductPlaceHolder";
import Link from "next/link";
import { motion } from "framer-motion";

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
      className={cn("invisible w-full cursor-pointer group/main h-[185px] md:w-[232px] md:h-[266px] lg:w-[258px] lg:h-[298px] mb-5", {
        "visible animate-in fade-in-5": isVisible,
      })}
      href={`/product/${product.id}`}
    >
      <div className="flex flex-col w-full">
        <div className="relative w-full h-[185px] md:w-[232px] md:h-[266px] lg:w-[258px] lg:h-[298px] mt-4 overflow-hidden rounded-xl">
          {/* Utilisation de motion.img pour l'animation de zoom au hover */}
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            whileHover={{
              scale: 1.2, // Zoom interne à 120% au survol
            }}
            transition={{
              duration: 0.4, // Durée de l'animation
              ease: [0, 0.45, 0.19, 0.95], // Courbe de Bézier personnalisée (douce et agréable)
            }}
          />
        </div>
        <div className="flex w-full items-center justify-between mt-3">
          <h3 className="font-medium text-sm text-gray-700 rounded-2xl">
            {product.name}
          </h3>
          <h3 className="font-medium text-sm text-gray-700 rounded-2xl">
            {product.price} €
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default ProductListing;