// ProductList.tsx
import React from 'react';
import ProductListing from '@/components/ProductListing';
import { useProducts } from '@/hooks/useProduct';
import { Product } from '@/types/Product';

interface ProductListProps {
  selectedCategoryId?: string;
}

const ProductList = ({ selectedCategoryId }: ProductListProps) => {
  const { products, loading, error } = useProducts(selectedCategoryId);

  let map: (Product | null)[] = [];
  if (products && products.length) {
    map = products;
  } else if (loading) {
    map = new Array<null>(8).fill(null);
  }

  return (
    <section className="py-4 mb-10 md:mb-20">
      <div className='relative'>
        <div className='mt-6 flex items-center w-full'>
          <div className="w-full grid grid-cols-2 gap-x-[46px] gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-x-6 md:gap-y-10 lg:gap-x-48">
            {map.map((product, i) => (
              <ProductListing
                key={`product-${i}`}
                product={product}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductList;
