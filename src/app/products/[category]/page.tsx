// products/[category]/page.tsx
"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductList from "@/components/ProductList";
import { useParams } from 'next/navigation';
import { PRODUCT_CATEGORIES } from '@/app/config';

export default function CategoryPage() {
  const params = useParams();
  const categoryValue = params.category as string;

  // mapping la valeur de la catégorie avec l'objet catégorie
  const category = PRODUCT_CATEGORIES.find(
    (cat) => cat.value === categoryValue
  );

  if (!category) {
    return <div>Catégorie introuvable</div>;
  }

  const selectedCategoryId = category.id ? category.id.toString() : undefined;


  return (
    <MaxWidthWrapper>
      <div className='py-5 mx-auto text-center flex flex-col items-center max-w-7xl'>
      <ProductList selectedCategoryId={selectedCategoryId} />
      </div>
    </MaxWidthWrapper>
  );
}
