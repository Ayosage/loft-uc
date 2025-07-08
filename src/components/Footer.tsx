import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#1A1A1A] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <a href="https://www.madisonparke.com/" target="_blank" rel="noopener noreferrer">
            <Image 
              src="/Asset 2(1).svg" 
              alt="Steeple Lofts Logo" 
              width={180} 
              height={60}
              className="h-auto"
            />
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-[#C4A862] text-lg font-light tracking-wide mb-6">STEEPLE LOFTS</h3>
            <p className="mb-4 text-sm leading-relaxed">
              3801 Spring Garden St<br />
              Philadelphia, PA 19104
            </p>
            <p className="mb-1 text-sm">
              <span className="text-[#C4A862] mr-2">Phone:</span>
              <a href="tel:2156134190" className="hover:text-[#C4A862] transition-colors">215-613-4190</a>
            </p>
            <p className="mb-6 text-sm">
              <span className="text-[#C4A862] mr-2">Email:</span>
              <a href="mailto:leasing@madisonparke.com" className="hover:text-[#C4A862] transition-colors">
                leasing@madisonparke.com
              </a>
            </p>
            <p className="text-sm text-gray-400">
              Managed by <a href="https://www.madisonparke.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#C4A862] transition-colors">Madison Parke</a><br />
              107 S 2nd St #300, Philadelphia, PA 19106
            </p>
          </div>
          
          {/* Navigation Links */}
          <div>
            <h3 className="text-[#C4A862] text-lg font-light tracking-wide mb-6">EXPLORE</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-[#C4A862] transition-colors">
                  HOME
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[#C4A862] transition-colors">
                  GALLERY
                </Link>
              </li>
              <li>
                <Link href="/availability" className="hover:text-[#C4A862] transition-colors">
                  AVAILABILITY
                </Link>
              </li>
              <li>
                <Link href="/neighborhood" className="hover:text-[#C4A862] transition-colors">
                  NEIGHBORHOOD
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#C4A862] transition-colors">
                  CONTACT
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Call to Action */}
          <div>
            <h3 className="text-[#C4A862] text-lg font-light tracking-wide mb-6">CONNECT WITH US</h3>
            <p className="text-sm mb-6 leading-relaxed">
              Interested in making Steeple Lofts your home? Contact our team today to schedule a tour and learn more about our available residences.
            </p>
            <Link
              href="/contact"
              className="inline-block border border-[#C4A862] text-[#C4A862] px-6 py-3 text-sm tracking-widest hover:bg-[#C4A862] hover:text-black transition-all duration-300"
            >
              SCHEDULE A TOUR
            </Link>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-400 mb-4 md:mb-0">
            © {currentYear} Steeple Lofts. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <a 
              href="https://www.instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-[#C4A862] transition-colors"
              aria-label="Instagram"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a 
              href="https://www.facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-[#C4A862] transition-colors"
              aria-label="Facebook"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}