import homepage from '@src/assets/callassure/homepage.png';
import howItWorks from '@src/assets/callassure/how-it-works.png';
import loginPage from '@src/assets/callassure/login.png';
import { useProjectVisit } from '@src/analytics';
import { BackToSelectedWork } from '@src/components/BackToSelectedWork';
import { prefetchImage } from '@src/prefetchImage';
import { useEffect } from 'react';
import * as stylesImport from '@src/styles/projectPage.module.scss';

const styles = stylesImport as unknown as Record<string, string>;

export function prefetchCallAssureHero() {
    prefetchImage(homepage);
}

export function CallAssurePage() {
    useProjectVisit('CallAssure');

    useEffect(() => {
        document.title = 'Claire Surbeck – CallAssure';
    }, []);

    return (
        <div className={styles.page}>
            <div className={styles.shell}>
                <header className={styles.header}>
                    <BackToSelectedWork />
                    <img
                        src={homepage}
                        alt="CallAssure homepage on a laptop: assuring peace of mind and independence"
                        width={1600}
                        height={1008}
                        className={styles.heroImage}
                        fetchPriority="high"
                        decoding="async"
                    />
                    <h1 className={styles.title}>CallAssure</h1>
                    <dl className={styles.meta}>
                        <div className={styles.metaRow}>
                            <dt className={styles.metaLabel}>Role</dt>
                            <dd className={styles.metaValue}>UX Engineer</dd>
                        </div>
                        <div className={styles.metaRow}>
                            <dt className={styles.metaLabel}>Responsibilities</dt>
                            <dd className={styles.metaValue}>
                                Wireframing, Figma mockups, React and TypeScript development
                            </dd>
                        </div>
                    </dl>
                </header>

                <section className={styles.section} aria-labelledby="overview-heading">
                    <h2 id="overview-heading" className={styles.sectionLabel}>
                        Overview
                    </h2>
                    <p className={styles.sectionBody}>
                        <p>
                            I joined CallAssure to bring the website and online product features
                            to life. The work ran from iterations and mockups in Figma through a
                            React and TypeScript build, my first full pass at taking a product from 0
                            to 1.
                        </p>
                        <p>
                            CallAssure places automated check-in calls and texts to older adults
                            and alerts the family when a response is missed. The site has to
                            explain that to two people at once: the person staying independent
                            at home, and the family who wants to know they&apos;re okay.
                        </p>
                    </p>
                </section>

                <section className={styles.section} aria-labelledby="site-heading">
                    <h2 id="site-heading" className={styles.sectionLabel}>
                        The site
                    </h2>
                    <p className={styles.sectionBody}>
                        <p>
                            The homepage is live at{' '}
                            <a
                                href="https://call-assure.com/"
                                className={styles.textLink}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                call-assure.com
                            </a>
                            . It leads with that promise and a way to get started. Further down,
                            <b> How it Works</b> shows the daily call and the check-in message families
                            are waiting on.
                        </p>
                    </p>
                    <img
                        src={howItWorks}
                        alt="How it Works section with the headline A Call a Day, Even Far Away"
                        width={15317}
                        height={9649}
                        className={styles.heroImage}
                        loading="lazy"
                        decoding="async"
                    />
                    <img
                        src={loginPage}
                        alt="Phone mockups of an incoming CallAssure call and a check-in text"
                        width={15317}
                        height={9649}
                        className={styles.heroImage}
                        loading="lazy"
                        decoding="async"
                    />
                </section>

                <section className={styles.section} aria-labelledby="takeaways-heading">
                    <h2 id="takeaways-heading" className={styles.sectionLabel}>
                        Takeaways
                    </h2>
                    <p className={styles.sectionBody}>
                        <p>
                            Shipping the whole site, not just mockups or code, is what made the project stick.
                            It was daunting to work on something by myself and have to rely on my own judgment 
                            for most decisions, while learning React and TypeScript along the way. Ultimately, it taught 
                            me to keep pushing forward through ambiguity and trust that the right path forward will
                            make itself clear. 
                        </p>
                        <p>
                            A 0-to-1 site has to hold up once it leaves Figma: the navigation, the path to sign up, 
                            and a plain explanation of how a check-in actually works.
                        </p>
                    </p>
                </section>

                <section className={styles.section} aria-labelledby="follow-up-heading">
                    <h2 id="follow-up-heading" className={styles.sectionLabel}>
                        Follow-up
                    </h2>
                    <p className={styles.sectionBody}>
                        <p>
                        What stands out to me now, with more formal industry experience, is how UX edge cases 
                        can be handled in code. Preloading images is a simple example. Waiting on them while 
                        the rest of the page loads is a poor experience, and an amateur mistake I won't make again.
                        </p>
                    </p>
                </section>
                <BackToSelectedWork />
            </div>
        </div>
    );
}
