import { Button } from "./ui/button";
import { PRODUCT_CATEGORIES } from "@/app/config";
import { motion } from "framer-motion";
import AnimatedItem from "./animatedItem";

type Category = (typeof PRODUCT_CATEGORIES)[number];

interface NavItemProps {
  category: Category;
  isOpen: boolean;
  handleClick: () => void;
}

const NavItem = ({ category, isOpen, handleClick }: NavItemProps) => {
  return (
    <div className="flex">
      <div className="relative flex items-center">
        <Button
          className="gap-3 font-semibold"
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