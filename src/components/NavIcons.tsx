"use client";

import { Icons } from "./Icons";
import AnimatedItem from "./AnimatedItem";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LogOut, Settings, Pencil } from "lucide-react";
import Link from "next/link";
import Cart from "./Cart";

const NavIcons = () => {
  return (
    <div className="flex items-center gap-4 h-full">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <AnimatedItem isOpen={false}>
            <Icons.userRound className="h-6 w-6 cursor-pointer" />
          </AnimatedItem>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Pencil className="h-4 w-4 mr-2" />
            <Link href="#">Profil</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="h-4 w-4 mr-2" />
            <Link href="/admin/produits">Administrer</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut className="h-4 w-4 mr-2" />
            <Link href="#">Déconnexion</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AnimatedItem isOpen={false}>
        <Cart />
      </AnimatedItem>
    </div>
  );
};

export default NavIcons;