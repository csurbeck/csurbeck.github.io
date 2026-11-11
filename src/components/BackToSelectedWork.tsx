import { Link } from 'react-router-dom';
import * as stylesImport from './BackToSelectedWork.module.scss';

const styles = stylesImport as unknown as Record<string, string>;

export function BackToSelectedWork() {
    return (
        <Link to="/" state={{ section: 'work' }} className={styles.backLink}>
            ← Back to Selected work
        </Link>
    );
}
