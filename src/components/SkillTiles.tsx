import callassureHome from '@src/assets/callassure/homepage.png';
import phoneScreens from '@src/assets/expedia-trips/phone-screens.png';
import tablePreview from '@src/assets/reorderable-table.png';
import { prefetchCallAssureHero } from '@src/pages/CallAssurePage/CallAssurePage';
import { prefetchExpediaHero } from '@src/pages/ExpediaTripsPage/ExpediaTripsPage';
import { Link } from 'react-router-dom';
import * as stylesImport from './SkillTiles.module.scss';

const styles = stylesImport as unknown as Record<string, string>;

const TILES = [
    {
        skill: 'Accessibility',
        project: 'Reorderable table',
        to: '/work/reorderable-table',
        image: tablePreview,
        imageClass: styles.imageTable,
        prefetch: undefined,
    },
    {
        skill: 'UI design',
        project: 'Expedia Trips',
        to: '/work/expedia-trips',
        image: phoneScreens,
        imageClass: styles.imagePhones,
        prefetch: prefetchExpediaHero,
    },
    {
        skill: '0 to 1',
        project: 'CallAssure',
        to: '/work/callassure',
        image: callassureHome,
        imageClass: styles.imageLaptop,
        prefetch: prefetchCallAssureHero,
    },
];

export function SkillTiles() {
    return (
        <div className={styles.hook}>
            <h1 className={styles.greeting}>
                <span className={styles.greetingLine}>Hi, I'm glad you're here!</span>
                <span className={styles.greetingLine}>What do you want to see?</span>
            </h1>
            <p className={styles.prompt}>Jump to a project</p>
            <ul className={styles.tiles}>
                {TILES.map((tile) => (
                    <li key={tile.to}>
                        <Link
                            to={tile.to}
                            className={styles.tile}
                            onMouseEnter={tile.prefetch}
                            onFocus={tile.prefetch}
                        >
                            <img src={tile.image} alt="" className={`${styles.image} ${tile.imageClass}`} />
                            <span className={styles.scrim} aria-hidden="true" />
                            <span className={styles.skill}>{tile.skill}</span>
                            <span className={styles.footer}>
                                <span className={styles.project}>{tile.project}</span>
                                <span className={styles.action}>View</span>
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
