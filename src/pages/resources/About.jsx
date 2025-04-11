import React from 'react';

const About = () => {
  return (
    <div className="space-y-8 p-6">
      {/* Section 1: Who we are */}
      <div className="themebg text-white rounded-lg p-6">
        <h2 className="text-lg font-semibold flex items-center space-x-2">
          <span>Who we are</span>
          <span className="text-sm text-gray-300">✏️</span>
        </h2>
        <textarea
          className="w-full bg-transparent text-white mt-4 text-sm resize-none outline-none"
          rows="5"
          defaultValue="The United States Government Exchange Alumni Association of Nigeria (USGEAAN) is a vibrant network of Nigerians who have participated in various U.S. Government-sponsored exchange programs. Our members include professionals, leaders, and change makers committed to leveraging their skills and experiences to drive positive change in Nigeria. We are more than just an association; we are a community united by a shared vision of fostering development, collaboration, and sustainable growth within our nation."
        />
      </div>

      {/* Section 2: What we do */}
      <div className="bg-gray-100 rounded-lg p-6">
        <h2 className="text-lg font-semibold flex items-center space-x-2">
          <span>What we do</span>
          <span className="text-sm text-gray-500">✏️</span>
        </h2>
        <textarea
          className="w-full bg-transparent text-gray-800 mt-4 text-sm resize-none outline-none"
          rows="5"
          defaultValue="The United States Government Exchange Alumni Association of Nigeria (USGEAAN) is a vibrant network of Nigerians who have participated in various U.S. Government-sponsored exchange programs. Our members include professionals, leaders, and change makers committed to leveraging their skills and experiences to drive positive change in Nigeria. We are more than just an association; we are a community united by a shared vision of fostering development, collaboration, and sustainable growth within our nation."
        />
      </div>

      {/* Section 3: How it started */}
      <div className="themebg text-white rounded-lg p-6">
        <h2 className="text-lg font-semibold flex items-center space-x-2">
          <span>How it started</span>
          <span className="text-sm text-gray-300">✏️</span>
        </h2>
        <textarea
          className="w-full bg-transparent text-white mt-4 text-sm resize-none outline-none"
          rows="5"
          defaultValue="The vision to strengthen the alumni network and create a unified association culminated in the establishment of a Transition Committee (TC) during the 2024 National Conference in Abuja. The TC was tasked with: - Restructuring the association. - Developing a robust constitution. - Setting up innovative platforms to enhance alumni engagement."
        />
        <div className="bg-[#0F3D5F] text-center text-sm mt-4 p-4 rounded">
          This initiative paved the way for a seamless transition to an elected body that will drive the association's long-term goals.
        </div>
      </div>
    </div>
  );
};

export default About;