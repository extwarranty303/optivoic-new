import React from 'react';
import { Link } from 'react-router-dom';

const TemplateCard = ({ template }) => {
  // IMPORTANT: Replace 'your-reseller-template-id' with the actual UUID of your "Reseller Command Center" template
  // You can find this ID in your Supabase 'templates' table.
  const RESELLER_COMMAND_CENTER_ID = 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6'; // Placeholder UUID
  const isResellerCommandCenter = template.id === RESELLER_COMMAND_CENTER_ID;

  return (
    <div className="template-card bg-[#121212] border border-gray-800 rounded-xl p-6 shadow-lg text-white">
      <h3 className="text-xl font-bold mb-2 text-[#67e8f9]">{template.title}</h3>
      <p className="text-gray-400 mb-4">{template.description}</p>
      <p className="text-lg font-semibold mb-4">Price: ${template.price_cents / 100}</p>
      
      {isResellerCommandCenter ? (
        <Link to="/templates/reseller-command-center" className="inline-block bg-[#0891b2] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#067e9a] transition-colors">
          View Details
        </Link>
      ) : (
        <button className="bg-gray-600 text-white font-bold py-2 px-4 rounded-lg cursor-not-allowed opacity-70" disabled>
          Notify Me
        </button>
      )}
    </div>
  );
};

export default TemplateCard;