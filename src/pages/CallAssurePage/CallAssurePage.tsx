import homepage from '@src/assets/callassure/homepage.png';
import howItWorks from '@src/assets/callassure/how-it-works.png';
import loginPage from '@src/assets/callassure/login.png';
import { BackToPortfolio } from '@src/components/BackToPortfolio';
import { preloadImage } from '@src/preloadImage';
import { useEffect } from 'react';
import * as stylesImport from '@src/styles/projectPage.module.scss';

const styles = stylesImport as unknown as Record<string, string>;

const supportingImages = [howItWorks, loginPage];

export function preloadCallAssureImages(heroPriority: 'high' | 'low' = 'low') {
    preloadImage(homepage, heroPriority);
    for (const src of supportingImages) {
        preloadImage(src, 'low');
    }
}

export function CallAssurePage() {
    preloadCallAssureImages('high');

    useEffect(() => {
        document.title = 'Claire Surbeck – CallAssure';
    }, []);

    return (
        <div className={styles.page}>
            <div className={styles.shell}>
                <header className={styles.header}>
                    <BackToPortfolio />
                    <img
                        src={homepage}
                        alt="CallAssure homepage on a laptop: assuring peace of mind and independence"
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
                        I joined CallAssure to bring the website and online product features
                        to life. The work ran from iterations and mockups in Figma through a
                        React and TypeScript build — a full pass at taking a product from 0
                        to 1.
                    </p>
                    <p className={styles.sectionBody}>
                        CallAssure places automated check-in calls and texts to older adults
                        and alerts the family when a response is missed. The site has to
                        explain that to two people at once: the person staying independent
                        at home, and the family who wants to know they&apos;re okay.
                    </p>
                </section>

                <section className={styles.section} aria-labelledby="site-heading">
                    <h2 id="site-heading" className={styles.sectionLabel}>
                        The site
                    </h2>
                    <p className={styles.sectionBody}>
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
                        How it Works shows the daily call and the check-in message families
                        are waiting on.
                    </p>
                    <img
                        src={howItWorks}
                        alt="How it Works section with the headline A Call a Day, Even Far Away"
                        className={styles.heroImage}
                        fetchPriority="low"
                        decoding="async"
                    />
                    <img
                        src={loginPage}
                        alt="Phone mockups of an incoming CallAssure call and a check-in text"
                        className={styles.heroImage}
                        fetchPriority="low"
                        decoding="async"
                    />
                </section>

                <section className={styles.section} aria-labelledby="takeaways-heading">
                    <h2 id="takeaways-heading" className={styles.sectionLabel}>
                        Takeaways
                    </h2>
                    <p className={styles.sectionBody}>
                        Shipping the interface, not only the mockups, is what made the
                        lesson stick. A 0-to-1 site has to hold up once it leaves Figma:
                        the navigation, the path to sign up, and a plain explanation of
                        how a check-in actually works.
                    </p>
                </section>

                <section className={styles.section} aria-labelledby="follow-up-heading">
                    <h2 id="follow-up-heading" className={styles.sectionLabel}>
                        Follow-up
                    </h2>
                    <p className={styles.sectionBody}>
                        I would preload the images. They come in slowly, and waiting on
                        them while the rest of the page is already there is not a good
                        experience.
                    </p>
                </section>
                <BackToPortfolio />
            </div>
        </div>
    );
}
