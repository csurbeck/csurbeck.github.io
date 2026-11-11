import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import orangeLadybug from '@src/assets/orange-ladybug.png';
import { preloadCallAssureImages } from '@src/pages/CallAssurePage/CallAssurePage';
import { preloadExpediaImages } from '@src/pages/ExpediaTripsPage/ExpediaTripsPage';
import { SkillTiles } from './SkillTiles';
import * as stylesImport from './ScrollSection.module.scss';
const styles = stylesImport as unknown as Record<string, string>;

type SectionId = 'about' | 'work' | 'contact';

const SECTION_IDS: SectionId[] = ['about', 'work', 'contact'];

type ScrollSectionProps = {
    currentSection: SectionId;
    onSectionChange: (section: SectionId) => void;
};

export type ScrollSectionHandle = {
    scrollToSection: (id: SectionId) => void;
};

function SectionGap() {
    return (
        <div className={styles.sectionGap} aria-hidden="true">
            <img src={orangeLadybug} alt="" className={styles.sectionGapIcon} />
        </div>
    );
}

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
                const nav = document.querySelector<HTMLElement>('[data-site-nav]');
                const navOffset =
                    nav && getComputedStyle(nav).position === 'sticky'
                        ? nav.getBoundingClientRect().height + 12
                        : 0;
                const top = section.getBoundingClientRect().top + window.scrollY - navOffset;
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
        const work = contentRef.current?.querySelector('#work');
        if (!work) return;

        const warmProjectImages = () => {
            preloadExpediaImages();
            preloadCallAssureImages();
        };

        const observer = new IntersectionObserver((entries) => {
            if (!entries.some((entry) => entry.isIntersecting)) return;
            warmProjectImages();
            observer.disconnect();
        });
        observer.observe(work);
        return () => observer.disconnect();
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

                    <section id="landing" className={styles.section} aria-label="Landing">
                        <SkillTiles />
                    </section>

                    <SectionGap />

                    <section id="about" className={styles.section} aria-label="About">
                        <h2 className={styles.sectionTitle}>
                            Building bridges between humans and technology.
                        </h2>
                        <p className={styles.paragraphText}>
                            I believe technology has the potential to impact our lives positively and meaningfully everyday. 
                            While some technologies might be downright delightful, all should be as frictionless as possible. 
                            I strive to build intuitive platform experiences that bridge the gap between complex data and the people who use it.
                        </p>
                        <p className={styles.paragraphText}>
                            My journey has taken me from wiring back-end systems as an intern at REI to spearheading front-end innovation 
                            for projects with CallAssure, Expedia, and now Qualtrics. As a former Division I athlete, I have a team-oriented 
                            attitude and a commitment to leave things better than I found them.
                        </p>
                        <p className={styles.paragraphText}>
                            When I'm not coding, you'll likely find trialing a new recipe, drinking coffee, puzzling, or trying to counterbalance my
                             SWE posture at pilates.
                        </p>
                    </section>

                    <SectionGap />

                    <section id="work" className={styles.section} aria-label="Work">
                        <h2 className={styles.sectionTitle}>Selected work.</h2>
                        <p className={styles.paragraphText}>
                            <Link to="/work/reorderable-table" className={styles.styledLink}>
                                Reorderable table
                            </Link>
                            {' '}— a keyboard-accessible drag-and-drop table for ordered
                            data with hierarchical relationships, with paginated and
                            expanded modes from a single component.
                        </p>
                        <p className={styles.paragraphText}>
                            <Link
                                to="/work/expedia-trips"
                                className={styles.styledLink}
                                onMouseEnter={() => preloadExpediaImages()}
                                onFocus={() => preloadExpediaImages()}
                            >
                                Expedia Trips
                            </Link>
                            {' '}— a senior capstone redesign of Expedia&apos;s mobile Trips
                            experience, spanning research, prototyping, and in-lab user
                            testing.
                        </p>
                        <p className={styles.paragraphText}>
                            <Link
                                to="/work/callassure"
                                className={styles.styledLink}
                                onMouseEnter={() => preloadCallAssureImages()}
                                onFocus={() => preloadCallAssureImages()}
                            >
                                CallAssure
                            </Link>
                            {' '}— a website taken from 0 to 1, from Figma mockups through
                            a React and TypeScript build of the marketing site and
                            check-in product.
                        </p>
                        <div className={styles.skillsContainer}>
                            <h3 className={styles.miniTitle}>Things I&apos;m good at.</h3>
                            <p className={styles.paragraphText}>
                                React, TypeScript, JavaScript, HTML/CSS, Python, Java, SQL,
                                REST APIs, accessibility, responsive UI, reflow, Figma, component & end-to-end testing, 
                                Git.
                            </p>
                        </div>
                    </section>

                    <SectionGap />

                    <section id="contact" className={styles.section} aria-label="Contact">
                        <h2 className={styles.sectionTitle}>Put me on a team, product, or feature!</h2>
                        <p className={styles.paragraphText}>
                            I'm looking for frontend, full-stack, and UX/design engineering roles on product or engineering teams. 
                            I want to build interfaces people use directly, and love coming back to.
                        </p>
                        <p className={styles.paragraphText}>
                            Based on the West Coast between Seattle and the Bay Area. Open to on-site, hybrid, or remote.
                        </p>
                        <p className={styles.paragraphText}>
                            <a href="mailto:clairesurbeck@gmail.com" className={styles.styledLink}>email</a>
                            {' || '}
                            <a href="https://www.linkedin.com/in/claire-surbeck/" className={styles.styledLink} target="_blank" rel="noopener noreferrer">linkedin</a>
                            {' || '}
                            <a href="https://github.com/csurbeck" className={styles.styledLink} target="_blank" rel="noopener noreferrer">github</a>
                            {' || '}
                            <a href="RESUME_URL" className={styles.styledLink} target="_blank" rel="noopener noreferrer">resume</a>
                        </p>
                    </section>
                </div>
            <div className={styles.frame}></div>
        </div>
    );
});