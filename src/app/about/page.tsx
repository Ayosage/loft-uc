import Link from "next/link";

export default function About() {
  return (
    <div className="pt-24 min-h-screen">
      {/* Hero Section - following Carlton Park's minimal aesthetic */}
      <div className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="w-20 h-0.5 bg-[#C4A862] mb-12"></div>
            <h1 className="text-4xl md:text-6xl font-light mb-12 tracking-tight">ABOUT LOFT UC</h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Loft UC is a premier consulting firm dedicated to elevating businesses through strategic vision and exceptional execution. 
              Our approach combines timeless business principles with innovative methodologies tailored to each clients unique context.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Founded on a commitment to excellence, we partner with forward-thinking organizations to navigate complexity and achieve lasting success.
            </p>
          </div>
        </div>
      </div>
      
      {/* Full-width image section */}
      <div className="h-96 bg-gray-200 relative">
        {/* This would be a full-width image */}
      </div>
      
      {/* Mission Section - clean layout following Carlton Park's approach */}
      <div className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-20">
            <div className="md:w-2/5">
              <div className="w-20 h-0.5 bg-[#C4A862] mb-8"></div>
              <h2 className="text-3xl font-light mb-6 tracking-wide">OUR MISSION</h2>
            </div>
            <div className="md:w-3/5">
              <p className="text-gray-700 mb-8 leading-relaxed">
                At Loft UC, our mission is to provide clients with exceptional consulting services that drive meaningful business transformation and sustainable growth. We are committed to delivering innovative solutions that address complex challenges and create lasting value.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We partner with organizations across various industries to develop and implement strategies that improve performance, enhance competitive advantage, and build resilience in an ever-changing business landscape.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Values Section - grid layout inspired by Carlton Park */}
      <div className="py-24 px-4 bg-[#F8F8F8]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="w-20 h-0.5 bg-[#C4A862] mb-8 mx-auto"></div>
            <h2 className="text-3xl font-light tracking-wide">OUR CORE VALUES</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div>
              <span className="text-[#C4A862] text-sm tracking-wider mb-4 block">01</span>
              <h3 className="text-xl font-light mb-5 tracking-wide">EXCELLENCE</h3>
              <p className="text-gray-600 leading-relaxed">
                We uphold the highest standards in every aspect of our work, consistently delivering quality that exceeds expectations.
              </p>
            </div>
            <div>
              <span className="text-[#C4A862] text-sm tracking-wider mb-4 block">02</span>
              <h3 className="text-xl font-light mb-5 tracking-wide">INTEGRITY</h3>
              <p className="text-gray-600 leading-relaxed">
                We act with unwavering honesty and transparency, building trust through ethical practices and authentic relationships.
              </p>
            </div>
            <div>
              <span className="text-[#C4A862] text-sm tracking-wider mb-4 block">03</span>
              <h3 className="text-xl font-light mb-5 tracking-wide">INNOVATION</h3>
              <p className="text-gray-600 leading-relaxed">
                We embrace creative thinking and pioneering approaches to solve complex business challenges with fresh perspectives.
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
            <h2 className="text-3xl font-light tracking-wide mb-6">OUR JOURNEY</h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              The evolution of Loft UC reflects our commitment to excellence and our ability to adapt to an ever-changing business landscape.
            </p>
          </div>
          
          <div className="space-y-20">
            <div className="flex flex-col md:flex-row items-start">
              <div className="md:w-1/4 mb-6 md:mb-0">
                <span className="text-[#C4A862] text-3xl font-light">2010</span>
              </div>
              <div className="md:w-3/4 md:border-l md:border-gray-200 md:pl-12 relative">
                <div className="hidden md:block absolute w-3 h-3 rounded-full bg-[#C4A862] top-2 -left-1.5"></div>
                <h3 className="text-xl font-light mb-4 tracking-wide">FOUNDATION</h3>
                <p className="text-gray-700 leading-relaxed">
                  Loft UC was established with a vision to redefine business consulting through a holistic approach that balances strategic thinking with practical execution.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-start">
              <div className="md:w-1/4 mb-6 md:mb-0">
                <span className="text-[#C4A862] text-3xl font-light">2015</span>
              </div>
              <div className="md:w-3/4 md:border-l md:border-gray-200 md:pl-12 relative">
                <div className="hidden md:block absolute w-3 h-3 rounded-full bg-[#C4A862] top-2 -left-1.5"></div>
                <h3 className="text-xl font-light mb-4 tracking-wide">EXPANSION</h3>
                <p className="text-gray-700 leading-relaxed">
                  Following years of consistent growth, we expanded our service offerings to address a broader range of client challenges while maintaining our commitment to excellence.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-start">
              <div className="md:w-1/4 mb-6 md:mb-0">
                <span className="text-[#C4A862] text-3xl font-light">2020</span>
              </div>
              <div className="md:w-3/4 md:border-l md:border-gray-200 md:pl-12 relative">
                <div className="hidden md:block absolute w-3 h-3 rounded-full bg-[#C4A862] top-2 -left-1.5"></div>
                <h3 className="text-xl font-light mb-4 tracking-wide">GLOBAL REACH</h3>
                <p className="text-gray-700 leading-relaxed">
                  Loft UC expanded internationally, bringing our expertise to organizations across multiple continents and establishing a truly global presence.
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
          <h2 className="text-3xl font-light mb-8 tracking-wide">READY TO TRANSFORM YOUR BUSINESS?</h2>
          <p className="text-gray-700 mb-12 leading-relaxed">
            Connect with our team to explore how Loft UCs consulting expertise can help your organization achieve exceptional results.
          </p>
          <Link href="/contact" 
            className="border border-black px-10 py-4 text-sm tracking-widest hover:bg-black hover:text-white transition-all duration-300">
            GET IN TOUCH
          </Link>
        </div>
      </div>
    </div>
  );
}
