"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Availability() {
  const [iframeContent, setIframeContent] = useState<string>("");
  
  useEffect(() => {
    // Create the HTML content for the iframe
    const content = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
          <title>Steeple Lofts Availability</title>
          <style>
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
          </style>
        </head>
        <body>
          <div id="appfolio-listing"></div>
          
          <script src="https://madisonparke.appfolio.com/javascripts/listing.js"></script>
          <script>
            document.addEventListener('DOMContentLoaded', function() {
              if (window.Appfolio) {
                window.Appfolio.Listing({
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
            });
          </script>
        </body>
      </html>
    `;
    
    setIframeContent(content);
  }, []);

  return (
    <div className="pt-28 min-h-screen">
      {/* Hero Section */}
      <div className="relative py-24 px-4 bg-white border-b border-gray-100">
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
      
      {/* Listings Section with Embedded Appfolio - Full Width */}
      <div className="relative pt-16 pb-12 bg-white z-20">
        <div className="max-w-7xl mx-auto px-4 mb-10">
          <h2 className="text-3xl font-light text-gray-800 mb-6 tracking-wide">
            CURRENT AVAILABILITY
          </h2>
          <p className="text-gray-700 mb-8">
            Explore our selection of meticulously designed residences
            featuring premium finishes and thoughtful layouts.
          </p>
        </div>

        {/* Appfolio Container - Full width */}
        <div className="w-full h-full mb-12 border-y border-gray-100 overflow-hidden">
          <iframe
            className="w-full border-none"
            style={{ height: '800px', minHeight: '800px' }}
            title="Appfolio Listings"
            sandbox="allow-scripts allow-forms allow-same-origin"
            srcDoc={iframeContent}
            loading="lazy"
            aria-label="Property listings"
          />
        </div>

        {/* Show all listings button */}
        <div className="max-w-7xl mx-auto px-4 text-center mt-12">
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