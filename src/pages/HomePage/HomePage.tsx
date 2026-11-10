import { NavMenu } from '@src/components/NavMenu';
import { ScrollSection, type ScrollSectionHandle } from '@src/components/ScrollSection';
import { useCallback, useEffect, useRef, useState } from 'react';
import * as stylesImport from './HomePage.module.scss';
const styles = stylesImport as unknown as Record<string, string>;

type SectionId = 'about' | 'work' | 'contact';

export function HomePage() {
    const [currentSection, setCurrentSection] = useState<SectionId>('about');
    const scrollRef = useRef<ScrollSectionHandle>(null);

    useEffect(() => {
        document.title = 'Claire Surbeck';
    }, []);

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
