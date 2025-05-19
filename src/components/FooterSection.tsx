
import React from 'react';

const FooterSection = () => {
  return (
    <footer className="w-full py-6 px-4 mt-12 border-t">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-sm text-gray-500 mb-2">
          This is just for fun. Don't take it seriously 😂
        </p>
        <p className="text-xs text-gray-400">
          No real job opportunities are being offered. This is a satirical project.
        </p>
        
        <div className="mt-6 text-xs text-gray-400">
          Note: No actual security guards were harmed in the making of this meme site.
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
