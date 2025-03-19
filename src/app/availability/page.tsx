"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function Availability() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [showAppfolio, setShowAppfolio] = useState(false);

  // Initialize Appfolio when modal is opened and script is loaded
  useEffect(() => {
    if (showAppfolio && iframeRef.current) {
      const iframe = iframeRef.current;
      
      // Make sure iframe content is loaded
      const handleIframeLoad = () => {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        
        if (!iframeDoc) return;
        
        // Create a container for Appfolio inside iframe
        const appfolioContainer = iframeDoc.createElement('div');
        appfolioContainer.id = 'appfolio-listing';
        iframeDoc.body.appendChild(appfolioContainer);
        
        // Include script in iframe
        const script = iframeDoc.createElement('script');
        script.src = "https://madisonparke.appfolio.com/javascripts/listing.js";
        script.onload = () => {
          if (iframeDoc.defaultView && iframeDoc.defaultView.Appfolio) {
            iframeDoc.defaultView.Appfolio.Listing({
              hostUrl: "madisonparke.appfolio.com",
              propertyGroup: "Steeple",
              themeColor: "#C4A862",
              height: "100%",
              width: "100%",
              defaultOrder: "rent_asc",
              listingView: "tile",
              listingCount: 12,
              columns: 3
            });
          }
        };
        
        // Add base styles to iframe document
        const style = iframeDoc.createElement('style');
        style.textContent = `
          body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          }
          #appfolio-listing {
            width: 100%;
            height: 100%;
            overflow: auto;
          }
        `;
        
        iframeDoc.head.appendChild(style);
        iframeDoc.head.appendChild(script);
      };
      
      // Set up iframe
      iframe.onload = handleIframeLoad;
      
      // If iframe is already loaded, initialize
      if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
        handleIframeLoad();
      }
    }
  }, [showAppfolio]);

  // Handle scroll locking when modal is open
  useEffect(() => {
    if (showAppfolio) {
      // Lock body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      // Restore scroll when modal is closed
      document.body.style.overflow = '';
    };
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [showAppfolio]);

  return (
    <div className="pt-28 min-h-screen">
      {/* Hero Section */}
      <div className="relative z-40 py-24 px-4 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="w-20 h-0.5 bg-[#C4A862] mb-12"></div>
            <h1 className="text-4xl md:text-6xl font-light mb-12 tracking-tight">
              AVAILABLE RESIDENCES
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Discover your perfect home at Steeple Lofts. Browse our current
              availability and find the residence that matches your lifestyle.
            </p>
          </div>
        </div>
      </div>
      
      {/* Listings Section */}
      <div className="relative pt-16 pb-12 px-4 bg-white z-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-light mb-6 tracking-wide">
              CURRENT AVAILABILITY
            </h2>
            <p className="text-gray-700 mb-8">
              Explore our selection of meticulously designed residences
              featuring premium finishes and thoughtful layouts.
            </p>
          </div>

          {/* Button to open Appfolio popup */}
          <div className="text-center mb-12">
            <button
              onClick={() => setShowAppfolio(true)}
              className="border border-black px-10 py-3 text-sm tracking-widest hover:bg-black hover:text-white transition-all duration-300"
            >
              VIEW AVAILABLE UNITS
            </button>
          </div>

          {/* Representative image placeholder */}
          <div className="w-full h-64 md:h-96 bg-gray-100 rounded-lg flex items-center justify-center mb-12">
            <p className="text-gray-500">Property image gallery</p>
          </div>

          {/* Show all listings button */}
          <div className="text-center mt-12">
            <Link
              href="https://madisonparke.appfolio.com/listings"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-black px-10 py-3 text-sm tracking-widest hover:bg-black hover:text-white transition-all duration-300"
            >
              VIEW ALL LISTINGS
            </Link>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-24 px-4 bg-[#F8F8F8] z-40">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-20 h-0.5 bg-[#C4A862] mb-8 mx-auto"></div>
          <h2 className="text-3xl font-light mb-8 tracking-wide">
            INTERESTED IN A RESIDENCE?
          </h2>
          <p className="text-gray-700 mb-12 leading-relaxed">
            Schedule a private tour to experience Steeple Lofts in person and
            find your perfect home.
          </p>
          <Link
            href="/contact"
            className="border border-black px-10 py-4 text-sm tracking-widest hover:bg-black hover:text-white transition-all duration-300"
          >
            SCHEDULE A TOUR
          </Link>
        </div>
      </div>

      {/* Full-screen Appfolio Modal */}
      {showAppfolio && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex flex-col">
          {/* Modal header with close button */}
          <div className="bg-white p-4 flex justify-between items-center shadow-md">
            <h3 className="text-xl font-light">Available Residences</h3>
            <button 
              onClick={() => setShowAppfolio(false)}
              className="text-2xl hover:text-gray-600 transition-colors text-black z-50 absolute top-4 right-4 focus:outline-none"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
          
          {/* Modal content with Appfolio iframe */}
          <div className="flex-1 bg-white overflow-hidden">
            <iframe
              ref={iframeRef}
              className="w-full h-full border-none"
              title="Appfolio Listings"
              sandbox="allow-same-origin allow-scripts allow-forms"
              loading="lazy"
              aria-label="Property listings"
            />
          </div>
        </div>
      )}
    </div>
  );
}