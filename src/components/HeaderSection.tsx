
import React from 'react';

const HeaderSection = () => {
  return (
    <header className="w-full py-6 px-4 text-center">
      <div className="animate-bounce-slow mb-2">
        <span className="inline-block bg-brand-yellow text-black font-bold px-3 py-1 rounded-md text-sm">
          Limited Time Opportunity! 🔥
        </span>
      </div>

      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bangers text-brand-red tracking-wider mb-2">
        💼 Eligibility Test 💼
      </h1>
      
      <h2 className="text-xl md:text-2xl font-bangers text-gray-800 mb-6">
        for Security Guard at Vishal Mega Mart, Dmart & More!
      </h2>
      
      <p className="text-lg max-w-3xl mx-auto mb-6">
        Do you have what it takes to stand at the entrance, check bags, and say <span className="font-bold italic">"Bill hai?"</span> all day?
      </p>
      
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {["Great Salary", "Free Whistle", "Fancy Uniform", "Power Position"].map((benefit, index) => (
          <span 
            key={index} 
            className="bg-brand-blue bg-opacity-10 text-brand-blue px-3 py-1 rounded-full text-sm font-semibold"
          >
            ✓ {benefit}
          </span>
        ))}
      </div>
      
      <div className="w-full max-w-md mx-auto border-2 border-dashed border-gray-300 p-4 mb-8 bg-yellow-50 rounded-lg">
        <p className="font-semibold text-gray-700">Minimum Qualifications:</p>
        <ul className="text-left list-disc pl-5 mt-2">
          <li>10th Pass (Any %)</li>
          <li>12th Pass (Any %)</li>
          <li>Passport size photo</li>
          <li>Ability to wear a uniform without complaining</li>
        </ul>
      </div>
    </header>
  );
};

export default HeaderSection;
