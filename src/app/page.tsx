import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section with Video Background - Fixed position issue */}
      <div className="h-screen flex flex-col justify-center items-center text-center px-4 relative overflow-hidden">
        {/* Background video with overlay - Added fallback background color */}
        <video 
          className="absolute inset-0 w-full h-full object-cover z-0"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/placeholder-hero.jpg" // Optional placeholder image while video loads
        >
          <source src="/video/drone-video/drone-video-comp.mp4" type="video/mp4" />
        </video>
        
        {/* Added failsafe background in case video doesn't load */}
        <div className="absolute inset-0 bg-black z-[-1]"></div>
        
        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        
        {/* Hero content */}
        <div className="relative z-20 max-w-4xl mx-auto text-white">
          <h1 className="text-6xl md:text-8xl font-light mb-8 tracking-tight">STEEPLE LOFTS</h1>
          <div className="w-20 h-0.5 bg-[#C4A862] mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl font-light mb-12 tracking-wider">
            LUXURY RESIDENCES AT UNIVERSITY CITY
          </p>
          <Link href="/residences" 
            className="border border-white px-10 py-3 text-sm tracking-widest hover:bg-white hover:text-black transition-all duration-300">
            EXPLORE RESIDENCES
          </Link>
        </div>
        
    
        <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center z-20">
          <span className="text-white text-xs tracking-widest mb-2">SCROLL</span>
          <div className="h-8 w-0.5 bg-white"></div>
        </div>
      </div>
      
      {/* Intro Section - clean white section with minimal content */}
      <div className="py-24 px-4 bg-white text-black">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <div className="w-20 h-0.5 bg-[#C4A862] mb-8"></div>
          <h2 className="text-3xl md:text-4xl font-light mb-8 text-center tracking-wide">ELEVATED LIVING</h2>
          <p className="text-center max-w-3xl mx-auto text-gray-600 mb-16 leading-relaxed">
            Steeple Lofts offers a collection of meticulously designed residences in Philadelphia&apos;s vibrant University City. 
            Experience thoughtful architecture, premium finishes, and an unparalleled location.
          </p>
          
          {/* Features Grid - 3 columns with minimal content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full ">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 flex items-center justify-center mb-6 border border-[#C4A862]">
                <span className="text-[#C4A862]">01</span>
              </div>
              <h3 className="text-xl font-light mb-4 tracking-wide">MODERN DESIGN</h3>
              <p className="text-gray-600 leading-relaxed">
                Contemporary residences featuring open layouts, premium finishes, and floor-to-ceiling windows.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 flex items-center justify-center mb-6 border border-[#C4A862]">
                <span className="text-[#C4A862]">02</span>
              </div>
              <h3 className="text-xl font-light mb-4 tracking-wide">LUXURY AMENITIES</h3>
              <p className="text-gray-600 leading-relaxed">
                Curated spaces for wellness, entertainment, and productivity to enhance your everyday experience.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 flex items-center justify-center mb-6 border border-[#C4A862]">
                <span className="text-[#C4A862]">03</span>
              </div>
              <h3 className="text-xl font-light mb-4 tracking-wide">PRIME LOCATION</h3>
              <p className="text-gray-600 leading-relaxed">
                Steps from University City&apos;s cultural, dining, and educational destinations with excellent transportation access.
              </p>
            </div>
          </div>
        </div>
      </div>
      

      <div className="h-screen relative flex items-center justify-center bg-black">
        {/* This would be a full-width background image */}
        <Image 
          src="/images/your-image.jpg"
          alt=""
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
        />
        
        <div className="relative z-20 max-w-4xl mx-auto text-center text-white px-4">
          <div className="w-20 h-0.5 bg-[#C4A862] mx-auto mb-8"></div>
          <h2 className="text-5xl md:text-6xl font-light mb-8 tracking-tight">EXTRAORDINARY AMENITIES</h2>
          <p className="text-xl font-light mb-12 tracking-wider max-w-2xl mx-auto">
            Experience a curated collection of spaces designed for wellness, connection, and productivity.
          </p>
          <Link href="/amenities" 
            className="border border-white px-10 py-3 text-sm tracking-widest hover:bg-white hover:text-black transition-all duration-300">
            EXPLORE AMENITIES
          </Link>
        </div>
      </div>
      
      {/* Neighborhood Preview - light section with image */}
      <div className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0 md:pr-12">
            <div className="bg-gray-200 w-full h-96 relative">
              <Image 
               src="/images/DJI_0054.jpg"
               alt="Description" 
               width={800}
              height={600}
               className="absolute -bottom-8 -right-8 w-full h-full object-cover bg-black"/>
            </div>
          </div>
          <div className="md:w-1/2 md:pl-12 text-black">
            <div className="w-20 h-0.5 bg-[#C4A862] mb-8"></div>
            <h2 className="text-3xl md:text-4xl font-light mb-8 tracking-wide">UNIVERSITY CITY</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              A vibrant neighborhood at the intersection of culture, education, and innovation, University City offers a dynamic urban experience.
            </p>
            <p className="text-gray-600 mb-12 leading-relaxed">
              Discover world-class institutions, diverse dining options, lush parks, and a thriving arts scene—all steps from your front door.
            </p>
            <Link href="/neighborhood" 
              className="border border-black px-10 py-3 text-sm tracking-widest hover:bg-black hover:text-white transition-all duration-300">
              DISCOVER THE AREA
            </Link>
          </div>
        </div>
      </div>
      

      <footer className="bg-black text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start mb-16">
            <div className="mb-12 md:mb-0">
              <h3 className="text-2xl font-light mb-8 tracking-wide">STEEPLE LOFTS</h3>
              <p className="text-sm text-gray-400 max-w-xs">
                3600 Market Street<br />
                Philadelphia, PA 19104
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-16 gap-y-8">
              <div>
                <h4 className="text-sm font-medium mb-4 tracking-wide text-[#C4A862]">NAVIGATION</h4>
                <nav className="flex flex-col space-y-2 text-sm">
                  <Link href="/residences" className="text-gray-400 hover:text-white transition-colors">Residences</Link>
                  <Link href="/amenities" className="text-gray-400 hover:text-white transition-colors">Amenities</Link>
                  <Link href="/neighborhood" className="text-gray-400 hover:text-white transition-colors">Neighborhood</Link>
                  <Link href="/gallery" className="text-gray-400 hover:text-white transition-colors">Gallery</Link>
                  <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
                </nav>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-4 tracking-wide text-[#C4A862]">CONTACT</h4>
                <div className="flex flex-col space-y-2 text-sm">
                  <p className="text-gray-400">info@steeplelofts.com</p>
                  <p className="text-gray-400">(215) 555-1234</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-4 tracking-wide text-[#C4A862]">FOLLOW</h4>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 text-xs text-gray-500 flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} Steeple Lofts at University City. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
