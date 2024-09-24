import { Button } from "./ui/button";
import { PRODUCT_CATEGORIES } from "@/app/config";
import AnimatedItem from "./AnimatedItem";
import Link from "next/link";

type Category = (typeof PRODUCT_CATEGORIES)[number];

interface NavItemProps {
  category: Category;
  isOpen: boolean;
  handleClick: () => void;
  isMenuOpen: boolean;
}

const NavItem = ({ category, isOpen, handleClick, isMenuOpen }: NavItemProps) => {
  const href = category.value === "produits" ? "/" : `/products/${category.value}`;

  return (
    <div className="flex">
      <div className="relative flex items-center">
        <Link href={href}>
          <Button
            className={`gap-4 font-semibold ${isMenuOpen ? 'text-4xl' : 'text-base'} ${isOpen ? 'text-black' : ''}`}
            onClick={handleClick}
          >
            <AnimatedItem isOpen={isOpen}>{category.label}</AnimatedItem>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NavItem;