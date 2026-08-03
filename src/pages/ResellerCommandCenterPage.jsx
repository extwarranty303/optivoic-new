import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // Your Supabase client
import CheckoutModal from '../components/CheckoutModal'; // The modal we've been working on

const ResellerCommandCenterPage = () => {
  const { templateId } = useParams(); // Gets the ID from the URL
  const [template, setTemplate] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [user, setUser] = useState(null); // State to hold the logged-in user
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      // Fetch the specific template's details from your database
      const { data: templateData, error: templateError } = await supabase
        .from('templates')
        .select('*')
        .eq('id', templateId)
        .single();
      
      if (templateError) {
        console.error("Error fetching template:", templateError);
        setError("Could not load template details.");
      } else {
        setTemplate(templateData);
      }

      // Fetch the current user
      const { data: { user: userData }, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.error("Error fetching user:", userError);
        // Don't block the page if user fetch fails, just set user to null
      }
      setUser(userData);
      setLoading(false);
    };

    fetchData();
  }, [templateId]);

  if (loading) {
    return <div className="text-center py-10 text-gray-400">Loading template details...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  }

  if (!template) {
    return <div className="text-center py-10 text-gray-400">Template not found.</div>;
  }

  const handlePurchaseSuccess = () => {
    console.log("Purchase successful!");
    setIsCheckoutOpen(false);
    // Optionally, redirect the user to their dashboard or show a success message
  };

  return (
    <>
      <div className="template-detail-page container mx-auto p-8 bg-[#020202] text-white">
        <h1 className="text-4xl font-bold mb-6 text-[#67e8f9]">{template.title}</h1>
        
        <div className="hero-section bg-[#121212] p-8 rounded-lg border border-[#0891b2] mb-10 text-center">
          <p className="text-xl mb-6">Unlock the ultimate tool for managing your reselling business.</p>
          <button onClick={() => setIsCheckoutOpen(true)} className="bg-[#0891b2] text-white font-bold py-3 px-8 rounded-lg text-xl hover:bg-[#067e9a] transition-colors">
            Purchase Now for ${(template.price_cents / 100).toFixed(2)}
          </button>
        </div>

        <h2 className="text-3xl font-bold mb-4 text-[#67e8f9]">Why You Need This</h2>
        <p className="text-gray-300 mb-8 leading-relaxed">This is where you'd put a detailed explanation of the benefits, features, and how this template will transform their business. Use compelling language and highlight key advantages.</p>

        <h2 className="text-3xl font-bold mb-4 text-[#67e8f9]">What It Looks Like</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <img src="/path/to/screenshot1.jpg" alt="Screenshot of the command center" className="rounded-lg shadow-md border border-gray-700" />
          <img src="/path/to/screenshot2.jpg" alt="Another feature screenshot" className="rounded-lg shadow-md border border-gray-700" />
        </div>
        
        <p className="text-gray-300">Add more sections here for testimonials, FAQs, or a deeper dive into specific functionalities.</p>
      </div>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        template={template}
        user={user}
        onSuccess={handlePurchaseSuccess}
      />
    </>
  );
};

export default ResellerCommandCenterPage;