import { track } from '@amplitude/unified';
import { useEffect } from 'react';

export function trackSiteVisited() {
    track('Site Visited');
}

export function useProjectVisit(project: 'Reorderable Table' | 'Expedia Trips' | 'CallAssure') {
    useEffect(() => {
        const id = window.setTimeout(() => track(`${project} Visited`), 0);
        return () => window.clearTimeout(id);
    }, [project]);
}

export function trackContactLinkClicked(link: 'email' | 'linkedin' | 'github' | 'resume') {
    track('Contact Link Clicked', { link });
}
