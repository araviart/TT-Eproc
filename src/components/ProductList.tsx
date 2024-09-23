import React from 'react';
import ProductListing from '@/components/ProductListing';
import { useProducts } from '@/hooks/useProduct'; 
import { Product } from '@/types/Product';

const ProductList = () => {
  const { products, loading, error } = useProducts();
  
  let map: (Product | null)[] = [];
  console.log(products);
  if (products && products.length) {
    map = products;
  } else if (loading) {
    map = new Array<null>(4).fill(null);
  }
  
  return (
    <section className="py-8">
      <div className='relative'>
        <div className='mt-6 flex items-center w-full'>
          <div className="w-full grid grid-cols-2 gap-x-[24px] gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-x-3 md:gap-y-14 lg:gap-x-20">
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