import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Icons } from "./Icon";
import NavItems from "./NavItems";
import NavIcons from "./NavIcons";

const Navbar = () => {
  return (
    <div className='bg-white sticky z-50 top-0 inset-x-0 h-16'>
      <header className='relative bg-white'>
        <div className='border-b border-slate-200'>
          <MaxWidthWrapper>
            <div className='flex h-16 items-center justify-between'>
              <div className='ml-4 flex lg:ml-0'>
                <Link href='/'>
                  <Icons.logo className='h-10 w-10' />
                </Link>
              </div>

              <div className='hidden z-50 lg:ml-8 lg:block lg:self-stretch'>
                <NavItems />
              </div>

              <div className='lg:ml-8 lg:block lg:self-stretch'>
                <NavIcons />
              </div>
            </div>
          </MaxWidthWrapper>
        </div>
      </header>
    </div>
  );
};

export default Navbar;