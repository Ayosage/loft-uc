"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';


export default function Gallery() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        // In client-side code, we need to fetch the list of images from an API endpoint
        const response = await fetch('/api/images');
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        const imageData = await response.json();
        setImages(imageData);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchImages();
  }, []);
  
  const openLightbox = (imagePath: string) => {
    setSelectedImage(imagePath);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
  };
  
  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = ''; // Restore scrolling
  };

  return (
    <div className="pt-28 min-h-screen">
      {/* Hero Section */}
      <div className="relative z-40 py-24 px-4 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="w-20 h-0.5 bg-[#C4A862] mb-12"></div>
            <h1 className="text-4xl md:text-6xl font-light mb-12 tracking-tight">
              GALLERY
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Experience the beauty and elegance of Steeple Lofts through our carefully curated gallery showcasing our modern spaces and amenities.
            </p>
          </div>
        </div>
      </div>
      
      {/* Gallery Grid */}
      <div className="px-4 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-500">Loading gallery...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((imageName, index) => (
                <div 
                  key={index} 
                  className="aspect-square relative overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
                  onClick={() => openLightbox(`/images/${imageName}`)}
                >
                  <Image
                    src={`/images/${imageName}`}
                    alt={`Gallery image ${index + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <div className="relative max-w-[90%] max-h-[90%]">
            <button
              className="absolute -top-12 right-0 text-white text-3xl hover:text-gray-300"
              onClick={closeLightbox}
            >
              ✕
            </button>
            <Image
              src={selectedImage}
              alt="Selected gallery image"
              width={1200}
              height={800}
              className="max-w-full max-h-[85vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}