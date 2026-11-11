import { NavMenu } from '@src/components/NavMenu';
import { ScrollSection, type ScrollSectionHandle } from '@src/components/ScrollSection';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
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
    const requestedSection = sectionFromState(useLocation().state);
    const [currentSection, setCurrentSection] = useState<SectionId>(requestedSection ?? 'landing');
    const scrollRef = useRef<ScrollSectionHandle>(null);

    useEffect(() => {
        document.title = 'Claire Surbeck';
    }, []);

    useLayoutEffect(() => {
        if (!requestedSection) return;
        scrollRef.current?.scrollToSection(requestedSection, 'instant');
    }, [requestedSection]);

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
