import Link from "next/link";

export default function Building() {
  return (
    <div className="pt-24 min-h-screen">
      {/* Hero Section - following Carlton Park's minimal aesthetic */}
      <div className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="w-20 h-0.5 bg-[#C4A862] mb-12"></div>
            <h1 className="text-4xl md:text-6xl font-light mb-12 tracking-tight">THE BUILDING</h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Steeple Lofts is a meticulously restored historic landmark, reimagined as luxury residences that honor the building&apos;s architectural heritage while offering modern comforts.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Originally constructed in 1925 and thoughtfully renovated in 2023, the building seamlessly blends historic character with contemporary design.
            </p>
          </div>
        </div>
      </div>
      
      {/* Full-width image section */}
      <div className="h-96 bg-gray-200 relative">
        {/* This would be a full-width image */}
      </div>
      
      {/* Architecture Section - clean layout following Carlton Park's approach */}
      <div className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-20">
            <div className="md:w-2/5">
              <div className="w-20 h-0.5 bg-[#C4A862] mb-8"></div>
              <h2 className="text-3xl font-light mb-6 tracking-wide">ARCHITECTURE</h2>
            </div>
            <div className="md:w-3/5">
              <p className="text-gray-700 mb-8 leading-relaxed">
                Steeple Lofts stands as a testament to Philadelphia&apos;s architectural heritage, featuring a stunning façade with intricate details and grand proportions. The building&apos;s iconic steeple remains a distinctive landmark on the University City skyline.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Inside, soaring ceilings, oversized windows, and original architectural elements create a sense of grandeur that harmoniously coexists with sleek, modern interiors and high-end finishes.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section - grid layout inspired by Carlton Park */}
      <div className="py-24 px-4 bg-[#F8F8F8]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="w-20 h-0.5 bg-[#C4A862] mb-8 mx-auto"></div>
            <h2 className="text-3xl font-light tracking-wide">BUILDING FEATURES</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div>
              <span className="text-[#C4A862] text-sm tracking-wider mb-4 block">01</span>
              <h3 className="text-xl font-light mb-5 tracking-wide">SUSTAINABLE DESIGN</h3>
              <p className="text-gray-600 leading-relaxed">
                Energy-efficient systems, including LED lighting, smart thermostats, and ENERGY STAR appliances, minimize environmental impact.
              </p>
            </div>
            <div>
              <span className="text-[#C4A862] text-sm tracking-wider mb-4 block">02</span>
              <h3 className="text-xl font-light mb-5 tracking-wide">24/7 CONCIERGE</h3>
              <p className="text-gray-600 leading-relaxed">
                Professional staff available around the clock to assist residents with package acceptance, visitor management, and special requests.
              </p>
            </div>
            <div>
              <span className="text-[#C4A862] text-sm tracking-wider mb-4 block">03</span>
              <h3 className="text-xl font-light mb-5 tracking-wide">SECURE ACCESS</h3>
              <p className="text-gray-600 leading-relaxed">
                State-of-the-art security system with keyless entry, video monitoring, and controlled building access for resident peace of mind.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* History Section - timeline with elegant spacing */}
      <div className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="w-20 h-0.5 bg-[#C4A862] mb-8 mx-auto"></div>
            <h2 className="text-3xl font-light tracking-wide mb-6">BUILDING LEGACY</h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              The evolution of Steeple Lofts reflects its rich history and transformation into a premier residential address.
            </p>
          </div>
          
          <div className="space-y-20">
            <div className="flex flex-col md:flex-row items-start">
              <div className="md:w-1/4 mb-6 md:mb-0">
                <span className="text-[#C4A862] text-3xl font-light">1925</span>
              </div>
              <div className="md:w-3/4 md:border-l md:border-gray-200 md:pl-12 relative">
                <div className="hidden md:block absolute w-3 h-3 rounded-full bg-[#C4A862] top-2 -left-1.5"></div>
                <h3 className="text-xl font-light mb-4 tracking-wide">ORIGINAL CONSTRUCTION</h3>
                <p className="text-gray-700 leading-relaxed">
                  Designed by renowned architect William Harold Lee, the building was originally constructed as a community landmark in the growing University City area.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-start">
              <div className="md:w-1/4 mb-6 md:mb-0">
                <span className="text-[#C4A862] text-3xl font-light">1982</span>
              </div>
              <div className="md:w-3/4 md:border-l md:border-gray-200 md:pl-12 relative">
                <div className="hidden md:block absolute w-3 h-3 rounded-full bg-[#C4A862] top-2 -left-1.5"></div>
                <h3 className="text-xl font-light mb-4 tracking-wide">HISTORIC DESIGNATION</h3>
                <p className="text-gray-700 leading-relaxed">
                  The building was added to the National Register of Historic Places, recognizing its architectural significance and cultural importance.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-start">
              <div className="md:w-1/4 mb-6 md:mb-0">
                <span className="text-[#C4A862] text-3xl font-light">2023</span>
              </div>
              <div className="md:w-3/4 md:border-l md:border-gray-200 md:pl-12 relative">
                <div className="hidden md:block absolute w-3 h-3 rounded-full bg-[#C4A862] top-2 -left-1.5"></div>
                <h3 className="text-xl font-light mb-4 tracking-wide">LUXURY TRANSFORMATION</h3>
                <p className="text-gray-700 leading-relaxed">
                  Following a meticulous restoration and renovation, the building was transformed into Steeple Lofts, offering premium residences while preserving its historic character.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section - aligned with Carlton Park's minimal approach */}
      <div className="py-24 px-4 bg-[#F8F8F8]">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-20 h-0.5 bg-[#C4A862] mb-8 mx-auto"></div>
          <h2 className="text-3xl font-light mb-8 tracking-wide">READY TO MAKE THIS YOUR HOME?</h2>
          <p className="text-gray-700 mb-12 leading-relaxed">
            Schedule a private tour to experience Steeple Lofts exceptional residences and amenities in person.
          </p>
          <Link href="/contact" 
            className="border border-black px-10 py-4 text-sm tracking-widest hover:bg-black hover:text-white transition-all duration-300">
            SCHEDULE A TOUR
          </Link>
        </div>
      </div>
    </div>
  );
}
