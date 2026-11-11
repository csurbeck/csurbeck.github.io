import { preload } from 'react-dom';

export function preloadImage(src: string, fetchPriority: 'high' | 'low' = 'low') {
    preload(src, { as: 'image', fetchPriority });
}
