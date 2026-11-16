const prefetched = new Set<string>();

export function prefetchImage(src: string) {
    if (prefetched.has(src)) return;
    prefetched.add(src);

    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.as = 'image';
    link.href = src;
    document.head.append(link);
}
