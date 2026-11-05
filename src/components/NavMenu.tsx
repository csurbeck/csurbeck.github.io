import * as stylesImport from './NavMenu.module.scss';
import linkedin_icon from '@src/assets/linkedin_icon.svg';
import email_icon from '@src/assets/email_icon.svg';
const styles = stylesImport as unknown as Record<string, string>;

type SectionId = 'work' | 'about' | 'skills' | 'contact';

type NavMenuProps = {
    currentSection: SectionId;
    onNavigate: (section: SectionId) => void;
};

const NAV_ITEMS: Array<{ id: SectionId; label: string }> = [
    { id: 'work', label: 'work' },
    { id: 'about', label: 'about' },
    { id: 'skills', label: 'skills' },
    { id: 'contact', label: 'contact' },
];

export const NavMenu = ({ currentSection, onNavigate }: NavMenuProps) => (
    <div className={styles.navSide}>
        <div className={styles.navSection}>
            <div className={styles.nameHeader}>
                <span className={styles.name}>Claire Surbeck</span>
                <div className={styles.nameDiv} />
                <span className={styles.title}>designer/developer</span>
            </div>

            <nav aria-label="Primary">
                <div className={styles.navButtonContainer}>
                    {NAV_ITEMS.map(({ id, label }) => {
                        const isCurrent = currentSection === id;

                        return (
                            <div key={id}>
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
                    <img src={linkedin_icon} alt="LinkedIn navigation button" className={styles.linkedinIcon} />
                </a>
                <a href="mailto:clairesurbeck@gmail.com" target="_blank" rel="noopener noreferrer" className={styles.navFooterIcon}>
                    <img src={email_icon} alt="Email navigation button" className={styles.emailIcon} />
                </a>
            </div>
            <div className={styles.nameDiv} />
        </div>
    </div>
);
