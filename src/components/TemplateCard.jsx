import React from 'react';
import { Link } from 'react-router-dom';
import BuyButton from './BuyButton';

const TemplateCard = ({ template, user = null }) => {
  if (!template) return null;

  const priceDisplay = template.price_cents
    ? (template.price_cents / 100).toFixed(2)
    : (template.price || '99.00');

  const isReady = template.status === 'READY' || template.status === 'Active' || template.status === 'ACTIVE' || !template.status;

  return (
    <div className="template-card bg-[#121212] border border-gray-800 rounded-xl p-6 shadow-lg text-white flex flex-col justify-between hover:border-cyan-500/30 transition-all duration-300">
      <div>
        {template.image_url && (
          <div className="w-full h-40 mb-4 rounded-lg overflow-hidden border border-white/10 relative">
            <img 
              src={template.image_url} 
              alt={template.title} 
              className="w-full h-full object-cover" 
            />
          </div>
        )}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-[#67e8f9]">{template.title}</h3>
          <span className="text-sm px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-semibold">
            ${priceDisplay}
          </span>
        </div>
        <p className="text-gray-400 text-sm mb-4 line-clamp-3">{template.description || template.desc}</p>
      </div>

      <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3">
        {template.route && (
          <Link
            to={template.route}
            className="flex-1 text-center bg-white/5 border border-white/10 text-gray-300 font-semibold py-2.5 px-4 rounded-lg hover:bg-white/10 transition-colors text-sm"
          >
            View Details
          </Link>
        )}
        
        {isReady ? (
          <div className="flex-1">
            <BuyButton
              template={template}
              user={user}
              className="w-full bg-gradient-to-r from-cyan-400 to-violet-500 text-white font-bold py-2.5 px-4 rounded-lg hover:shadow-[0_0_20px_rgba(56,182,255,0.4)] transition-all text-sm text-center cursor-pointer"
            />
          </div>
        ) : (
          <button
            className="flex-1 bg-gray-700 text-gray-400 font-bold py-2.5 px-4 rounded-lg cursor-not-allowed text-sm opacity-60"
            disabled
          >
            Coming Soon
          </button>
        )}
      </div>
    </div>
  );
};

export default TemplateCard;