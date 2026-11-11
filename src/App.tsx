import { CallAssurePage } from '@src/pages/CallAssurePage/CallAssurePage';
import { ExpediaTripsPage } from '@src/pages/ExpediaTripsPage/ExpediaTripsPage';
import { HomePage } from '@src/pages/HomePage/HomePage';
import { ReorderableTablePage } from '@src/pages/ReorderableTablePage/ReorderableTablePage';
import { useLayoutEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

function scrollToTop() {
    window.scrollTo(0, 0);
}

function returnsToSection(state: unknown): boolean {
    return typeof state === 'object' && state !== null && 'section' in state;
}

function ScrollToTop() {
    const { pathname, state } = useLocation();
    const keepSection = returnsToSection(state);

    useLayoutEffect(() => {
        if (keepSection) return;

        scrollToTop();
        const frame = requestAnimationFrame(scrollToTop);
        return () => cancelAnimationFrame(frame);
    }, [pathname, keepSection]);

    return null;
}

export default function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/work/reorderable-table" element={<ReorderableTablePage />} />
                <Route path="/work/expedia-trips" element={<ExpediaTripsPage />} />
                <Route path="/work/callassure" element={<CallAssurePage />} />
            </Routes>
        </BrowserRouter>
    );
}
