"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Script from "next/script";

export default function Availability() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This function will initialize the Appfolio listing after the script has loaded
    const initializeAppfolio = () => {
      if (window.Appfolio && containerRef.current) {
        window.Appfolio.Listing({
          hostUrl: 'madisonparke.appfolio.com',
          propertyGroup: 'Steeple',
          themeColor: '#C4A862',
          height: 'auto', // Changed from fixed height to auto
          width: '100%',
          defaultOrder: 'rent_asc',
          listingView: 'tile', // Add tile view for inline display
          listingCount: 6, // Limit the number of listings displayed at once
          columns: 3 // Display in 3 columns for desktop
        });
      }
    };

    // Create a global callback function that the script can call
    window.initAppfolioListing = initializeAppfolio;

    // Add custom styling to control Appfolio container
    const addCustomStyles = () => {
      const styleElement = document.createElement('style');
      styleElement.innerHTML = `
        #af-listings-container {
          height: auto !important;
          overflow: visible !important;
        }
        .af-listing-tile {
          max-width: 100%;
          margin-bottom: 20px;
          height: auto !important;
        }
        @media (max-width: 768px) {
          .af-listing-tile {
            width: 100% !important;
          }
        }
      `;
      document.head.appendChild(styleElement);
    };

    // Execute after a short delay to ensure Appfolio has initialized
    setTimeout(addCustomStyles, 1000);

    return () => {
      // Cleanup
      delete window.initAppfolioListing;
    };
  }, []);

  return (
    <div className="pt-28 min-h-screen"> {/* Increased top padding to ensure section is below navbar */}
      {/* Hero Section - Added position relative and z-index to ensure visibility */}
      <div className="relative z-40 py-24 px-4 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="w-20 h-0.5 bg-[#C4A862] mb-12"></div>
            <h1 className="text-4xl md:text-6xl font-light mb-12 tracking-tight">AVAILABLE RESIDENCES</h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Discover your perfect home at Steeple Lofts. Browse our current availability and find the residence that matches your lifestyle.
            </p>
          </div>
        </div>
      </div>

      {/* Appfolio Listings Container - Added clear margin to separate from hero */}
      <div className="relative pt-16 pb-12 px-4 bg-white z-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-light mb-6 tracking-wide">CURRENT AVAILABILITY</h2>
            <p className="text-gray-700 mb-8">
              Explore our selection of meticulously designed residences featuring premium finishes and thoughtful layouts.
            </p>
          </div>
          
          {/* Script loading with custom approach */}
          <Script
            id="appfolio-script"
            strategy="afterInteractive"
            src={(typeof window !== "undefined" && window.location.protocol === "https:" ? "https:" : "http:") + "//madisonparke.appfolio.com/javascripts/listing.js"}
            onLoad={() => {
              if (window.initAppfolioListing) {
                window.initAppfolioListing();
              }
            }}
          />
          
          {/* Container for Appfolio listing */}
          <div ref={containerRef} id="appfolio-listing" className="relative w-full"></div>
          
          {/* Show all listings button */}
          <div className="text-center mt-12">
            <Link href="https://madisonparke.appfolio.com/listings" target="_blank" rel="noopener noreferrer" 
              className="border border-black px-10 py-3 text-sm tracking-widest hover:bg-black hover:text-white transition-all duration-300">
              VIEW ALL LISTINGS
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 px-4 bg-[#F8F8F8] z-40">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-20 h-0.5 bg-[#C4A862] mb-8 mx-auto"></div>
          <h2 className="text-3xl font-light mb-8 tracking-wide">INTERESTED IN A RESIDENCE?</h2>
          <p className="text-gray-700 mb-12 leading-relaxed">
            Schedule a private tour to experience Steeple Lofts in person and find your perfect home.
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