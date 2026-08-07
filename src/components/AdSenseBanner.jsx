import React, { useEffect } from 'react';

export default function AdSenseBanner({
  slot = '',
  format = 'auto',
  responsive = 'true',
  style = { display: 'block' },
  className = 'my-8 text-center overflow-hidden'
}) {
  useEffect(() => {
    try {
      if (window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error('AdSense initialization error:', e);
    }
  }, []);

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client="ca-pub-4350823615836210"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
}
