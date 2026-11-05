import { NavMenu } from '@src/components/NavMenu';
import { ScrollSection } from '@src/components/ScrollSection';
import { useCallback, useState } from 'react';
import * as stylesImport from './HomePage.module.scss';
const styles = stylesImport as unknown as Record<string, string>;

type SectionId = 'about' | 'work' | 'skills' | 'contact';

export function HomePage() {
    const [currentSection, setCurrentSection] = useState<SectionId>('about');

    const handleNavigate = useCallback((section: SectionId) => {
        setCurrentSection(section);
    }, []);

    return (
        <div className={styles.homePage}>
            <div className={styles.contentContainer}>
                <NavMenu currentSection={currentSection} onNavigate={handleNavigate} />
                <ScrollSection currentSection={currentSection} onSectionChange={setCurrentSection} />
            </div>
        </div>
    )
}
