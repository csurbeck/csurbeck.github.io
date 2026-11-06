import { useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as stylesImport from './ScrollSection.module.scss';
const styles = stylesImport as unknown as Record<string, string>;

type SectionId = 'about' | 'work' | 'skills' | 'contact';

type ScrollSectionProps = {
    currentSection: SectionId;
    onSectionChange: (section: SectionId) => void;
};

export const ScrollSection = ({ currentSection, onSectionChange }: ScrollSectionProps) => {
    const contentRef = useRef<HTMLDivElement | null>(null);
    const skipNextScrollIntoViewRef = useRef(false);

    const sectionIds = useMemo<SectionId[]>(
        () => ['about', 'work', 'skills', 'contact'],
        [],
    );

    useEffect(() => {
        if (skipNextScrollIntoViewRef.current) {
            skipNextScrollIntoViewRef.current = false;
            return;
        }
        const el = contentRef.current?.querySelector<HTMLElement>(`#${currentSection}`);
        if (!el) return;
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, [currentSection]);

    useEffect(() => {
        const root = contentRef.current;
        if (!root) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const rootRect = root.getBoundingClientRect();
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => {
                        const topA = a.boundingClientRect.top - rootRect.top;
                        const topB = b.boundingClientRect.top - rootRect.top;
                        return topA - topB;
                    })[0];

                const id = (visible?.target as HTMLElement | undefined)?.id as SectionId | undefined;
                if (id && sectionIds.includes(id)) {
                    skipNextScrollIntoViewRef.current = true;
                    onSectionChange(id);
                }
            },
            { root, threshold: [0.1, 0.25, 0.5, 0.75, 1] },
        );

        root.querySelectorAll<HTMLElement>('section[id]').forEach((s) => observer.observe(s));
        return () => observer.disconnect();
    }, [onSectionChange, sectionIds]);

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
};