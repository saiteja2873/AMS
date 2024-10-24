import React from 'react';

const About: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">About Us</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
          <p className="text-gray-700">
            Our Agricultural Management System aims to assist farmers and agricultural stakeholders in managing their crops, resources, and data efficiently. This platform provides essential tools and insights to enhance productivity and sustainability in agriculture.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Goals and Objectives</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Improve crop yield and resource optimization.</li>
            <li>Provide actionable market insights.</li>
            <li>Facilitate user-friendly interaction for all stakeholders.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Team Members</h2>
          <ul className="text-gray-700">
            <li><strong>Student 1:</strong> Role - Contribution</li>
            <li><strong>Student 2:</strong> Role - Contribution</li>
            <li><strong>Student 3:</strong> Role - Contribution</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Technologies Used</h2>
          <p className="text-gray-700">
            We utilized various technologies to build the system, including:
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li>React for building the user interface</li>
            <li>TypeScript for type safety</li>
            <li>Tailwind CSS for styling</li>
            <li>Prisma for database management</li>
            <li>JWT for authentication</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions or feedback, please reach out to us at: <a href="mailto:contact@agriculturalmanagement.com" className="text-blue-500">contact@agriculturalmanagement.com</a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
