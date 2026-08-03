import React from 'react';
import TemplateCard from '../components/TemplateCard';

const MarketplacePage = () => {
  // Dummy data for templates. In a real app, this would come from your Supabase database.
  const templates = [
    {
      id: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', // This ID should match the one in TemplateCard.jsx
      title: 'Reseller Command Center',
      description: 'The ultimate dashboard for managing your reselling business.',
      price_cents: 19999, // $199.99
    },
    {
      id: 'b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7',
      title: 'E-commerce Launchpad',
      description: 'A comprehensive guide and template for starting your online store.',
      price_cents: 9999,
    },
    // Add more templates here
  ];

  return (
    <div className="marketplace-page container mx-auto p-8 bg-[#020202] text-white">
      <h1 className="text-4xl font-bold mb-8 text-center text-[#67e8f9]">Our Templates</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </div>
  );
};

export default MarketplacePage;