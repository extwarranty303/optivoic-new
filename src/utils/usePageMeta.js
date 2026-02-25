import { useEffect } from 'react';

// simple hook to update document <title> and various <meta> tags
export function usePageMeta({
  title,
  description,
  ogTitle,
  ogDescription,
  ogType,
  ogUrl,
  ogImage,
  priceAmount,
  priceCurrency,
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

    setMeta("meta[name='description']", 'content', description);
    setMeta("meta[property='og:title']", 'content', ogTitle || title);
    setMeta("meta[property='og:description']", 'content', ogDescription || description);
    setMeta("meta[property='og:type']", 'content', ogType);
    setMeta("meta[property='og:url']", 'content', ogUrl);
    setMeta("meta[property='og:image']", 'content', ogImage);
    setMeta("meta[property='product:price:amount']", 'content', priceAmount);
    setMeta("meta[property='product:price:currency']", 'content', priceCurrency);
  }, [title, description, ogTitle, ogDescription, ogType, ogUrl, ogImage, priceAmount, priceCurrency]);
}
