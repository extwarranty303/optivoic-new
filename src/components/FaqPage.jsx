import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import { usePageMeta } from '../utils/usePageMeta';

const faqs = [
  {
    id: 'what-is-consulting',
    question: 'What does a technology consulting agency actually do?',
    answer: 'A technology consulting agency helps businesses choose, implement, and optimize the right systems for growth, including AI automation, web architecture, and workflow processes.'
  },
  {
    id: 'how-can-ai-help',
    question: 'How can AI automation improve my operations?',
    answer: 'AI automation can reduce repetitive manual work, improve consistency, and free up your team to focus on higher-value work.'
  },
  {
    id: 'are-templates-for-resellers',
    question: 'Are the marketplace templates suitable for resellers?',
    answer: 'Yes. Our reseller templates are designed to help resellers organize sourcing, profitability, inventory, and daily execution in a simple system.'
  },
  {
    id: 'do-you-offer-support',
    question: 'Do you offer support after purchase?',
    answer: 'Yes. Each package includes the template, a PDF guide and FAQ, a slide presentation, and ongoing support to help you get the most from the product.'
  }
];

export default function FaqPage() {
  usePageMeta({
    title: 'FAQ | Optivoic Technology Consulting & Business Templates',
    description: 'Find answers about technology consulting, AI automation, reseller templates, and how Optivoic helps businesses work smarter.',
    keywords: 'technology consulting agency FAQ, AI automation FAQ, reseller templates FAQ',
    canonical: 'https://www.optivoic.com/faq',
    robots: 'index, follow'
  });

  return (
    <div className="min-h-screen bg-[#020202] text-white">
      <div className="max-w-5xl mx-auto px-8 py-24">
        <div className="mb-12">
          <p className="text-cyan-400 uppercase tracking-[0.3em] text-sm font-semibold mb-4">Frequently Asked Questions</p>
          <h1 className="text-4xl md:text-5xl font-black mb-6">Answers for owners, operators, and growing teams</h1>
          <p className="text-lg text-gray-400 max-w-3xl">Use this page to learn more about Optivoic’s services, marketplace templates, and the systems that support long-term growth.</p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq) => (
            <div key={faq.id} className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
              <h2 className="text-xl font-bold mb-3">{faq.question}</h2>
              <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
