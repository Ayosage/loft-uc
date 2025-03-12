export default function Services() {
  return (
    <div className="pt-16 min-h-screen">
      {/* Hero Section */}
      <div className="bg-black text-white py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Services</h1>
          <p className="text-xl max-w-2xl">
            Comprehensive consulting solutions designed to drive growth and transformation.
          </p>
        </div>
      </div>
      
      {/* Services Overview */}
      <div className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">What We Offer</h2>
          
          {/* Service 1 */}
          <div className="mb-16 flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2 bg-gray-200 h-80 w-full rounded-lg"></div> {/* Placeholder for image */}
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold mb-4">Strategic Consulting</h3>
              <p className="text-gray-700 mb-4">
                Our strategic consulting services help businesses develop and implement comprehensive strategies to achieve their long-term objectives. We work closely with leadership teams to analyze market trends, identify opportunities, and create actionable plans that drive sustainable growth.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Market analysis and competitive intelligence</li>
                <li>Growth strategy development</li>
                <li>Business model innovation</li>
                <li>Strategic planning workshops</li>
              </ul>
            </div>
          </div>
          
          {/* Service 2 */}
          <div className="mb-16 flex flex-col md:flex-row-reverse gap-8 items-center">
            <div className="md:w-1/2 bg-gray-200 h-80 w-full rounded-lg"></div> {/* Placeholder for image */}
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold mb-4">Financial Advisory</h3>
              <p className="text-gray-700 mb-4">
                Our financial advisory services provide businesses with the insights and guidance needed to make informed financial decisions. We help clients optimize their financial performance, manage risk, and create value for stakeholders.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Financial modeling and analysis</li>
                <li>Investment strategy</li>
                <li>Cost optimization</li>
                <li>Cash flow management</li>
              </ul>
            </div>
          </div>
          
          {/* Service 3 */}
          <div className="mb-16 flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2 bg-gray-200 h-80 w-full rounded-lg"></div> {/* Placeholder for image */}
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold mb-4">Operational Excellence</h3>
              <p className="text-gray-700 mb-4">
                Our operational excellence services focus on improving efficiency, productivity, and quality across all aspects of the business. We help clients streamline processes, reduce costs, and enhance operational performance.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Process optimization</li>
                <li>Supply chain management</li>
                <li>Organizational design</li>
                <li>Performance measurement</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-16 px-4 bg-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-gray-700 mb-8">
            Contact us today to discuss how our consulting services can help your organization achieve its goals.
          </p>
          <a href="/contact" className="inline-block bg-black text-white px-8 py-3 rounded-md font-medium hover:bg-gray-800 transition">
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
}
