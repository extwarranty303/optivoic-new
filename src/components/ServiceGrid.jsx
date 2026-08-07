import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './ServiceGrid.css';

const DEFAULT_TEMPLATES = [
  {
    id: 'reseller-command-center',
    title: 'Reseller Command Center',
    desc: 'The ultimate operational framework for managing inventory, tracking profits, and scaling your reselling enterprise.',
    icon: '📊',
    categoryName: 'Professional Hubs',
    price: '99.00',
    status: 'READY',
    route: '/reseller-command-center'
  },
  {
    id: 'executive-tax-engine',
    title: 'Executive Tax Engine',
    desc: 'Automated 1099 tax estimation, deduction tracking, and quarterly financial allocation workspace.',
    icon: '⚖️',
    categoryName: 'Essential Trackers',
    price: '49.99',
    status: 'READY',
    route: '/tax-engine'
  },
  {
    id: 'ecommerce-launchpad',
    title: 'E-Commerce Launchpad',
    desc: 'Turnkey operational ecosystem for product launches, supplier auditing, and inventory flow management.',
    icon: '🚀',
    categoryName: 'Enterprise B2B',
    price: '149.99',
    status: 'COMING SOON',
    route: '/template/ecommerce-launchpad'
  }
];

const ServiceGrid = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [templates, setTemplates] = useState(DEFAULT_TEMPLATES);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const categories = ["All", "Essential Trackers", "Professional Hubs", "Enterprise B2B"];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('products').select('*').eq('is_active', true);
      
      if (error) {
        console.error("Error fetching products:", error);
        setTemplates(DEFAULT_TEMPLATES);
        setLoading(false);
        return;
      }

      if (data && data.length > 0) {
        // Map DB fields to component fields
        const formattedTemplates = data.map(p => {
          const isReseller = p.title && p.title.toLowerCase().includes('reseller');
          return {
            ...p,
            desc: p.description || p.desc,
            categoryName: p.category_name || p.categoryName || 'Professional Hubs',
            price: isReseller ? '99.00' : ((p.price_cents || 0) / 100).toFixed(2),
            status: isReseller ? 'READY' : (p.current_file_id ? 'READY' : 'COMING SOON'),
            route: isReseller ? '/reseller-command-center' : (p.route || `/template/${p.id}`)
          };
        });
        setTemplates(formattedTemplates);
      } else {
        setTemplates(DEFAULT_TEMPLATES);
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
            className={`service-card ${item.status === 'READY' ? 'ready' : 'coming-soon'} cursor-pointer`}
            style={{ '--index': index }}
            onClick={() => {
              if (item.status === 'READY') {
                navigate(item.route || `/template/${item.id}`);
              }
            }}
          >
            <div className="card-background"></div>
            <div className="card-content">
              <div className="card-header">
                <span className="card-icon">{item.icon}</span>
                <span className={`card-badge ${item.status === 'READY' ? 'badge-ready' : 'badge-soon'}`}>
                  {item.status === 'READY' ? 'Active' : 'In Dev'}
                </span>
              </div>

              <h3 className="card-title">{item.title}</h3>
              <p className="card-desc">{item.desc}</p>

              <div className="card-category">{item.categoryName}</div>

              <div className="card-footer">
                <span className="card-price">${item.price}</span>
                <button
                  disabled={item.status !== 'READY'}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (item.status === 'READY') {
                      navigate(item.route || `/template/${item.id}`);
                    }
                  }}
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
