"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductList from "@/components/ProductList";

export default function Home() {
  return <MaxWidthWrapper>
    <div className='py-5 mx-auto text-center flex flex-col items-center max-w-7xl'>
      <ProductList />
    </div>
    </MaxWidthWrapper>;
}
