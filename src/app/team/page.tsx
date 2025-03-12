

export default function Team() {
  const teamMembers = [
    {
      name: "Jane Smith",
      position: "CEO & Founder",
      bio: "Jane brings over 20 years of experience in business strategy and leadership. She founded Loft UC with a vision to help organizations achieve sustainable growth.",
      imageUrl: "/placeholder.jpg"
    },
    {
      name: "John Johnson",
      position: "Managing Director",
      bio: "With extensive experience in finance and operations, John oversees client engagements and ensures the delivery of exceptional service.",
      imageUrl: "/placeholder.jpg"
    },
    {
      name: "Emily Davis",
      position: "Strategy Director",
      bio: "Emily specializes in developing growth strategies that help clients navigate complex markets and build competitive advantage.",
      imageUrl: "/placeholder.jpg"
    },
    {
      name: "Michael Chen",
      position: "Financial Advisory Lead",
      bio: "Michael brings deep expertise in financial analysis and investment strategy to help clients optimize their financial performance.",
      imageUrl: "/placeholder.jpg"
    },
    {
      name: "Sarah Wilson",
      position: "Operations Consultant",
      bio: "Sarah helps clients improve operational efficiency and implement processes that drive performance and quality.",
      imageUrl: "/placeholder.jpg"
    },
    {
      name: "David Rodriguez",
      position: "Technology Strategist",
      bio: "David advises clients on technology adoption and digital transformation initiatives to enhance business capabilities.",
      imageUrl: "/placeholder.jpg"
    }
  ];

  return (
    <div className="pt-16 min-h-screen">
      {/* Hero Section */}
      <div className="bg-black text-white py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Team</h1>
          <p className="text-xl max-w-2xl">
            Meet our exceptional team of experienced consultants dedicated to delivering outstanding results.
          </p>
        </div>
      </div>
      
      {/* Team Members Section */}
      <div className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
                <div className="bg-gray-200 h-64 w-full relative">
                  {/* Replace with actual image when available */}
                  {/* <Image 
                    src={member.imageUrl} 
                    alt={member.name} 
                    fill 
                    className="object-cover" 
                  /> */}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-gray-500 mb-3">{member.position}</p>
                  <p className="text-gray-700">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Values Section */}
      <div className="py-16 px-4 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Approach</h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold mb-4">Collaborative</h3>
              <p className="text-gray-700 mb-6">
                We believe in working closely with our clients, combining our expertise with their industry knowledge to develop tailored solutions that address specific challenges and opportunities.
              </p>
              
              <h3 className="text-2xl font-bold mb-4">Data-Driven</h3>
              <p className="text-gray-700">
                Our recommendations are based on thorough analysis and research, ensuring that strategic decisions are informed by accurate insights and reliable information.
              </p>
            </div>
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold mb-4">Results-Focused</h3>
              <p className="text-gray-700 mb-6">
                We are committed to delivering tangible results that create measurable value for our clients. Our success is defined by the positive impact we make on their businesses.
              </p>
              
              <h3 className="text-2xl font-bold mb-4">Continuous Improvement</h3>
              <p className="text-gray-700">
                We constantly refine our methodologies and stay current with emerging trends and best practices to provide our clients with cutting-edge solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Join Our Team CTA */}
      <div className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Team</h2>
          <p className="text-gray-700 mb-8">
            We&apos;re always looking for talented professionals who are passionate about helping businesses succeed. Explore our career opportunities and become part of our growing team.
          </p>
          <a href="/careers" className="inline-block border border-black px-8 py-3 rounded-md font-medium hover:bg-black hover:text-white transition">
            View Opportunities
          </a>
        </div>
      </div>
    </div>
  );
}
