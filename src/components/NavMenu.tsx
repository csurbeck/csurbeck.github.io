import * as stylesImport from './NavMenu.module.scss';
import linkedinIcon from '@src/assets/linkedin-icon.svg';
import emailIcon from '@src/assets/email-icon.svg';
const styles = stylesImport as unknown as Record<string, string>;

type SectionId = 'about' | 'work' | 'contact';

type NavMenuProps = {
    currentSection: SectionId;
    onNavigate: (section: SectionId) => void;
};

const NAV_ITEMS: Array<{ id: SectionId; label: string }> = [
    { id: 'about', label: 'about' },
    { id: 'work', label: 'work' },
    { id: 'contact', label: 'contact' },
];

export const NavMenu = ({ currentSection, onNavigate }: NavMenuProps) => (
    <div className={styles.navSide} data-site-nav>
        <div className={styles.navSection}>
            <div className={styles.nameHeader}>
                <div className={styles.nameContainer}>
                    <span className={styles.name}>Claire Surbeck</span>
                    <div className={styles.nameDiv} />
                </div>
                <span className={styles.title}>designer/developer</span>
            </div>

            <nav className={styles.primaryNav} aria-label="Primary">
                <div className={styles.navButtonContainer}>
                    {NAV_ITEMS.map(({ id, label }) => {
                        const isCurrent = currentSection === id;

                        return (
                            <div key={id} className={styles.navItem}>
                                <div
                                    className={`${styles.navButton} ${isCurrent ? styles.navButtonActive : ''}`}
                                    onClick={() => onNavigate(id)}
                                    aria-current={isCurrent ? 'page' : undefined}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            onNavigate(id);
                                        }
                                    }}
                                >
                                    <p className={styles.buttonText}>{label}</p>
                                </div>
                                <div
                                    className={`${styles.buttonUnderline} ${!isCurrent ? styles.buttonUnderlineHidden : ''}`}
                                />
                            </div>
                        );
                    })}
                </div>
            </nav>
        </div>
        <div className={styles.navFooter}>
            <div className={styles.navFooterIcons}>
                <a href="https://www.linkedin.com/in/claire-surbeck/" target="_blank" rel="noopener noreferrer" className={styles.navFooterIcon}>
                    <img src={linkedinIcon} alt="LinkedIn navigation button" className={styles.linkedinIcon} />
                </a>
                <a href="mailto:clairesurbeck@gmail.com" target="_blank" rel="noopener noreferrer" className={styles.navFooterIcon}>
                    <img src={emailIcon} alt="Email navigation button" className={styles.emailIcon} />
                </a>
            </div>
            <div className={`${styles.nameDiv} ${styles.footerRule}`} />
        </div>
    </div>
);
