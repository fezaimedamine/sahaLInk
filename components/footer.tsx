"use client";

import Image from "next/image";
import Link from "next/link";

/**
 * Footer component that provides navigation links, company information, and contact details.
 * Displays responsively with a flex layout for desktop and stacked layout for smaller screens.
 */
export default function Footer() {
  return (
    <footer className=" py-8 px-4 mt-8 " >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">

        {/* Logo and company description section */}
        <div className="mb-6 md:items-center">
          {/* Logo linking to the home page */}
          <Link href="/">
            <Image src="/logo.png" alt="Logo" width={200} height={50} />
          </Link>
          {/* Brief description of the company */}
          <p className=" mt-6 text-sm w-4/5">
            We are dedicated to providing high-quality products and excellent customer service. Our mission is to make a difference in the lives of our customers.
          </p>
        </div>

        {/* Navigation menu section */}
        <div className="items-center mb-6 md:mb-0 md:w-1/4 ">
          <h3 className="text-lg font-semibold mb-2">Menu</h3>
          <ul className="space-y-2 ">
            <li>
              <Link href="/" className="text-sm hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-sm hover:underline">
              About Us
              </Link>
              </li>
            <li>
              <Link href="/contact" className="text-sm hover:underline">
                Contact
            </Link>
            </li>
          </ul>
        </div>

        {/* Contact information section */}
        <div className="md:w-1/4">
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <p className="text-sm">Email: info@example.com</p>
          <p className="text-sm">Phone: (123) 456-7890</p>
          <p className="text-sm">Address: 123 Main St, Anytown, USA</p>
          </div>
        </div>

      <div className="border-t border-gray-300 my-6"></div>

      {/* Footer copyright information */}
      <p className="text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} SahaLink. All rights reserved.
      </p>

    </footer>
  );
}