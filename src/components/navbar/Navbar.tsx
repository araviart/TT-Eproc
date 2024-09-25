"use client";
import Link from "next/link";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { Icons } from "../Icons";
import NavItems from "./NavItems";
import NavIcons from "./NavIcons";
import { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { nuckleMedium } from "@/lib/fonts";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false); 
  };

  return (
    <div className={cn('bg-white sticky z-50 top-0 inset-x-0 h-16', nuckleMedium.className)}>
      <header className='relative bg-white'>
        <div className='border-b border-slate-200'>
          <MaxWidthWrapper>
            <div className='flex h-16 items-center justify-between'>
              <Button 
                className="lg:hidden p-2"
                onClick={toggleMenu}
              >
                {isMenuOpen ? (
                  <Icons.closeMenu className="text-slate-500 z-10" />
                ) : (
                  <Icons.menu className="text-slate-500" />
                )}
              </Button>
              <div className='ml-4 flex lg:ml-0'>
                <Link href='/'>
                  <Icons.logo className='h-10 w-10' />
                </Link>
              </div>

              <div className='hidden z-50 lg:ml-8 lg:block lg:self-stretch'>
                <NavItems isMenuOpen={isMenuOpen} closeMenu={closeMenu} />
              </div>

              <div className='lg:ml-8 lg:block lg:self-stretch'>
                <NavIcons />
              </div>
            </div>
          </MaxWidthWrapper>
        </div>
      </header>
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-white flex flex-col items-center justify-center">
          <NavItems isMenuOpen={isMenuOpen} closeMenu={closeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
