import { Button } from "./ui/button";
import { PRODUCT_CATEGORIES } from "@/app/config";
import { motion } from "framer-motion";
import AnimatedItem from "./AnimatedItem";

type Category = (typeof PRODUCT_CATEGORIES)[number];

interface NavItemProps {
  category: Category;
  isOpen: boolean;
  handleClick: () => void;
  isMenuOpen: boolean;
}



const NavItem = ({ category, isOpen, handleClick, isMenuOpen}: NavItemProps) => {
  return (
    <div className="flex">
      <div className="relative flex items-center">
        <Button
          className={`gap-4 font-semibold ${isMenuOpen ? 'text-4xl' : 'text-base'}`}
          onClick={handleClick}
        >
          <AnimatedItem isOpen={isOpen}>
            {category.label}
          </AnimatedItem>
        </Button>
      </div>
    </div>
  );
};

export default NavItem;