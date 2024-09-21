"use client";

import { Icons } from "./Icons";
import AnimatedItem from "./AnimatedItem";

const NavIcons = () => {
  return (
    <div className="flex items-center gap-4 h-full">
      <AnimatedItem isOpen={false}>
        <Icons.userRound className='h-6 w-6 cursor-pointer' />
      </AnimatedItem>
      <AnimatedItem isOpen={false}>
        <Icons.shoppingCart className='h-6 w-6 cursor-pointer' />
      </AnimatedItem>
    </div>
  );
};

export default NavIcons;