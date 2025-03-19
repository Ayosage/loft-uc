"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Neighborhood() {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="pt-28 min-h-screen">
      {/* Hero Section */}
      <div className="relative z-40 py-24 px-4 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="w-20 h-0.5 bg-[#C4A862] mb-12"></div>
            <h1 className="text-4xl md:text-6xl font-light mb-12 tracking-tight">
              THE NEIGHBORHOOD
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Experience the vibrant energy and endless opportunities of University City, 
              a thriving district that combines world-class education, cutting-edge innovation, 
              and rich cultural experiences.
            </p>
          </div>
        </div>
      </div>
      
      {/* University City Spotlight Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12">
            {/* Left Column - Image */}
            <div className="md:w-1/2 relative h-[400px] md:h-auto overflow-hidden">
              <Image 
                src="/images/DJI_0059.JPG"
                alt="University City skyline"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
              />
            </div>
            
            {/* Right Column - Content */}
            <div className="md:w-1/2">
              <div className="w-20 h-0.5 bg-[#C4A862] mb-6"></div>
              <h2 className="text-3xl font-light mb-6 tracking-wide">UNIVERSITY CITY SPOTLIGHT</h2>
              
              <p className="text-gray-700 mb-8 leading-relaxed">
                University City is a dynamic, diverse neighborhood in West Philadelphia, home to top universities 
                like the University of Pennsylvania and Drexel University. A center for education, medical innovation, 
                and development, it features world-class institutions like CHOP and a booming life sciences sector. 
                With 30th Street Station as a major transit hub and pedestrian-friendly streets, it offers easy connectivity. 
                Its vibrant arts scene, diverse dining, and growing tech and real estate sectors make it a prime destination 
                for students, professionals, and businesses alike.
              </p>
              
              {/* Feature Cards */}
              <div className="mt-8 space-y-6">
                <div className="p-6 bg-[#f8f8f8] rounded-lg">
                  <h3 className="text-xl font-light mb-2 tracking-wide text-[#C4A862]">Top-Tier Education & Research</h3>
                  <p className="text-gray-700">
                    Home to Ivy League powerhouse UPenn and research-driven Drexel University, fostering innovation in academics and technology.
                  </p>
                </div>
                
                <div className="p-6 bg-[#f8f8f8] rounded-lg">
                  <h3 className="text-xl font-light mb-2 tracking-wide text-[#C4A862]">World-Class Medical & Life Sciences Hub</h3>
                  <p className="text-gray-700">
                    Features top institutions like CHOP and a booming biotech sector driving medical advancements.
                  </p>
                </div>
                
                <div className="p-6 bg-[#f8f8f8] rounded-lg">
                  <h3 className="text-xl font-light mb-2 tracking-wide text-[#C4A862]">Major Transportation Nexus</h3>
                  <p className="text-gray-700">
                    Anchored by 30th Street Station, with extensive rail, bus, bike, and pedestrian-friendly infrastructure.
                  </p>
                </div>
                
                <div className="p-6 bg-[#f8f8f8] rounded-lg">
                  <h3 className="text-xl font-light mb-2 tracking-wide text-[#C4A862]">Thriving Cultural & Economic Growth</h3>
                  <p className="text-gray-700">
                    A hotspot for arts, diverse dining, and major developments in real estate, tech, and hospitality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Tabs Section */}
      <section className="py-20 px-4 bg-[#f8f8f8]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-20 h-0.5 bg-[#C4A862] mb-6 mx-auto"></div>
            <h2 className="text-3xl font-light mb-6 tracking-wide">EXPLORE THE AREA</h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              Discover all that University City has to offer, from world-class dining and shopping 
              to cultural attractions and outdoor activities.
            </p>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-12 border-b border-gray-200">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-4 text-sm tracking-widest transition-all ${activeTab === 'overview' ? 'border-b-2 border-[#C4A862] text-[#C4A862]' : 'text-gray-600 hover:text-[#C4A862]'}`}
            >
              OVERVIEW
            </button>
            <button 
              onClick={() => setActiveTab('dining')}
              className={`px-6 py-4 text-sm tracking-widest transition-all ${activeTab === 'dining' ? 'border-b-2 border-[#C4A862] text-[#C4A862]' : 'text-gray-600 hover:text-[#C4A862]'}`}
            >
              DINING
            </button>
            <button 
              onClick={() => setActiveTab('shopping')}
              className={`px-6 py-4 text-sm tracking-widest transition-all ${activeTab === 'shopping' ? 'border-b-2 border-[#C4A862] text-[#C4A862]' : 'text-gray-600 hover:text-[#C4A862]'}`}
            >
              SHOPPING
            </button>
            <button 
              onClick={() => setActiveTab('culture')}
              className={`px-6 py-4 text-sm tracking-widest transition-all ${activeTab === 'culture' ? 'border-b-2 border-[#C4A862] text-[#C4A862]' : 'text-gray-600 hover:text-[#C4A862]'}`}
            >
              CULTURE
            </button>
            <button 
              onClick={() => setActiveTab('outdoors')}
              className={`px-6 py-4 text-sm tracking-widest transition-all ${activeTab === 'outdoors' ? 'border-b-2 border-[#C4A862] text-[#C4A862]' : 'text-gray-600 hover:text-[#C4A862]'}`}
            >
              OUTDOORS
            </button>
          </div>
          
          {/* Tab Content */}
          <div className="mt-8">
            {activeTab === 'overview' && (
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-light mb-4 tracking-wide">University City</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    University City is at the heart of Philadelphia&apos;s intellectual and innovative ecosystem. 
                    Home to world-renowned educational institutions and research centers, this vibrant 
                    neighborhood offers a perfect blend of academic excellence, cultural diversity, and urban convenience.
                  </p>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    With excellent transit options, pedestrian-friendly streets, and extensive bike networks, 
                    getting around is simple and convenient. Steeple Lofts residents enjoy proximity to everything 
                    this dynamic area has to offer.
                  </p>
                </div>
                <div className="relative h-[300px]">
                  <Image 
                    src="/images/DJI_0071.JPG"
                    alt="University City overview"
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-lg"
                  />
                </div>
              </div>
            )}
            
            {activeTab === 'dining' && (
              <div className="text-center">
                <h3 className="text-2xl font-light mb-4 tracking-wide">Local Dining Options</h3>
                <p className="text-gray-700 mb-8 max-w-3xl mx-auto">
                  University City is home to a diverse culinary scene, offering everything from casual cafes 
                  to upscale dining experiences.
                </p>
                <p className="text-gray-500">Coming Soon: Detailed dining guide</p>
              </div>
            )}
            
            {activeTab === 'shopping' && (
              <div className="text-center">
                <h3 className="text-2xl font-light mb-4 tracking-wide">Shopping Destinations</h3>
                <p className="text-gray-700 mb-8 max-w-3xl mx-auto">
                  Discover the many retail options in University City, from boutique shops to 
                  convenient everyday necessities.
                </p>
                <p className="text-gray-500">Coming Soon: Local shopping guide</p>
              </div>
            )}
            
            {activeTab === 'culture' && (
              <div className="text-center">
                <h3 className="text-2xl font-light mb-4 tracking-wide">Cultural Attractions</h3>
                <p className="text-gray-700 mb-8 max-w-3xl mx-auto">
                  University City boasts numerous museums, galleries, and performance venues 
                  that showcase the rich cultural heritage of Philadelphia.
                </p>
                <p className="text-gray-500">Coming Soon: Cultural attractions guide</p>
              </div>
            )}
            
            {activeTab === 'outdoors' && (
              <div className="text-center">
                <h3 className="text-2xl font-light mb-4 tracking-wide">Parks & Recreation</h3>
                <p className="text-gray-700 mb-8 max-w-3xl mx-auto">
                  Enjoy the beautiful outdoor spaces in and around University City, 
                  from scenic parks to recreational activities.
                </p>
                <p className="text-gray-500">Coming Soon: Outdoor activities guide</p>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <div className="py-24 px-4 bg-white z-40">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-20 h-0.5 bg-[#C4A862] mb-8 mx-auto"></div>
          <h2 className="text-3xl font-light mb-8 tracking-wide">
            EXPERIENCE UNIVERSITY CITY
          </h2>
          <p className="text-gray-700 mb-12 leading-relaxed">
            Live in the heart of Philadelphia&apos;s most innovative district. Schedule a tour today to discover 
            the Steeple Lofts and explore all that University City has to offer.
          </p>
          <Link
            href="/contact"
            className="border border-black px-10 py-4 text-sm tracking-widest hover:bg-black hover:text-white transition-all duration-300"
          >
            SCHEDULE A TOUR
          </Link>
        </div>
      </div>
    </div>
  );
}