"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function Availability() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Initialize Appfolio within an iframe
  useEffect(() => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      
      // Handle iframe load event
      const handleIframeLoad = () => {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        
        if (!iframeDoc) return;
        
        // Add base styles to iframe document
        const style = iframeDoc.createElement('style');
        style.textContent = `
          body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            height: 100%;
            overflow-x: hidden;
          }
          #appfolio-listing {
            width: 100%;
            height: 100%;
            min-height: 800px;
            overflow: auto;
          }
        `;
        
        // Create a container for Appfolio inside iframe
        const appfolioContainer = iframeDoc.createElement('div');
        appfolioContainer.id = 'appfolio-listing';
        iframeDoc.body.appendChild(appfolioContainer);
        
        // Add style to iframe document
        iframeDoc.head.appendChild(style);
        
        // Load the Appfolio script in the iframe
        const script = iframeDoc.createElement('script');
        script.src = "https://madisonparke.appfolio.com/javascripts/listing.js";
        script.onload = () => {
          if (iframeDoc.defaultView && iframeDoc.defaultView.Appfolio) {
            iframeDoc.defaultView.Appfolio.Listing({
              hostUrl: "https://madisonparke.appfolio.com",
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
        const metaTag = iframeDoc.createElement('meta');
        metaTag.httpEquiv = 'Content-Security-Policy';
        metaTag.content = "upgrade-insecure-requests";
        iframeDoc.head.appendChild(metaTag);
        iframeDoc.head.appendChild(script);

      };
      
      // Set up iframe
      iframe.onload = handleIframeLoad;
      
      // If iframe is already loaded, initialize
      if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
        handleIframeLoad();
      }
    }
  }, []);

  // Resize iframe height based on content
  useEffect(() => {
    const handleResize = () => {
      if (iframeRef.current) {
        // Ensure minimum height but allow it to grow
        iframeRef.current.style.height = '800px';
      }
    };
    
    window.addEventListener('resize', handleResize);
    // Initial resize
    handleResize();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="pt-28 min-h-screen">
      {/* Hero Section */}
      <div className="relative z-40 py-24 px-4 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="w-20 h-0.5 bg-[#C4A862] mb-12"></div>
            <h1 className="text-4xl md:text-6xl text-gray-800 mb-12 tracking-tight">
              AVAILABLE RESIDENCES
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Discover your perfect home at Steeple Lofts. Browse our current
              availability and find the residence that matches your lifestyle.
            </p>
          </div>
        </div>
      </div>
      
      {/* Listings Section with Embedded Appfolio */}
      <div className="relative pt-16 pb-12 px-4 bg-white z-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h2 className="text-3xl font-light text-gray-800 mb-6 tracking-wide">
              CURRENT AVAILABILITY
            </h2>
            <p className="text-gray-700 mb-8">
              Explore our selection of meticulously designed residences
              featuring premium finishes and thoughtful layouts.
            </p>
          </div>

          {/* Appfolio Container - embedded in iframe */}
          <div className="mb-12 border border-gray-100 rounded-lg overflow-hidden">
            <iframe
              ref={iframeRef}
              className="w-full border-none"
              style={{ height: '800px', minHeight: '800px' }}
              title="Appfolio Listings"
              sandbox="allow-same-origin allow-scripts allow-forms"
              loading="lazy"
              aria-label="Property listings"
            />
          </div>

          {/* Show all listings button */}
          <div className="text-center mt-12">
            <Link
              href="https://madisonparke.appfolio.com/listings"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-black px-10 py-3 text-sm tracking-widest hover:bg-black text-gray-800 hover:text-white transition-all duration-300"
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
          <h2 className="text-3xl font-light text-gray-800 mb-8 tracking-wide">
            INTERESTED IN A RESIDENCE?
          </h2>
          <p className="text-gray-700 mb-12 leading-relaxed">
            Schedule a private tour to experience Steeple Lofts in person and
            find your perfect home.
          </p>
          <Link
            href="/contact"
            className="border border-black px-10 py-4 text-gray-800 text-sm tracking-widest hover:bg-black hover:text-white transition-all duration-300"
          >
            SCHEDULE A TOUR
          </Link>
        </div>
      </div>
    </div>
  );
}