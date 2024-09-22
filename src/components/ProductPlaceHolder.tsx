import React from "react";
import { Skeleton } from "./ui/skeleton";

const ProductPlaceholder = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="relative w-[170px] h-[185px] md:w-[232px] md:h-[266px] lg:w-[302px] lg:h-[358px] bg-zinc-100 overflow-hidden rounded-xl">
        <Skeleton className="absolute top-0 left-0 w-full h-full" />
      </div>
      <div className="flex w-full items-center justify-between mt-4">
        <Skeleton className="w-2/3 h-4 rounded-lg" />
        <Skeleton className="w-2/6 h-4 rounded-lg" />
      </div>
    </div>
  );
};

export default ProductPlaceholder;