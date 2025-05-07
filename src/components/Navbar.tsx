"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav 
        className={`fixed w-full z-50 transition-all duration-500 ${
          isScrolled || mobileMenuOpen 
            ? "bg-white text-black shadow-sm py-4" 
            : "bg-[#0a0a0a] bg-opacity-20 text-white py-6"
        }`}
        style={{ pointerEvents: "auto" }} // Ensure nav is clickable
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className={`font-light text-2xl tracking-wide ${mobileMenuOpen ? "text-black" : ""}`}>
                STEEPLE LOFTS
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-12">
              <Link 
                href="/availability" 
                className={`text-sm tracking-widest hover:text-[#C4A862] transition-colors ${pathname === '/availability' ? 'text-[#C4A862]' : ''}`}
              >
                AVAILABILITY
              </Link>
              <Link 
                href="/neighborhood" 
                className={`text-sm tracking-widest hover:text-[#C4A862] transition-colors ${pathname === '/neighborhood' ? 'text-[#C4A862]' : ''}`}
              >
                NEIGHBORHOOD
              </Link>
              <Link 
                href="/gallery" 
                className={`text-sm tracking-widest hover:text-[#C4A862] transition-colors ${pathname === '/gallery' ? 'text-[#C4A862]' : ''}`}
              >
                GALLERY
              </Link>
              <Link 
                href="/contact"
                className={`text-sm tracking-widest hover:text-[#C4A862] transition-colors ${pathname === '/contact' ? 'text-[#C4A862]' : ''}`}
              >
                CONTACT
              </Link>
            </div>
            
           
            <div className="md:hidden">
              <button 
                type="button" 
                className={`${mobileMenuOpen ? 'text-black' : ''} flex flex-col space-y-1.5 focus:outline-none`} 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <span className={`block w-6 h-0.5 ${mobileMenuOpen ? 'bg-black rotate-45 translate-y-2' : isScrolled ? 'bg-black' : 'bg-white'} transition-all duration-300`}></span>
                <span className={`block w-6 h-0.5 ${mobileMenuOpen ? 'bg-black opacity-0' : isScrolled ? 'bg-black' : 'bg-white'} transition-all duration-300`}></span>
                <span className={`block w-6 h-0.5 ${mobileMenuOpen ? 'bg-black -rotate-45 -translate-y-2' : isScrolled ? 'bg-black' : 'bg-white'} transition-all duration-300`}></span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      
   
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 flex flex-col justify-center items-center text-black pt-20">
          <div className="space-y-8 text-center">
            <Link 
              href="/availability" 
              className="block text-2xl font-light tracking-wide hover:text-[#C4A862] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              AVAILABILITY
            </Link>
            <Link 
              href="/neighborhood" 
              className="block text-2xl font-light tracking-wide hover:text-[#C4A862] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              NEIGHBORHOOD
            </Link>
            <Link 
              href="/gallery" 
              className="block text-2xl font-light tracking-wide hover:text-[#C4A862] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              GALLERY
            </Link>
            <Link 
              href="/contact" 
              className="block text-2xl font-light tracking-wide hover:text-[#C4A862] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              CONTACT
            </Link>
          </div>
          
          <div className="mt-16 px-6 text-center">
            <p className="text-sm text-gray-600 mb-3">GET IN TOUCH</p>
            <p className="text-lg">info@steeplelofts.com</p>
            <p className="text-lg">(215) 555-1234</p>
          </div>
        </div>
      )}
    </>
  );
}
