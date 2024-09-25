"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductList from "@/components/products/ProductList";

export default function Home() {
  return <MaxWidthWrapper>
      <div className='py-5 mx-auto text-center flex flex-col items-center max-w-7xl w-full lg:pr-24'>
      <ProductList />
    </div>
    </MaxWidthWrapper>;
}