import { useEffect } from 'react';

// simple hook to update document <title> and various <meta> tags
export function usePageMeta({
  title,
  description,
  keywords,
  canonical,
  robots,
  ogTitle,
  ogDescription,
  ogType,
  ogUrl,
  ogImage,
  priceAmount,
  priceCurrency,
  jsonLd,
}) {
  useEffect(() => {
    if (title) document.title = title;

    const setMeta = (selector, attr, value) => {
      if (!value) return;
      let el = document.head.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        if (attr === 'property') {
          el.setAttribute('property', selector.replace(/\[|\]/g, ''));
        } else {
          el.setAttribute('name', selector.replace(/\[|\]/g, ''));
        }
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    const setLinkRel = (rel, href) => {
      if (!href) return;
      let el = document.head.querySelector(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    setMeta("meta[name='description']", 'content', description);
    setMeta("meta[name='keywords']", 'content', keywords);
    setMeta("meta[name='robots']", 'content', robots);
    setMeta("meta[property='og:title']", 'content', ogTitle || title);
    setMeta("meta[property='og:description']", 'content', ogDescription || description);
    setMeta("meta[property='og:type']", 'content', ogType);
    setMeta("meta[property='og:url']", 'content', ogUrl);
    setMeta("meta[property='og:image']", 'content', ogImage);
    setMeta("meta[property='product:price:amount']", 'content', priceAmount);
    setMeta("meta[property='product:price:currency']", 'content', priceCurrency);
    setLinkRel('canonical', canonical);

    let scriptTag = document.getElementById('optivoic-structured-data');
    if (jsonLd) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'optivoic-structured-data';
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(jsonLd);
    } else if (scriptTag) {
      scriptTag.remove();
    }
  }, [title, description, keywords, canonical, robots, ogTitle, ogDescription, ogType, ogUrl, ogImage, priceAmount, priceCurrency, jsonLd]);
}
