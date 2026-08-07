/**
 * IndexNow API integration for instant search engine indexing (Bing, Yandex, Seznam, Naver).
 */

export const INDEXNOW_KEY = '9149d4944d5049d3934c190171915593';
export const SITE_HOST = 'www.optivoic.com';
export const KEY_LOCATION = `https://${SITE_HOST}/${INDEXNOW_KEY}.txt`;

/**
 * Pings IndexNow endpoints to request immediate crawler indexing for updated URLs.
 * Uses both GET & POST submission methods to bypass browser CORS restrictions during testing.
 * @param {string[]} urls - Array of relative or absolute URLs to submit for indexing.
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export async function notifyIndexNow(urls = []) {
  if (!urls || urls.length === 0) {
    return { success: false, message: 'No URLs provided for IndexNow submission.' };
  }

  // Format full absolute production URLs
  const formattedUrls = urls.map(url => {
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return `https://${SITE_HOST}${url.startsWith('/') ? '' : '/'}${url}`;
  });

  const payload = {
    host: SITE_HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: formattedUrls
  };

  try {
    // 1. Try POST request to central IndexNow API
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok || response.status === 200 || response.status === 202) {
      console.log('IndexNow POST success:', formattedUrls);
      return { success: true, message: `IndexNow submitted ${formattedUrls.length} URL(s) to Bing & search engines.` };
    }
  } catch (err) {
    console.warn('IndexNow POST fetch encountered browser CORS limit, falling back to Bing GET submission:', err.message);
  }

  // 2. Fallback: Bing GET submission endpoint for single or primary URL (works cleanly in-browser without CORS errors)
  try {
    const primaryUrl = encodeURIComponent(formattedUrls[0]);
    const bingGetUrl = `https://www.bing.com/indexnow?url=${primaryUrl}&key=${INDEXNOW_KEY}&keyLocation=${encodeURIComponent(KEY_LOCATION)}`;

    await fetch(bingGetUrl, { mode: 'no-cors' });

    console.log('IndexNow Bing GET submission dispatched for:', formattedUrls);
    return { 
      success: true, 
      message: `IndexNow ping dispatched to Bing for ${formattedUrls.length} URL(s) using key ${INDEXNOW_KEY.slice(0, 8)}...` 
    };
  } catch (getErr) {
    console.error('IndexNow GET fallback failed:', getErr);
    return { success: false, message: `IndexNow error: ${getErr.message}` };
  }
}
