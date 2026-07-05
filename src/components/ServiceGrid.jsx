import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ServiceGrid.css';

const templates = [
  { id: "36a7cc71-0c17-4530-a653-e59a8dbda7a3", categoryName: "Essential Trackers", title: "E-Commerce Reseller Profit & COGS Tracker", desc: "Track inventory cost, shipping, platform fees, and final profit margins.", price: 24.99, status: "READY", icon: "📊", active: true },
  { id: "reseller-command-center", categoryName: "Essential Trackers", title: "Reseller Command Center", desc: "Move from auction sourcing to resale with a simple daily workflow that keeps profits and operations clear.", price: 49.99, status: "READY", route: "/reseller-command-center", icon: "🛍️", active: true },
  { id: "526dcf30-0990-458e-bba7-b9f1c7e99078", categoryName: "Essential Trackers", title: "Optivoic Executive Tax Engine", desc: "Business-in-a-Box spreadsheet for 1099 pros. Track income, calculate quarterly taxes, and map deductions automatically.", price: 24.99, status: "READY", route: "/tax-engine", icon: "💼", active: true },
  { id: 2, categoryName: "Essential Trackers", title: "Options Trading & Premium Journal", desc: "Log strike prices, premiums, expiration dates, and win/loss ratios.", price: 14.99, status: "COMING SOON", icon: "📈", active: true },
  { id: 3, categoryName: "Essential Trackers", title: "The 'Story Bible' for Fiction", desc: "Centralized Notion workspace for writers to track character arcs and world-building.", price: 19.99, status: "COMING SOON", icon: "📖", active: true },
  { id: 4, categoryName: "Essential Trackers", title: "Collectibles Portfolio Valuation Tracker", desc: "Track acquisition costs and market values for high-end collectibles.", price: 14.99, status: "COMING SOON", icon: "💎", active: true },
  { id: 5, categoryName: "Essential Trackers", title: "Digital Nomad Route Planner", desc: "Notion/Sheets budgeter for campground reservations and connectivity ratings.", price: 24.99, status: "COMING SOON", icon: "✈️", active: true },
  { id: 6, categoryName: "Professional Hubs", title: "AI Prompt Testing Sandbox", desc: "Workspace for prompt engineers to track versions and rate efficiency.", price: 29.99, status: "COMING SOON", icon: "🤖", active: true },
  { id: 7, categoryName: "Professional Hubs", title: "Freelance Tax Allocator", desc: "Input multiple income streams and auto-calculate estimated quarterly taxes.", price: 24.99, status: "READY", route: "/tax-engine", icon: "💰", active: true },
  { id: 8, categoryName: "Professional Hubs", title: "CS Degree Organizer", desc: "Notion hub featuring syllabus mapping, code snippet storage, and GPA calculation.", price: 29.99, status: "COMING SOON", icon: "🎓", active: true },
  { id: 9, categoryName: "Professional Hubs", title: "Agile Sprint Planning Hub", desc: "Template including a product backlog, active sprint board, and retrospectives.", price: 34.99, status: "COMING SOON", icon: "🚀", active: true },
  { id: 10, categoryName: "Professional Hubs", title: "30-60-90 Day Onboarding Portal", desc: "Notion HR template with department intros, access checklists, and milestones.", price: 34.99, status: "COMING SOON", icon: "👥", active: true },
  { id: 11, categoryName: "Enterprise B2B", title: "Software RFP Vendor Matrix", desc: "Complex, weighted Excel matrix for evaluating software vendors.", price: 49.99, status: "COMING SOON", icon: "⚙️", active: true },
  { id: 12, categoryName: "Enterprise B2B", title: "Product Launch Roadmap", desc: "Framework to align stakeholders, map dependencies, and track GTM strategies.", price: 54.99, status: "COMING SOON", icon: "🎯", active: true },
  { id: 13, categoryName: "Enterprise B2B", title: "IT Change Management Playbook", desc: "Step-by-step framework for rolling out enterprise software and training.", price: 59.99, status: "COMING SOON", icon: "📋", active: true }
];

const ServiceGrid = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();
  const categories = ["All", "Essential Trackers", "Professional Hubs", "Enterprise B2B"];

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
    </section>
  );
};

export default ServiceGrid;
