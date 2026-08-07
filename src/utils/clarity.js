import { clarity } from '@microsoft/clarity';

/**
 * Initializes Microsoft Clarity session recordings and heatmaps.
 * Reads from environment variable VITE_CLARITY_PROJECT_ID or optional passed ID.
 * @param {string} [projectId] - Microsoft Clarity Project ID
 */
export function initClarity(projectId) {
  const targetId = projectId || import.meta.env.VITE_CLARITY_PROJECT_ID;

  if (!targetId) {
    console.info('Microsoft Clarity: Add VITE_CLARITY_PROJECT_ID to your .env file to enable session recordings & heatmaps.');
    return;
  }

  try {
    clarity.init(targetId);
    console.log('Microsoft Clarity initialized with Project ID:', targetId);
  } catch (err) {
    console.error('Microsoft Clarity initialization failed:', err);
  }
}
