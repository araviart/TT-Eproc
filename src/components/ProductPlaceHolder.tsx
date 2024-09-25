import React from "react";
import { Skeleton } from "./ui/skeleton";

const ProductPlaceholder = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="relative w-[170px] h-[185px] md:w-[204px] md:h-[233px] lg:w-[258px] lg:h-[298px]">
        <Skeleton className="absolute top-0 left-0 w-full h-full" />
      </div>
      <div className="flex w-full items-center justify-between mt-4">
        <Skeleton className="w-5/6 h-4 rounded-lg" />
      </div>
    </div>
  );
};

export default ProductPlaceholder;