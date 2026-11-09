import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import * as stylesImport from './ScrollSection.module.scss';
const styles = stylesImport as unknown as Record<string, string>;

type SectionId = 'about' | 'work' | 'skills' | 'contact';

const SECTION_IDS: SectionId[] = ['about', 'work', 'skills', 'contact'];

type ScrollSectionProps = {
    currentSection: SectionId;
    onSectionChange: (section: SectionId) => void;
};

export type ScrollSectionHandle = {
    scrollToSection: (id: SectionId) => void;
};

function isSectionId(id: string): id is SectionId {
    return (SECTION_IDS as string[]).includes(id);
}

function isPanelScroller(content: HTMLElement): boolean {
    const overflowY = getComputedStyle(content).overflowY;
    return overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay';
}

function isAtScrollEnd(content: HTMLElement): boolean {
    if (isPanelScroller(content)) {
        const maxScroll = content.scrollHeight - content.clientHeight;
        return maxScroll > 2 && maxScroll - content.scrollTop <= 2;
    }
    const scrolling = document.scrollingElement ?? document.documentElement;
    const maxScroll = scrolling.scrollHeight - window.innerHeight;
    return maxScroll > 2 && maxScroll - window.scrollY <= 2;
}

export const ScrollSection = forwardRef<ScrollSectionHandle, ScrollSectionProps>(
    function ScrollSection({ currentSection, onSectionChange }, ref) {
    const contentRef = useRef<HTMLDivElement | null>(null);
    const currentSectionRef = useRef(currentSection);
    const syncActiveRef = useRef<() => void>(() => {});
    const [observesPanel, setObservesPanel] = useState(true);

    currentSectionRef.current = currentSection;

    useImperativeHandle(ref, () => ({
        scrollToSection(id) {
            const content = contentRef.current;
            const section = content?.querySelector<HTMLElement>(`#${id}`);
            if (!content || !section) return;

            if (isPanelScroller(content)) {
                const top =
                    section.getBoundingClientRect().top -
                    content.getBoundingClientRect().top +
                    content.scrollTop;
                content.scrollTo({ top, behavior: 'smooth' });
            } else {
                const top = section.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({ top, behavior: 'smooth' });
            }

            requestAnimationFrame(() => syncActiveRef.current());
        },
    }), []);

    useEffect(() => {
        const content = contentRef.current;
        if (!content) return;

        const syncMode = () => setObservesPanel(isPanelScroller(content));
        syncMode();
        const media = window.matchMedia('(max-width: 900px)');
        media.addEventListener('change', syncMode);
        return () => media.removeEventListener('change', syncMode);
    }, []);

    useEffect(() => {
        const content = contentRef.current;
        if (!content) return;

        const publish = (id: SectionId | undefined) => {
            if (!id || id === currentSectionRef.current) return;
            onSectionChange(id);
        };

        const syncActive = () => {
            if (isAtScrollEnd(content)) {
                publish(SECTION_IDS[SECTION_IDS.length - 1]);
                return;
            }

            const rootTop = observesPanel ? content.getBoundingClientRect().top : 0;
            const rootHeight = observesPanel ? content.clientHeight : window.innerHeight;
            const bandTop = rootTop + rootHeight * 0.3;
            const bandBottom = rootTop + rootHeight * 0.4;
            const topSection = [...content.querySelectorAll<HTMLElement>('section[id]')]
                .filter((section) => {
                    const rect = section.getBoundingClientRect();
                    return rect.top < bandBottom && rect.bottom > bandTop;
                })
                .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top)[0];

            if (topSection && isSectionId(topSection.id)) publish(topSection.id);
        };
        syncActiveRef.current = syncActive;

        const observer = new IntersectionObserver(
            () => {
                syncActive();
            },
            {
                root: observesPanel ? content : null,
                rootMargin: '-30% 0px -60% 0px',
                threshold: 0,
            },
        );

        content.querySelectorAll<HTMLElement>('section[id]').forEach((section) => {
            observer.observe(section);
        });

        const scrollTargets: EventTarget[] = observesPanel ? [content] : [window, document];
        scrollTargets.forEach((target) => {
            target.addEventListener('scroll', syncActive, { passive: true });
        });
        syncActive();

        return () => {
            syncActiveRef.current = () => {};
            observer.disconnect();
            scrollTargets.forEach((target) => {
                target.removeEventListener('scroll', syncActive);
            });
        };
    }, [observesPanel, onSectionChange]);

    return (
        <div className={styles.scrollSection}>
                <div className={styles.frame}></div>
                <div ref={contentRef} className={styles.content}>

                    <section id="about" className={styles.section} aria-label="About">
                        <h2 className={styles.sectionTitle}>
                            Building beautiful bridges between humans and technology.
                        </h2>
                        <p className={styles.paragraphText}>
                            I believe technology has the potential to impact our lives positively and meaningfully everyday, and I strive to be an actuator in realizing that potential. 
                            I strive to build intuitive platform experiences that bridge the gap between complex data and the people who use it.
                        </p>
                        <p className={styles.paragraphText}>
                            My journey has taken me from wiring back-end systems as an intern at REI to spearheading front-end innovation 
                            for projects with CallAssure, Expedia, and now Qualtrics. As a former Division I athlete, I tend to have an all-in 
                            attitude and a commitment to leave things better than I found them.
                        </p>
                        <p className={styles.paragraphText}>
                            When I'm not coding, you'll likely find trialing a new recipe, puzzling, or grounding myself at pilates.
                        </p>
                    </section>

                    <section id="work" className={styles.section} aria-label="Work">
                        <h2 className={styles.sectionTitle}>Selected work.</h2>
                        <p className={styles.paragraphText}>
                            <Link to="/work/reorderable-table" className={styles.workLink}>
                                Reorderable table
                            </Link>
                            {' '}— a keyboard-accessible drag-and-drop table for ordered
                            data with hierarchical relationships, with paginated and
                            expanded modes from a single component.
                        </p>
                        <p className={styles.paragraphText}>
                            <Link to="/work/expedia-trips" className={styles.workLink}>
                                Expedia Trips
                            </Link>
                            {' '}— a senior capstone redesign of Expedia&apos;s mobile Trips
                            experience, spanning research, prototyping, and in-lab user
                            testing.
                        </p>
                    </section>

                    <section id="skills" className={styles.section} aria-label="Skills">
                        <h2 className={styles.sectionTitle}>Skills.</h2>
                        <p className={styles.paragraphText}>
                            Language & Frameworks || React, Typescript, JavaScript, HTML/CSS, Python, Java, SQL
                        </p>
                        <p className={styles.paragraphText}>
                            Web Development & Design || RESTful APIs, Responsive Design, Accessibility, UX/UI principles, Figma
                        </p>
                        <p className={styles.paragraphText}>
                            Tools & Workflow || Git, Jira, Component & E2E Testing, Version Control, CI/CD
                        </p>
                    </section>

                    <section id="contact" className={styles.section} aria-label="Contact">
                        <h2 className={styles.sectionTitle}>Put me on a team, product, or feature!</h2>
                        <p className={styles.paragraphText}>
                            Email: <a href="mailto:clairesurbeck@gmail.com" className={styles.contactLink}>clairesurbeck@gmail.com</a>
                        </p>
                        <p className={styles.paragraphText}>
                            LinkedIn: <a href="https://www.linkedin.com/in/claire-surbeck-522571100/" className={styles.contactLink}>LinkedIn</a>
                        </p>
                    </section>
                </div>
            <div className={styles.frame}></div>
        </div>
    );
});