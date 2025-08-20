import React from "react";

const About: React.FC = () => {
  return (
<div className="bg-gradient-to-br from-green-50 via-white to-emerald-100 min-h-screen px-4 sm:px-6 lg:px-8 py-24">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-12 text-center text-gray-900 tracking-tight">
          🚜 Agricultural Management System
        </h1>

        {/* Mission Section */}
        <section className="mb-16 text-center">
          <p className="text-gray-700 text-xl sm:text-2xl max-w-4xl mx-auto leading-relaxed font-light">
            Our mission is to <span className="font-semibold text-indigo-600">empower farmers</span> and 
            agricultural stakeholders using <span className="text-emerald-600 font-semibold">cutting-edge 
            technology</span>, uniting data-driven insights with sustainable farming practices.
          </p>
        </section>

        {/* Divider */}
        <hr className="border-gray-300 my-12" />

        {/* Project Overview */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">
            📌 Project Overview
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            The <span className="font-semibold text-indigo-600">Agricultural Management System</span> 
            is a comprehensive platform that integrates <span className="text-emerald-600">AI, real-time 
            data,</span> and <span className="text-blue-600">modern software solutions</span> to optimize 
            farming operations, from soil health to market forecasting.
          </p>
        </section>

        {/* Key Features */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-gray-900 text-center">
            ⚡ Key Features
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Smart Crop Analytics", desc: "AI-powered insights on crop health, yield prediction, and soil conditions.", color: "from-indigo-500 to-blue-500" },
              { title: "Market Intelligence", desc: "Real-time data on prices and demand to maximize profits & minimize risks.", color: "from-emerald-500 to-green-500" },
              { title: "Resource Optimization", desc: "Smart tracking of water, fertilizers, and resources for sustainability.", color: "from-cyan-500 to-teal-500" },
              { title: "Secure Data Storage", desc: "Built with Prisma + JWT for secure authentication & reliable storage.", color: "from-violet-500 to-indigo-500" },
              { title: "Mobile Friendly", desc: "Optimized for all devices with responsive design & offline-first planning.", color: "from-orange-400 to-pink-500" },
              { title: "Community Support", desc: "A hub for collaboration between farmers, researchers & stakeholders.", color: "from-red-500 to-rose-500" },
            ].map((feature, i) => (
              <div
                key={i}
                className={`bg-gradient-to-r ${feature.color} p-[2px] rounded-xl shadow-lg hover:scale-105 transition-transform`}
              >
                <div className="bg-white rounded-xl p-6 h-full">
                  <h3 className="font-semibold text-lg mb-3 text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Goals */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">🎯 Goals & Objectives</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-3 text-lg leading-relaxed">
            <li>Improve crop yield and optimize resource consumption</li>
            <li>Deliver actionable, real-time market insights</li>
            <li>Enable farmer-friendly interfaces for all stakeholders</li>
            <li>Promote sustainable agriculture through smart tools</li>
          </ul>
        </section>

        {/* Technologies */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">🛠️ Technologies Used</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-3 text-lg">
            <li><span className="font-semibold text-indigo-600">React + TypeScript</span> for scalable frontend</li>
            <li><span className="font-semibold text-emerald-600">Tailwind CSS</span> for modern, responsive UI</li>
            <li><span className="font-semibold text-cyan-600">Prisma + PostgreSQL</span> for efficient data management</li>
            <li><span className="font-semibold text-orange-600">JWT</span> for secure authentication</li>
            <li>REST APIs & <span className="font-semibold text-purple-600">GraphQL (future integration)</span></li>
            <li><span className="font-semibold text-pink-600">Docker + Cloud</span> deployment (planned)</li>
          </ul>
        </section>

        {/* Future Roadmap */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">🚀 Future Roadmap</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-3 text-lg">
            <li>IoT device integration for live soil & weather data</li>
            <li>AI-powered image-based crop disease detection</li>
            <li>Blockchain for a transparent agricultural supply chain</li>
            <li>Mobile & offline-first support for rural accessibility</li>
          </ul>
        </section>

        {/* Contact */}
        <section className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">📩 Contact Us</h2>
          <p className="text-gray-700 text-lg">
            Have questions or feedback? Reach us at:{" "}
            <a
              href="mailto:pasamsaiteja2020@gmail.com"
              className="text-indigo-600 font-semibold hover:underline"
            >
              contact@agriculturalmanagement.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
