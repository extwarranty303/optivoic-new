import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import CheckoutModal from './CheckoutModal';
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
    route: '/reseller-command-center',
    image_url: 'https://wekjabmdztgkhfszgyeg.supabase.co/storage/v1/object/public/general/gemini-reseller-collage.png'
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
  const [searchParams] = useSearchParams();
  const initialParam = searchParams.get('category');

  const getInitialCategory = () => {
    if (!initialParam) return "All";
    const lower = initialParam.toLowerCase();
    if (lower === 'personal' || lower === 'essential trackers') return "Essential Trackers";
    if (lower === 'business' || lower === 'professional hubs') return "Professional Hubs";
    if (lower === 'enterprise' || lower === 'enterprise b2b') return "Enterprise B2B";
    return "All";
  };

  const [activeCategory, setActiveCategory] = useState(getInitialCategory);
  const [templates, setTemplates] = useState(DEFAULT_TEMPLATES);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const categories = ["All", "Essential Trackers", "Professional Hubs", "Enterprise B2B"];

  // VIP Deep-Link state
  const [vipTemplate, setVipTemplate] = useState(null);
  const [vipPromo, setVipPromo] = useState('');
  const [vipCheckoutOpen, setVipCheckoutOpen] = useState(false);
  const [vipUser, setVipUser] = useState(null);

  useEffect(() => {
    const categoryFromUrl = getInitialCategory();
    if (categoryFromUrl !== "All") {
      setActiveCategory(categoryFromUrl);
    }

    // VIP Deep-Link: read ?template= and ?promo= params
    const templateParam = searchParams.get('template');
    const promoParam = searchParams.get('promo');
    if (templateParam && promoParam) {
      setVipPromo(promoParam);
      // Defer template match until after products load
    }

    // Fetch current user for CheckoutModal
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) setVipUser(data.user);
    });
  }, [initialParam]);

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
        const formattedTemplates = data
          .filter(p => {
            const isReseller = p.title && p.title.toLowerCase().includes('reseller');
            const cat = p.category_name || p.categoryName || '';
            if (isReseller && cat === 'Essential Trackers') {
              return false;
            }
            return true;
          })
          .map(p => {
            const isReseller = p.title && p.title.toLowerCase().includes('reseller');
            const img = p.image_url || (isReseller ? 'https://wekjabmdztgkhfszgyeg.supabase.co/storage/v1/object/public/general/gemini-reseller-collage.png' : null);
            return {
              ...p,
              icon: p.icon || (isReseller ? '📊' : '🚀'),
              desc: p.description || p.desc,
              categoryName: isReseller ? 'Professional Hubs' : (p.category_name || p.categoryName || 'Professional Hubs'),
              price: isReseller ? '99.00' : ((p.price_cents || 0) / 100).toFixed(2),
              status: isReseller ? 'READY' : (p.current_file_id ? 'READY' : 'COMING SOON'),
              route: isReseller ? '/reseller-command-center' : (p.route || `/template/${p.id}`),
              image_url: img
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

  const categoryFiltered = activeCategory === "All"
    ? templates
    : templates.filter(t => t.categoryName === activeCategory);

  const activeTemplates = categoryFiltered
    .filter(t => t.status === 'READY' || t.status === 'Active' || t.status === 'ACTIVE')
    .sort((a, b) => (a.title || '').localeCompare(b.title || ''));

  const inactiveTemplates = categoryFiltered
    .filter(t => t.status !== 'READY' && t.status !== 'Active' && t.status !== 'ACTIVE')
    .sort((a, b) => (a.title || '').localeCompare(b.title || ''));

  const filteredTemplates = [...activeTemplates, ...inactiveTemplates];

  // VIP Deep-Link: when templates load, match ?template= param and auto-open checkout
  useEffect(() => {
    if (loading) return;
    const templateParam = searchParams.get('template');
    const promoParam = searchParams.get('promo');
    if (!templateParam || !promoParam) return;

    const match = templates.find(t =>
      t.id === templateParam ||
      (t.title && t.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').includes(templateParam.toLowerCase()))
    );

    if (match && match.status === 'READY') {
      // Build a template object compatible with CheckoutModal
      const checkoutTemplate = {
        ...match,
        price_cents: match.price_cents || Math.round(parseFloat(match.price || '99') * 100)
      };
      setVipTemplate(checkoutTemplate);
      setVipPromo(promoParam);
      setVipCheckoutOpen(true);
    }
  }, [templates, loading]);

  return (
    <>
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
            className={`service-card group ${item.status === 'READY' ? 'ready' : 'coming-soon'} cursor-pointer`}
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
                <span className="card-icon">{item.icon || '📊'}</span>
                <span className={`card-badge ${item.status === 'READY' ? 'badge-ready' : 'badge-soon'}`}>
                  {item.status === 'READY' ? 'Active' : 'Coming Soon'}
                </span>
              </div>

              {item.image_url && (
                <div className="w-full h-44 my-3 rounded-2xl overflow-hidden border border-white/10 relative shadow-lg">
                  <img 
                    src={item.image_url} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                </div>
              )}

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

      {/* VIP Deep-Link CheckoutModal */}
      {vipTemplate && (
        <CheckoutModal
          isOpen={vipCheckoutOpen}
          onClose={() => setVipCheckoutOpen(false)}
          template={vipTemplate}
          user={vipUser}
          initialPromoCode={vipPromo}
          onSuccess={() => setVipCheckoutOpen(false)}
        />
      )}
    </>
  );
};

export default ServiceGrid;
