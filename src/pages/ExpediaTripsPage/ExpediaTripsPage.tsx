import { BackToPortfolio } from '@src/components/BackToPortfolio';
import { useEffect } from 'react';
import phoneScreens from '@src/assets/expedia-trips/phone-screens.png';
import calendarScreens from '@src/assets/expedia-trips/calendar-screens.jpg';
import budgetFeature from '@src/assets/expedia-trips/budget-feature.jpg';
import chatFeature from '@src/assets/expedia-trips/chat-feature.jpg';
import researchFindings from '@src/assets/expedia-trips/research-findings.jpg';
import midFiPrototypes from '@src/assets/expedia-trips/mid-fi-prototypes.jpg';
import userTesting from '@src/assets/expedia-trips/user-testing.jpeg';
import * as stylesImport from './ExpediaTripsPage.module.scss';

const styles = stylesImport as unknown as Record<string, string>;

export function ExpediaTripsPage() {
    useEffect(() => {
        document.title = 'Claire Surbeck – Expedia Trips';
    }, []);

    return (
        <div className={styles.page}>
            <div className={styles.shell}>
                <header className={styles.header}>
                    <BackToPortfolio />
                    <img
                        src={phoneScreens}
                        alt="Example mobile app screens from the Expedia Trips redesign"
                        className={styles.heroImage}
                    />
                    <h1 className={styles.title}>Capstone: Expedia Trips</h1>
                    <dl className={styles.meta}>
                        <div className={styles.metaRow}>
                            <dt className={styles.metaLabel}>Role</dt>
                            <dd className={styles.metaValue}>Designer, Researcher</dd>
                        </div>
                        <div className={styles.metaRow}>
                            <dt className={styles.metaLabel}>Responsibilities</dt>
                            <dd className={styles.metaValue}>
                                Interviewing, affinity mapping, wireframing, UI design, Figma
                                prototyping, user testing
                            </dd>
                        </div>
                    </dl>
                </header>

                <section className={styles.section} aria-labelledby="key-features-heading">
                    <h2 id="key-features-heading" className={styles.sectionLabel}>
                        Key features
                    </h2>
                    <p className={styles.sectionBody}>
                        Our high-fidelity prototype focused on three features drawn from the
                        research.
                    </p>
                    <p className={styles.sectionBody}>
                        <strong>First</strong>, a redesigned Trip Summary page made itinerary
                        planning clearer and easier to scan.
                    </p>
                    <img
                        src={calendarScreens}
                        alt="Expedia Trips itinerary screens"
                        className={styles.contentImage}
                    />
                    <p className={styles.sectionBody}>
                        <strong>Second</strong>, a Budget tool surfaced trip expenses so travelers could track
                        spending in one place.
                    </p>
                    <img
                        src={budgetFeature}
                        alt="Proposed budget feature for the Expedia Trips redesign"
                        className={styles.contentImage}
                    />
                    <p className={styles.sectionBody}>
                        <strong>Third</strong>, we added chat to Trips so groups could plan together without
                        leaving the app. I owned the chat prototype and designed it around
                        shared decision-making—not just messaging.
                    </p>
                    <img
                        src={chatFeature}
                        alt="Proposed chat feature for the Expedia Trips redesign"
                        className={styles.contentImage}
                    />
                </section>

                <section className={styles.section} aria-labelledby="process-heading">
                    <h2 id="process-heading" className={styles.sectionLabel}>
                        Overview &amp; process
                    </h2>
                    <p className={styles.sectionBody}>
                        For my senior capstone, I joined a team of four HCDE students
                        sponsored by Expedia to research and redesign the Trips page in their
                        mobile app. The work moved through research, design, and testing.
                    </p>
                    <p className={styles.sectionBody}>
                        We combined Expedia&apos;s preliminary research with our own surveys,
                        interviews, and field observations, then affinity-mapped the findings
                        in FigJam into four design recommendations.
                    </p>
                    <img
                        src={researchFindings}
                        alt="Survey and interview research findings"
                        className={styles.contentImage}
                    />
                    <p className={styles.sectionBody}>
                        <strong>The four recommendations:</strong>
                    </p>
                    <ul className={styles.list}>
                        <li>
                            Support end-to-end planning with tools like itineraries and price
                            comparison.
                        </li>
                        <li>
                            Simplify layout and navigation to reduce confusion during booking.
                        </li>
                        <li>
                            Make pricing more transparent with clear cost breakdowns,
                            comparison tools, and alerts for hidden fees.
                        </li>
                        <li>
                            Enable collaborative planning through shared itineraries, group
                            chat, and real-time decision-making tools.
                        </li>
                    </ul>
                    <p className={styles.sectionBody}>
                        From there we iterated through wireframes and low- and mid-fidelity
                        prototypes, then tested our Figma prototype in person at Expedia
                        headquarters. Insights from that lab session shaped the final
                        high-fidelity design, which we presented at our capstone showcase
                        after six months of work.
                    </p>
                    <img
                        src={midFiPrototypes}
                        alt="Array of mid-fidelity prototypes"
                        className={styles.contentImage}
                    />
                </section>

                <section className={styles.section} aria-labelledby="takeaways-heading">
                    <h2 id="takeaways-heading" className={styles.sectionLabel}>
                        Takeaways
                    </h2>
                    <p className={styles.sectionBody}>
                        This was my first chance to run professional-level user research, and
                        it sharpened how I listen in a session. We had a testing script, but
                        I often paused it to follow a participant&apos;s decision-making—then
                        returned to the script. Those detours were usually where we learned
                        how to make the interface more intuitive.
                    </p>
                    <img
                        src={userTesting}
                        alt="Claire conducting a user test in the research lab"
                        className={`${styles.contentImage} ${styles.contentImageNarrow}`}
                    />
                </section>

                <section className={styles.section} aria-labelledby="conclusion-heading">
                    <h2 id="conclusion-heading" className={styles.sectionLabel}>
                        Conclusion &amp; kudos
                    </h2>
                    <p className={styles.sectionBody}>
                        Six months of research, design, prototyping, and testing taught me
                        how to stay present in every stage of the process—and how to grow as
                        both a researcher and a designer. Thank you to my teammates for their
                        creativity and grit, to Expedia for the mentorship and sponsorship,
                        and to our capstone professors and TAs for guiding us through it.
                    </p>
                </section>
                <BackToPortfolio />
            </div>
        </div>
    );
}
