"use client";

import Link from 'next/link';
import Image from 'next/image';

/**
 * Header component that provides a navigation bar with a logo, navigation links, and a login button.
 * The layout is responsive, adapting styles for different screen sizes.
 */
const Header = () => {
  return (
    <header  className="flex items-center justify-between px-6 py-4 text-xl sm:text-lg md:text-xl lg:text-2xl shadow-md sm:w-full">
      {/* Logo Section */}
      <div className="flex items-center">
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width={200} height={50} />
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav className="hidden gap-10 sm:flex space-x-6">
        <Link href="/" className='  sm:text-base md:text-lg hover'>Home</Link>
        <Link href="/doctors"className='  sm:text-base md:text-lg hover'><span>All Doctors</span></Link>
        <Link href="/about" className=' sm:text-base md:text-lg hover'>About</Link>
        <Link href="/contact" className=' sm:text-base md:text-lg hover'>Contact</Link>
      </nav>

      {/* Login Button */}
      <div>
        <Link href="/login">
          <button className="px-4 py-2 text-white bg-blue-600 rounded-full hover:bg-blue-700">
              Log In
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
