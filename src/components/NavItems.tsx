"use client";
import { PRODUCT_CATEGORIES } from '@/app/config';
import { useState } from 'react';
import NavItem from './NavItem';

interface NavItemsProps {
  isMenuOpen: boolean;
}

const NavItems = ({ isMenuOpen }: NavItemsProps) => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);

  return (
    <div className={`flex gap-4 h-full ${isMenuOpen ? 'flex-col items-center justify-center ': 'flex-row'}`}>
      {PRODUCT_CATEGORIES.map((category, index) => {
        const handleOpen = () => {
          if (activeIndex === index) {
            setActiveIndex(null);
          } else {
            setActiveIndex(index);
          }
        };
        const isOpen = index === activeIndex;
        return (
          <NavItem
            key={category.value}
            category={category}
            isOpen={isOpen}
            handleClick={handleOpen}
            isMenuOpen={isMenuOpen}
          />
        );
      })}
    </div>
  );
};

export default NavItems;