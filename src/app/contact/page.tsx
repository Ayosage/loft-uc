"use client";

import { useState } from 'react';
import Image from 'next/image';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    moveInDate: '',
  });

  const [formStatus, setFormStatus] = useState<{
    status: 'idle' | 'submitting' | 'success' | 'error';
    message: string;
  }>({
    status: 'idle',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setFormStatus({
      status: 'submitting',
      message: 'Sending your message...'
    });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setFormStatus({
          status: 'success',
          message: 'Thank you! Your message has been sent successfully.'
        });
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          moveInDate: '',
        });
      } else {
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus({
        status: 'error',
        message: error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.'
      });
    }
  };

  return (
    <div className="pt-28 min-h-screen">
      {/* Hero Section */}
      <div className="relative py-24 px-4 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="w-20 h-0.5 bg-[#C4A862] mb-12"></div>
            <h1 className="text-4xl md:text-6xl font-light text-gray-800 mb-12 tracking-tight">
              CONTACT US
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              We&apos;d love to hear from you. Contact us to learn more about Steeple Lofts, 
              schedule a tour, or inquire about available residences.
            </p>
          </div>
        </div>
      </div>
      
      {/* Contact Information and Form Section */}
      <div className="relative py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Column - Contact Information */}
            <div>
              <div className="mb-12">
                <h2 className="text-3xl font-light text-gray-800 mb-8 tracking-wide">GET IN TOUCH</h2>
                <div className="space-y-6 text-gray-700">
                  <div className="flex items-start">
                    <div className="text-[#C4A862] mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Location</p>
                      <p className="leading-relaxed">
                        3801 Spring Garden St<br />
                        Philadelphia, PA 19104
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="text-[#C4A862] mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Phone</p>
                      <p><a href="tel:2156134190" className="hover:text-[#C4A862]">215-613-4190</a></p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="text-[#C4A862] mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Email</p>
                      <p><a href="mailto:leasing@madisonparke.com" className="hover:text-[#C4A862]">leasing@madisonparke.com</a></p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="text-[#C4A862] mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Office Hours</p>
                      <p className="leading-relaxed">
                        Monday - Friday: 9:00 AM - 5:00 PM<br />
                        Saturday: 10:00 AM - 4:00 PM<br />
                        Sunday: By Appointment
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <Image 
                  src="/images/DSC00943.JPG"
                  alt="Steeple Lofts exterior"
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-lg"
                />
              </div>
              
              <div className="mt-8 text-gray-700">
                <p className="mb-4">
                  <strong>Property Management:</strong> Madison Parke
                </p>
                <p className="mb-4">
                  <strong>Management Address:</strong><br />
                  107 S 2nd St #300<br />
                  Philadelphia, PA 19106
                </p>
                <p>
                  <a 
                    href="https://www.madisonparke.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#C4A862] hover:underline"
                  >
                    Visit Madison Parke Website
                  </a>
                </p>
              </div>
            </div>
            
            {/* Right Column - Contact Form */}
            <div className="bg-[#f8f8f8] p-8 rounded-lg">
              <h2 className="text-3xl font-light text-gray-800 mb-8 tracking-wide">SEND A MESSAGE</h2>
              
              {formStatus.status === 'success' ? (
                <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Message Sent!</h3>
                  <p>{formStatus.message}</p>
                  <button 
                    onClick={() => setFormStatus({ status: 'idle', message: '' })}
                    className="mt-4 border border-green-600 text-green-600 px-4 py-2 rounded hover:bg-green-600 hover:text-white transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 mb-1">
                      Name*
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full text-black px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C4A862] focus:border-[#C4A862]"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-gray-700 mb-1">
                        Email*
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full text-black px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C4A862] focus:border-[#C4A862]"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-gray-700 mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full text-black px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C4A862] focus:border-[#C4A862]"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="moveInDate" className="block text-gray-700 mb-1">
                      Desired Move-in Date
                    </label>
                    <input
                      type="date"
                      id="moveInDate"
                      name="moveInDate"
                      value={formData.moveInDate}
                      onChange={handleChange}
                      className="w-full text-black px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C4A862] focus:border-[#C4A862]"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-gray-700 mb-1">
                      Message*
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full text-black px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#C4A862] focus:border-[#C4A862]"
                    ></textarea>
                  </div>
                  
                  {formStatus.status === 'error' && (
                    <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded">
                      {formStatus.message}
                    </div>
                  )}
                  
                  <div>
                    <button
                      type="submit"
                      disabled={formStatus.status === 'submitting'}
                      className={`w-full border border-black px-8 py-4 text-sm tracking-widest ${
                        formStatus.status === 'submitting'
                          ? 'bg-gray-300 cursor-not-allowed'
                          : 'bg-black text-white hover:bg-[#C4A862] hover:border-[#C4A862] transition-colors'
                      }`}
                    >
                      {formStatus.status === 'submitting' ? 'SENDING...' : 'SEND MESSAGE'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}