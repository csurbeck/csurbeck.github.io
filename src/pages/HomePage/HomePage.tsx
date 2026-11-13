import { NavMenu } from '@src/components/NavMenu';
import { ScrollSection, type ScrollSectionHandle } from '@src/components/ScrollSection';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useNavigationType } from 'react-router-dom';
import * as stylesImport from './HomePage.module.scss';
const styles = stylesImport as unknown as Record<string, string>;

type SectionId = 'landing' | 'about' | 'work' | 'contact';

function sectionFromState(state: unknown): SectionId | null {
    if (typeof state !== 'object' || state === null || !('section' in state)) return null;
    const section = (state as { section?: unknown }).section;
    if (section === 'landing' || section === 'about' || section === 'work' || section === 'contact') {
        return section;
    }
    return null;
}

export function HomePage() {
    const location = useLocation();
    const navigate = useNavigate();
    const navigationType = useNavigationType();
    const stateSection = sectionFromState(location.state);
    // A reload restores the history entry as a POP. Only the link back from a
    // project should open on that section.
    const requestedSection = navigationType === 'POP' ? null : stateSection;
    const [currentSection, setCurrentSection] = useState<SectionId>(requestedSection ?? 'landing');
    const scrollRef = useRef<ScrollSectionHandle>(null);
    const consumedKey = useRef<string | null>(null);

    useEffect(() => {
        document.title = 'Claire Surbeck';
    }, []);

    useLayoutEffect(() => {
        if (!requestedSection) return;
        scrollRef.current?.scrollToSection(requestedSection, 'instant');
    }, [requestedSection]);

    useEffect(() => {
        if (!requestedSection || consumedKey.current === location.key) return;
        consumedKey.current = location.key;
        navigate(
            { pathname: location.pathname, search: location.search, hash: location.hash },
            { replace: true, state: null },
        );
    }, [requestedSection, navigate, location.key, location.pathname, location.search, location.hash]);

    const handleNavigate = useCallback((section: SectionId) => {
        scrollRef.current?.scrollToSection(section);
    }, []);

    return (
        <div className={styles.homePage}>
            <div className={styles.contentContainer}>
                <NavMenu currentSection={currentSection} onNavigate={handleNavigate} />
                <ScrollSection
                    ref={scrollRef}
                    currentSection={currentSection}
                    onSectionChange={setCurrentSection}
                />
            </div>
        </div>
    )
}
