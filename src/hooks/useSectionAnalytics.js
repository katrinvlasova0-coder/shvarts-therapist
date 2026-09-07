import { useEffect } from 'react';
import { base44 } from '@/api/base44Client';

const SESSION_KEY = 'sb_tracked_sections';
const SOURCE_KEY = 'sb_tracked_source';

function getSessionSet(key) {
  try {
    return new Set(JSON.parse(sessionStorage.getItem(key) || '[]'));
  } catch {
    return new Set();
  }
}

function saveSessionSet(key, set) {
  try {
    sessionStorage.setItem(key, JSON.stringify([...set]));
  } catch {
    /* storage unavailable — tracking just won't dedupe */
  }
}

/**
 * Fires two analytics events:
 *  - visit_source (once per session): referrer + UTM params, so traffic origins are visible in the dashboard
 *  - section_view (once per session per section): which sections users actually read
 */
export function useSectionAnalytics(sectionIds) {
  useEffect(() => {
    // Traffic source — once per session
    const seenSource = getSessionSet(SOURCE_KEY);
    if (!seenSource.has('done')) {
      const params = new URLSearchParams(window.location.search);
      const utm = {};
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach((k) => {
        const v = params.get(k);
        if (v) utm[k.replace('utm_', '')] = v;
      });
      base44.analytics.track({
        eventName: 'visit_source',
        properties: {
          referrer: document.referrer || 'direct',
          landing_page: window.location.pathname,
          ...utm,
        },
      });
      seenSource.add('done');
      saveSessionSet(SOURCE_KEY, seenSource);
    }

    // Section views — once per session per section
    const seen = getSessionSet(SESSION_KEY);
    const toTrack = sectionIds.filter((id) => !seen.has(id) && document.getElementById(id));
    if (!toTrack.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (!seen.has(id)) {
              seen.add(id);
              base44.analytics.track({ eventName: 'section_view', properties: { section: id } });
            }
            observer.unobserve(entry.target);
          }
        });
        saveSessionSet(SESSION_KEY, seen);
      },
      { threshold: 0.4 }
    );

    toTrack.forEach((id) => observer.observe(document.getElementById(id)));
    return () => observer.disconnect();
  }, [sectionIds]);
}