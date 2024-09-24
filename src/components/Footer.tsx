"use client";

import { Icons } from "@/components/Icons";
import AnimatedItem from "./AnimatedItem";

export const Footer = () => {
  return (
    <footer className="py-5 border-t border-t-slate-200">
      <div className="container w-full mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="flex gap-2 items-center lg:flex-1">
            <Icons.logo className="h-10 w-10" />
            <div className="font-medium">BOUTIQUE DAVRILSUPPLY</div>
          </div>
          <nav className="flex flex-col gap-5 lg:gap-8 lg:flex-row lg:flex-1 justify-center">
            <AnimatedItem isOpen={false}>
              <a href="" className="text-slate-400 text-xs md:text-sm hover:text-slate-800">Nous contacter</a>
            </AnimatedItem>
            <AnimatedItem isOpen={false}>
              <a href="" className="text-slate-400 text-xs md:text-sm hover:text-slate-800">À propos</a>
            </AnimatedItem>
            <AnimatedItem isOpen={false}>
              <a href="" className="text-slate-400 text-xs md:text-sm hover:text-slate-800">Recrutement</a>
            </AnimatedItem>
            <AnimatedItem isOpen={false}>
              <a href="" className="text-slate-400 text-xs md:text-sm hover:text-slate-800">Davril Supply</a>
            </AnimatedItem>
          </nav>
          <div className="flex gap-5 lg:flex-1 justify-end">
            <AnimatedItem isOpen={false}>
              <a href="https://x.com/davrilsupply" target="_blank" rel="noopener noreferrer">
                <Icons.twitter className="h-5 w-5 cursor-pointer hover:text-slate-800" />
              </a>
            </AnimatedItem>
            <AnimatedItem isOpen={false}>
              <a href="https://www.instagram.com/davrilsupply/?hl=fr" target="_blank" rel="noopener noreferrer">
                <Icons.insta className="h-5 w-5 cursor-pointer hover:text-slate-800" />
              </a>
            </AnimatedItem>
          </div>
        </div>
      </div>
    </footer>
  );
};