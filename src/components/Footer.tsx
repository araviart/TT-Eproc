import { Icons } from "@/components/Icons";

export const Footer = () => {
  return (
    <footer className="py-5 border-b-slate-200">
      <div className="container">
        <div className="flex flex-col">
        <div className="flex gap-2 items-center">
            <Icons.logo className="h-10 w-10" />
            <div className="font-medium">Boutique DAVRILSUPPLY</div>
          </div>
          <div>
            <nav className="flex flex-col gap-5">
              <a href=""></a>
              <a href=""></a>
              <a href=""></a>
              <a href=""></a>
              <a href=""></a>
            </nav>
          </div>
          <div>
            <Icons.twitter className="h-5 w-5" />
            <Icons.insta className="h-5 w-5" />
          </div>
          </div>
        </div>
    </footer>
  );
};
