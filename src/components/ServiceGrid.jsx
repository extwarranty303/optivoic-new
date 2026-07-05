import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './ServiceGrid.css';

const ServiceGrid = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const categories = ["All", "Essential Trackers", "Professional Hubs", "Enterprise B2B"];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      // NOTE: You'll need to add columns like 'desc', 'icon', 'categoryName' to your 'products' table
      // or handle this data mapping differently.
      const { data, error } = await supabase.from('products').select('*').eq('is_active', true);
      
      if (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
        return;
      }

      if (data) {
        // Map DB fields to component fields
        const formattedTemplates = data.map(p => ({
          ...p,
          desc: p.description,
          categoryName: p.category_name,
          price: (p.price_cents / 100).toFixed(2),
          status: p.current_file_id ? 'READY' : 'COMING SOON' // Example logic
        }));
        setTemplates(formattedTemplates);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const filteredTemplates = (activeCategory === "All"
    ? templates
    : templates.filter(t => t.categoryName === activeCategory))
    .slice(0, 2)
    .concat(
      (activeCategory === "All"
        ? templates
        : templates.filter(t => t.categoryName === activeCategory)
      ).slice(2).filter(item => item.status === 'READY')
    )
    .concat(
      (activeCategory === "All"
        ? templates
        : templates.filter(t => t.categoryName === activeCategory)
      ).slice(2).filter(item => item.status !== 'READY')
    );

  return (
    <section className="service-grid-section">
      <div className="service-grid-header">
        <div>
          <h2>Digital Marketplace</h2>
          <p>Turnkey frameworks for instant operational ROI</p>
        </div>
        <div className="category-filter">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {loading && <div className="text-center p-10 text-white">Loading Marketplace...</div>}

      {!loading && (
      <div className="service-grid">
        {filteredTemplates.map((item, index) => (
          <div
            key={item.id}
            className={`service-card ${item.status === 'READY' ? 'ready' : 'coming-soon'}`}
            style={{ '--index': index }}
          >
            <div className="card-background"></div>
            <div className="card-content">
              <div className="card-header">
                <span className="card-icon">{item.icon}</span>
                <span className={`card-badge ${item.status === 'READY' ? 'badge-ready' : 'badge-soon'}`}>
                  {item.status === 'READY' ? 'Available' : 'In Dev'}
                </span>
              </div>

              <h3 className="card-title">{item.title}</h3>
              <p className="card-desc">{item.desc}</p>

              <div className="card-category">{item.categoryName}</div>

              <div className="card-footer">
                <span className="card-price">${item.price}</span>
                <button
                  disabled={item.status !== 'READY'}
                  onClick={() => navigate(item.route || `/template/${item.id}`)}
                  className={`card-btn ${item.status === 'READY' ? 'btn-active' : 'btn-disabled'}`}
                >
                  {item.status === 'READY' ? 'View Details' : 'Notify Me'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      )}
    </section>
  );
};

export default ServiceGrid;
