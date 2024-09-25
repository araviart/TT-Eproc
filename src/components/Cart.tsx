"use client";

import { Sheet, SheetTrigger, SheetContent, SheetFooter } from "./ui/sheet";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

const Cart = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <ShoppingCart className="h-6 w-6 cursor-pointer" />
      </SheetTrigger>
      <SheetContent className="flex flex-col items-center justify-center space-y-4">
        <span className="text-xl font-semibold">Votre panier est vide.</span>
        <SheetFooter>
          <SheetTrigger asChild>
            <Link
              href="/"
              className={buttonVariants({
                variant: "customForm",
                size: "sm",
                className: "text-sm text-muted-foreground",
              })}
            >
              Continuer les achats
            </Link>
          </SheetTrigger>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;