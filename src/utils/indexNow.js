/**
 * IndexNow API integration for instant search engine indexing (Bing, Yandex, Seznam, Naver).
 */

export const INDEXNOW_KEY = 'e4b3c2a1d0f9e8d7c6b5a4f3e2d1c0b9';
export const SITE_HOST = 'www.optivoic.com';
export const KEY_LOCATION = `https://${SITE_HOST}/${INDEXNOW_KEY}.txt`;

/**
 * Pings IndexNow endpoints to request immediate crawler indexing for updated URLs.
 * @param {string[]} urls - Array of relative or absolute URLs to submit for indexing.
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export async function notifyIndexNow(urls = []) {
  if (!urls || urls.length === 0) {
    return { success: false, message: 'No URLs provided for IndexNow submission.' };
  }

  // Format full absolute URLs
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
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok || response.status === 200 || response.status === 202) {
      console.log('IndexNow successfully submitted URLs:', formattedUrls);
      return { success: true, message: `IndexNow submitted ${formattedUrls.length} URL(s) to Bing & search engines.` };
    } else {
      console.warn('IndexNow returned status:', response.status);
      return { success: false, message: `IndexNow API returned status code ${response.status}.` };
    }
  } catch (err) {
    console.error('Error pinging IndexNow API:', err);
    return { success: false, message: `IndexNow network error: ${err.message}` };
  }
}
