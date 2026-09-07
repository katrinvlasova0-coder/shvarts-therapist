import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params';

const { appId, token, functionsVersion, appBaseUrl } = appParams;

// GitHub Pages has no /api proxy — talk to Base44 cloud directly.
const serverUrl = import.meta.env.VITE_BASE44_SERVER_URL || 'https://base44.app';

export const base44 = createClient({
  appId: appId || '6a9847b2923d3b4ff598cb9a',
  token,
  functionsVersion,
  serverUrl,
  requiresAuth: false,
  appBaseUrl: appBaseUrl || 'https://amalgamer.com',
});
