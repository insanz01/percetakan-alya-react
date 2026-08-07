import { useState, useEffect } from 'react';
import { settingService } from '../lib/settingService';
import { parseContent, contentDefaults, type SiteContent } from '../lib/content';

// Simple in-module cache so the public settings are fetched once per session,
// not on every page that reads content.
let cache: SiteContent | null = null;
let inflight: Promise<SiteContent> | null = null;

async function loadContent(): Promise<SiteContent> {
    if (cache) return cache;
    if (!inflight) {
        inflight = settingService.getPublicSettings()
            .then(res => parseContent(res.success ? res.data : null))
            .catch(() => contentDefaults)
            .then(c => { cache = c; inflight = null; return c; });
    }
    return inflight;
}

/**
 * Read editable site content (hero, features, about, faq, contact, footer).
 * Starts from defaults so pages render instantly, then swaps in API data.
 */
export function useContent(): SiteContent {
    const [content, setContent] = useState<SiteContent>(cache ?? contentDefaults);

    useEffect(() => {
        let active = true;
        loadContent().then(c => { if (active) setContent(c); });
        return () => { active = false; };
    }, []);

    return content;
}
